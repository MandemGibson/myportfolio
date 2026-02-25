import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

// GET: Fetch all certifications
export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { year: "desc" },
    });
    return NextResponse.json(certifications);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch certifications" },
      { status: 500 },
    );
  }
}

// POST: Create a new certification
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, issuer, year, credentialId } = body;

    const certification = await prisma.certification.create({
      data: {
        name,
        issuer,
        year,
        credentialId,
      },
    });

    return NextResponse.json(certification, { status: 201 });
  } catch (error) {
    console.error("Error creating certification:", error);
    return NextResponse.json(
      { error: "Failed to create certification" },
      { status: 500 },
    );
  }
}

// PUT: Update a certification
export async function PUT(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, issuer, year, credentialId } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Certification ID is required" },
        { status: 400 },
      );
    }

    const certification = await prisma.certification.update({
      where: { id },
      data: {
        name,
        issuer,
        year,
        credentialId,
      },
    });

    return NextResponse.json(certification);
  } catch (error) {
    console.error("Error updating certification:", error);
    return NextResponse.json(
      { error: "Failed to update certification" },
      { status: 500 },
    );
  }
}

// DELETE: Delete a certification
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
        { error: "Certification ID is required" },
        { status: 400 },
      );
    }

    await prisma.certification.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Certification deleted successfully" });
  } catch (error) {
    console.error("Error deleting certification:", error);
    return NextResponse.json(
      { error: "Failed to delete certification" },
      { status: 500 },
    );
  }
}
