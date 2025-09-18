import { Sandbox } from '@e2b/code-interpreter';
import { createAgent, openai } from '@inngest/agent-kit';
import { inngest } from './client';
import { getSandbox } from './utils';

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
      system:
        'You are an expert next.js developper. You write readable, maintainable code. You use best practices to write simple Next.js & React snippets.',
      model: openai({ model: 'gpt-4o' }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    );

    const sandboxUrl = await step.run('get-sandbox-url', async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(SANDBOX_PORT);
      return `https://${host}`;
    });

    return { output, sandboxUrl };
  }
);
