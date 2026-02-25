import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

// GET: Fetch all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ current: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 },
    );
  }
}

// POST: Create a new experience
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { role, company, period, highlights, current } = body;

    const experience = await prisma.experience.create({
      data: {
        role,
        company,
        period,
        highlights: highlights || [],
        current: current || false,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 },
    );
  }
}

// PUT: Update an experience
export async function PUT(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, role, company, period, highlights, current } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 },
      );
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        role,
        company,
        period,
        highlights,
        current,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 },
    );
  }
}

// DELETE: Delete an experience
export async function DELETE(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 },
      );
    }

    await prisma.experience.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 },
    );
  }
}
