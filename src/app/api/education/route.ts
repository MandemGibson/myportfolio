import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

// GET: Fetch all education entries
export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error("Error fetching education:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 },
    );
  }
}

// POST: Create a new education entry
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { degree, institution, period, gpa, description } = body;

    const education = await prisma.education.create({
      data: {
        degree,
        institution,
        period,
        gpa,
        description,
      },
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("Error creating education:", error);
    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 },
    );
  }
}

// PUT: Update an education entry
export async function PUT(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, degree, institution, period, gpa, description } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Education ID is required" },
        { status: 400 },
      );
    }

    const education = await prisma.education.update({
      where: { id },
      data: {
        degree,
        institution,
        period,
        gpa,
        description,
      },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 },
    );
  }
}

// DELETE: Delete an education entry
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
        { error: "Education ID is required" },
        { status: 400 },
      );
    }

    await prisma.education.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 },
    );
  }
}
