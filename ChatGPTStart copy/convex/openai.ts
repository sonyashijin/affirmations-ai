import { OpenAI } from "openai";
import { internalAction } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

type ChatParams = {
  messages: Doc<"messages">[];
  messageId: Id<"messages">;
};
export const chat = internalAction({
  handler: async (ctx, { messages, messageId }: ChatParams) => {
    const apiKey = process.env.OPENAI_API_KEY!;
    const openai = new OpenAI({ apiKey });

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // "gpt-4" also works, but is so slow!
        stream: true,
        messages: [
          {
            role: "system",
            content: "Your role is to provide affirmations and pep talks tailored to specific activities or events, such as exams, gym sessions, or any challenging moment, considering the time of day, the nature of the task, and reflecting on past struggles and experiences shared by the user. You'll generate personalized encouragement based on the user's input, focusing solely on boosting their confidence and motivation without offering unsolicited tips or advice. Your responses should feel like they're coming from a best friend: supportive, positive, uplifting, gen-z, and tailored to the user's journey, task at hand, and their progress over time. Use both upbeat and reflective tones as appropriate, and only provide advice when explicitly requested.",
          },
          ...messages.map(({ body, author }) => ({
            role:
              author === "ChatGPT" ? ("assistant" as const) : ("user" as const),
            content: body,
          })),
        ],
      });
      let body = "";
      for await (const part of stream) {
        if (part.choices[0].delta?.content) {
          body += part.choices[0].delta.content;
          // Alternatively you could wait for complete words / sentences.
          // Here we send an update on every stream message.
          await ctx.runMutation(internal.messages.update, {
            messageId,
            body,
          });
        }
      }
    } catch (e) {
      if (e instanceof OpenAI.APIError) {
        console.error(e.status);
        console.error(e.message);
        await ctx.runMutation(internal.messages.update, {
          messageId,
          body: "OpenAI call failed: " + e.message,
        });
        console.error(e);
      } else {
        throw e;
      }
    }
  },
});
