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

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      { input }
    );

    const prediction = {
      output,
      status: "succeeded",
    };

    console.log("prediction:", prediction);

    return NextResponse.json(
      { prediction },
      { status: 201 }
    );
  } catch (error) {
    console.error("Replicate error:", error);
    return NextResponse.json(
      { error: "Failed to create prediction" },
      { status: 500 }
    );
  }
}
