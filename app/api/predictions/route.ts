import { insertGeneration } from "@/models/generation";
import { getUserInfo, updateUserInfo } from "@/models/user";
import to from "await-to-js";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  const { prompts, ratio, model, isPublic, user } = await request.json();

  let prediction: any = null;

  try {
    const input: any = {
      prompt: prompts,
      aspect_ratio: ratio || "1:1",
      output_format: "webp",
      output_quality: 80,
      safety_tolerance: 2,
      prompt_upsampling: true,
    };

    prediction = await replicate.predictions.create({
      version: process.env.REPLICATE_API_VERSION,
      input,
    });

    console.log("prediction:", prediction);

    return NextResponse.json(
      {
        prediction,
      },
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
