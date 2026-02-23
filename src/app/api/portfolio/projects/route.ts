import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Get all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to read projects" },
      { status: 500 }
    );
  }
}

// POST - Add new project
export async function POST(request: NextRequest) {
  try {
    const newProject = await request.json();

    // Validate required fields
    if (!newProject.title || !newProject.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title: newProject.title,
        description: newProject.description,
        tech: newProject.tech || [],
        liveUrl: newProject.liveUrl,
        githubUrl: newProject.githubUrl,
        image: newProject.image,
        status: newProject.status || "Live",
        type: newProject.type || "Full Stack",
        featured: newProject.featured || false,
        preview: newProject.preview,
      },
    });

    return NextResponse.json({
      message: "Project added successfully",
      project,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      { error: "Failed to add project" },
      { status: 500 }
    );
  }
}
