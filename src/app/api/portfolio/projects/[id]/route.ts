/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// GET - Get specific project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to read project" },
      { status: 500 },
    );
  }
}

// PUT - Update specific project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Check authentication
    const auth = requireAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id } = await params;
    const projectId = parseInt(id);
    const updatedData = await request.json();

    // Get existing project to handle old image deletion
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    // If new image provided and old image exists, delete old one
    if (
      updatedData.imagePublicId &&
      existingProject?.imagePublicId &&
      updatedData.imagePublicId !== existingProject.imagePublicId
    ) {
      await deleteFromCloudinary(existingProject.imagePublicId);
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: updatedData.title,
        description: updatedData.description,
        tech: updatedData.tech,
        liveUrl: updatedData.liveUrl,
        githubUrl: updatedData.githubUrl,
        image: updatedData.image,
        imagePublicId: updatedData.imagePublicId,
        status: updatedData.status,
        type: updatedData.type,
        featured: updatedData.featured,
        preview: updatedData.preview,
      },
    });

    return NextResponse.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === "P2025"
    ) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

// DELETE - Delete specific project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Check authentication
    const auth = requireAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { id } = await params;
    const projectId = parseInt(id);

    // Get project to delete cloudinary image
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (project?.imagePublicId) {
      await deleteFromCloudinary(project.imagePublicId);
    }

    const deletedProject = await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === "P2025"
    ) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
