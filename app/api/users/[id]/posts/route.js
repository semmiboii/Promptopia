import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const getPrompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(getPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
