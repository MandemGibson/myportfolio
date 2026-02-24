import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// GET - Get all skills with logos
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { category: "asc" },
    });

    // Group by category
    const skillsByCategory = skills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push({
          id: skill.id,
          name: skill.name,
          logo: skill.logo,
          publicId: skill.publicId,
        });
        return acc;
      },
      {} as Record<
        string,
        Array<{
          id: number;
          name: string;
          logo: string | null;
          publicId: string | null;
        }>
      >,
    );

    return NextResponse.json(skillsByCategory);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

// POST - Create a new skill
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const auth = requireAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { name, category, logo, publicId } = await request.json();

    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and category are required" },
        { status: 400 },
      );
    }

    const skill = await prisma.skill.create({
      data: { name, category, logo, publicId },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { error: "Failed to create skill" },
      { status: 500 },
    );
  }
}

// PUT - Update a skill
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const auth = requireAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id, name, category, logo, publicId } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Skill ID is required" },
        { status: 400 },
      );
    }

    const skill = await prisma.skill.update({
      where: { id: parseInt(id) },
      data: { name, category, logo, publicId },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 },
    );
  }
}

// DELETE - Delete a skill
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const auth = requireAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Skill ID is required" },
        { status: 400 },
      );
    }

    // Get skill to delete cloudinary image
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(id) },
    });

    if (skill?.publicId) {
      await deleteFromCloudinary(skill.publicId);
    }

    await prisma.skill.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 },
    );
  }
}
