import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// GET - Get profile
export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

// PUT - Update profile
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const auth = requireAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const data = await request.json();

    // Get existing profile to handle old avatar deletion
    const existingProfile = await prisma.profile.findFirst();

    // If new avatar provided and old avatar exists, delete old one
    if (
      data.avatarPublicId &&
      existingProfile?.avatarPublicId &&
      data.avatarPublicId !== existingProfile.avatarPublicId
    ) {
      await deleteFromCloudinary(existingProfile.avatarPublicId);
    }

    const profile = await prisma.profile.upsert({
      where: { id: existingProfile?.id || 1 },
      update: {
        name: data.name,
        title: data.title,
        email: data.email,
        linkedin: data.linkedin,
        github: data.github,
        twitter: data.twitter,
        bio: data.bio,
        location: data.location,
        availability: data.availability,
        avatar: data.avatar,
        avatarPublicId: data.avatarPublicId,
      },
      create: {
        name: data.name,
        title: data.title,
        email: data.email,
        linkedin: data.linkedin,
        github: data.github,
        twitter: data.twitter,
        bio: data.bio,
        location: data.location,
        availability: data.availability,
        avatar: data.avatar,
        avatarPublicId: data.avatarPublicId,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
