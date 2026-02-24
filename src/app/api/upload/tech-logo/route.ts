import { NextRequest, NextResponse } from "next/server";
import { uploadTechLogo } from "@/lib/cloudinary";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST - Upload tech logo
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const auth = requireAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const techName = formData.get("techName") as string;
    const skillId = formData.get("skillId") as string;

    if (!file || !techName) {
      return NextResponse.json(
        { error: "File and tech name are required" },
        { status: 400 },
      );
    }

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await uploadTechLogo(buffer, techName);

    // Update skill in database if skillId provided
    if (skillId) {
      await prisma.skill.update({
        where: { id: parseInt(skillId) },
        data: {
          logo: result.url,
          publicId: result.publicId,
        },
      });
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error("Error uploading tech logo:", error);
    return NextResponse.json(
      { error: "Failed to upload tech logo" },
      { status: 500 },
    );
  }
}
