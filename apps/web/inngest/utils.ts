import Sandbox from "@e2b/code-interpreter";
import type { AgentResult, Message, TextMessage } from "@inngest/agent-kit";
import { SANDBOX_TIMEOUT } from "@/inngest/constants";

export const getSandbox = async (sandboxId: string) => {
	const sandbox = await Sandbox.connect(sandboxId);
	await sandbox.setTimeout(SANDBOX_TIMEOUT);
	return sandbox;
};

export const lastAssistantMessageContent = (
	result: AgentResult,
): string | undefined => {
	let lastAssistantMessageIndex = -1;

	for (let i = result.output.length - 1; i >= 0; i--) {
		if ((result.output[i] as TextMessage).role === "assistant") {
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

	if (typeof message.content === "string") {
		return message.content;
	}

	return message.content.map((content) => content.text).join("");
};

export const parseAgentOutput = (
	messages: Message[],
	fallbackValue: string,
) => {
	if (!messages || messages.length === 0) {
		return fallbackValue;
	}

	const output = messages[0];

	if (output?.type !== "text") {
		return fallbackValue;
	}

	if (Array.isArray(output.content)) {
		return output.content.map((part) => part).join(" ");
	}

	return output.content;
};
