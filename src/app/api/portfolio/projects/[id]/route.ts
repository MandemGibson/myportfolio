import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Get specific project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);

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
      { status: 500 }
    );
  }
}

// PUT - Update specific project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);
    const updatedData = await request.json();

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: updatedData.title,
        description: updatedData.description,
        tech: updatedData.tech,
        liveUrl: updatedData.liveUrl,
        githubUrl: updatedData.githubUrl,
        image: updatedData.image,
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
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete specific project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);

    const deletedProject = await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
