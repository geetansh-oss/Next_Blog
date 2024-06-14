import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database.js";

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new response("Failed to Fetch all prompts", { status: 500 })
  }
}