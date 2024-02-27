import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const POST = async (req: any) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = await Prompt.create({
      creator: userId,
      tag: tag,
      prompt: prompt,
    });

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify("Failed to create prompt"), { status: 500 });

    console.log("Error while creating the prompt", e);
  }
};
