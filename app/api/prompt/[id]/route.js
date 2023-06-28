import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const getPrompt = await Prompt.findById(params.id).populate("creator");

    if (!getPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(getPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
// PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed To Update The Prompt", { status: 500 });
  }
};
// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt Deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed To Delete Prompt", { status: 500 });
  }
};
