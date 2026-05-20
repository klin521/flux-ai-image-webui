import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  const { prompts, ratio, model, isPublic, user } = await request.json();

  try {
    const input = {
      prompt: prompts,
      aspect_ratio: ratio || "1:1",
      output_format: "webp",
      output_quality: 80,
      num_outputs: 1,
    };

    const prediction = await replicate.predictions.create({
      model: "black-forest-labs/flux-schnell",
      input,
    });

    return NextResponse.json({ ...prediction }, { status: 201 });
  } catch (error: any) {
    console.error("Replicate error:", error);
    return NextResponse.json(
      { detail: error.message },
      { status: 500 }
    );
  }
}
