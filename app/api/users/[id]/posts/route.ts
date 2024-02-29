import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request: Object, { params }: any) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (e) {
    console.log("Error while fetching the prompts", e);
    return new Response("Error while fetching the prompts", { status: 500 });
  }
};
