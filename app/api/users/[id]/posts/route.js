import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database.js";

export const GET = async (request, { params }) => {

  try {
    if (!params.id) {
      return new Response("Creator ID is required", { status: 400 })
    }
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response("Failed to Fetch all prompts", { status: 500 })
  }
}