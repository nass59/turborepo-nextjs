import Sandbox from '@e2b/code-interpreter';
import type { AgentResult, TextMessage } from '@inngest/agent-kit';

export const getSandbox = async (sandboxId: string) => {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
};

export const lastAssistantMessageContent = (
  result: AgentResult
): string | undefined => {
  let lastAssistantMessageIndex = -1;

  for (let i = result.output.length - 1; i >= 0; i--) {
    if ((result.output[i] as TextMessage).role === 'assistant') {
      lastAssistantMessageIndex = i;
      break;
    }
  }

  const message = result.output[lastAssistantMessageIndex] as
    | TextMessage
    | undefined;

  if (!message?.content) {
    return;
  }

  if (typeof message.content === 'string') {
    return message.content;
  }

  return message.content.map((content) => content.text).join('');
};
