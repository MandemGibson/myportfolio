import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Read portfolio data
export async function GET() {
  try {
    const [
      profile,
      skills,
      projects,
      experiences,
      educations,
      certifications,
      stats,
    ] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.skill.findMany(),
      prisma.project.findMany(),
      prisma.experience.findMany(),
      prisma.education.findMany(),
      prisma.certification.findMany(),
      prisma.stat.findMany(),
    ]);

    // Group skills by category
    const skillsByCategory = skills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push({
          id: skill.id,
          name: skill.name,
          category: skill.category,
          iconSlug: skill.iconSlug,
        });
        return acc;
      },
      {} as Record<
        string,
        Array<{
          id: number;
          name: string;
          category: string;
          iconSlug: string | null;
        }>
      >,
    );

    const portfolio = {
      profile,
      skills: skillsByCategory,
      projects,
      experience: experiences,
      education: educations,
      certifications,
      stats,
    };

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to read portfolio data" },
      { status: 500 },
    );
  }
}

// PUT - Update portfolio data
export async function PUT(request: NextRequest) {
  try {
    const updatedData = await request.json();

    // Validate the data structure
    if (!updatedData.profile || !updatedData.skills || !updatedData.projects) {
      return NextResponse.json(
        { error: "Invalid data structure" },
        { status: 400 },
      );
    }

    // Update profile
    if (updatedData.profile) {
      await prisma.profile.upsert({
        where: { id: 1 },
        update: updatedData.profile,
        create: updatedData.profile,
      });
    }

    // Update skills
    if (updatedData.skills) {
      // Clear existing skills
      await prisma.skill.deleteMany();

      // Add new skills
      for (const [category, skillNames] of Object.entries(updatedData.skills)) {
        for (const skillName of skillNames as string[]) {
          await prisma.skill.create({
            data: { name: skillName, category },
          });
        }
      }
    }

    // Update projects
    if (updatedData.projects) {
      // Clear existing projects
      await prisma.project.deleteMany();

      // Add new projects
      for (const project of updatedData.projects) {
        await prisma.project.create({
          data: project,
        });
      }
    }

    // Update experiences
    if (updatedData.experience) {
      await prisma.experience.deleteMany();
      for (const exp of updatedData.experience) {
        await prisma.experience.create({
          data: exp,
        });
      }
    }

    // Update education
    if (updatedData.education) {
      await prisma.education.deleteMany();
      for (const edu of updatedData.education) {
        await prisma.education.create({
          data: edu,
        });
      }
    }

    // Update certifications
    if (updatedData.certifications) {
      await prisma.certification.deleteMany();
      for (const cert of updatedData.certifications) {
        await prisma.certification.create({
          data: cert,
        });
      }
    }

    // Update stats
    if (updatedData.stats) {
      await prisma.stat.deleteMany();
      for (const stat of updatedData.stats) {
        await prisma.stat.create({
          data: stat,
        });
      }
    }

    return NextResponse.json({ message: "Portfolio updated successfully" });
  } catch (error) {
    console.error("Error updating portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio data" },
      { status: 500 },
    );
  }
}
