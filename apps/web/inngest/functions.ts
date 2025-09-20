import { Sandbox } from '@e2b/code-interpreter';
import {
  createAgent,
  createNetwork,
  createTool,
  openai,
} from '@inngest/agent-kit';
import { z } from 'zod';
import { PROMPT } from '@/prompts/prompts';
import { inngest } from './client';
import { getSandbox, lastAssistantMessageContent } from './utils';

const SANDBOX_PORT = 3000;

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    const sandboxId = await step.run('get-sandbox-id', async () => {
      const sandbox = await Sandbox.create('techship-vibe-nextjs-test-2');
      return sandbox.sandboxId;
    });

    const codeAgent = createAgent({
      name: 'code-agent',
      description: 'An export coding agent.',
      system: PROMPT,
      model: openai({
        model: 'gpt-4.1',
        defaultParameters: { temperature: 0.1 },
      }),
      tools: [
        createTool({
          name: 'terminal',
          description: 'Use the terminal to run commands.',
          parameters: z.object({
            command: z.string(),
          }),
          handler: async ({ command }, { step: stepTool }) => {
            return await stepTool?.run('terminal', async () => {
              const buffers = { stdout: '', stderr: '' };

              try {
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStdout: (data: string) => {
                    buffers.stdout += data;
                  },
                  onStderr: (data: string) => {
                    buffers.stderr += data;
                  },
                });

                return result.stdout;
              } catch (error) {
                const errorMessage = `Command failed: ${error} \n stdout: ${buffers.stdout} \n stderr: ${buffers.stderr}`;

                // biome-ignore lint/suspicious/noConsole: debug
                console.error(errorMessage);
                return errorMessage;
              }
            });
          },
        }),
        createTool({
          name: 'createOrUpdateFiles',
          description: 'Create or update files in the sandbox.',
          parameters: z.object({
            files: z.array(
              z.object({
                path: z.string(),
                content: z.string(),
              })
            ),
          }),
          handler: async (
            { files },
            { step: stepTool, network: handlerNetwork }
          ) => {
            const newFiles = await stepTool?.run(
              'createOrUpdateFiles',
              async () => {
                try {
                  const updatedFiles = handlerNetwork.state.data.files || {};
                  const sandbox = await getSandbox(sandboxId);

                  for (const file of files) {
                    await sandbox.files.write(file.path, file.content);
                    updatedFiles[file.path] = file.content;
                  }

                  return updatedFiles;
                } catch (error) {
                  return `Error ${error}`;
                }
              }
            );

            if (typeof newFiles === 'object') {
              handlerNetwork.state.data.files = newFiles;
            }
          },
        }),
        createTool({
          name: 'readFiles',
          description: 'Read files from the sandbox.',
          parameters: z.object({
            files: z.array(z.string()),
          }),
          handler: async ({ files }, { step: stepTool }) => {
            return await stepTool?.run('readFiles', async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const contents: Array<{ path: string; content: string }> = [];

                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path: file, content });
                }

                return JSON.stringify(contents);
              } catch (error) {
                return `Error ${error}`;
              }
            });
          },
        }),
      ],
      lifecycle: {
        onResponse: ({
          result: onResponseResult,
          network: onResponseNetwork,
        }) => {
          const lastAssistantMessage =
            lastAssistantMessageContent(onResponseResult);

          if (
            lastAssistantMessage &&
            onResponseNetwork &&
            lastAssistantMessage.includes('<task_summary>')
          ) {
            onResponseNetwork.state.data.summary = lastAssistantMessage;
          }

          return onResponseResult;
        },
      },
    });

    const network = createNetwork({
      name: 'coding-agent-network',
      agents: [codeAgent],
      maxIter: 15,
      router: ({ network: routerNetwork }) => {
        const summary = routerNetwork.state.data.summary;

        if (summary) {
          return;
        }

        return codeAgent;
      },
    });

    const result = await network.run(event.data.value);

    const sandboxUrl = await step.run('get-sandbox-url', async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(SANDBOX_PORT);
      return `https://${host}`;
    });

    return {
      url: sandboxUrl,
      title: 'Fragment',
      files: result.state.data.files,
      summary: result.state.data.summary,
    };
  }
);
