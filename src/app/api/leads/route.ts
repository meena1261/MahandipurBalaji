import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";
import { string } from "yup";

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create the lead
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        status: "new", // Default status
        logs: {
          create: {
            status: "new",
            message: "Lead created",
          },
        },
      },
    });

    return NextResponse.json({ message: "Lead created successfully", lead }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { leadId, status, message } = await req.json();

    if (!leadId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Update the lead status
    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: { status },
    });

    // Create a log for the status update
    await prisma.leadLog.create({
      data: {
        leadId,
        status,
        message: message || `Status updated to ${status}`,
      },
    });

    return NextResponse.json({ message: "Lead status updated successfully", lead }, { status: 200 });
  } catch (error) {
    console.error("Error updating lead status:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};



export const GET = async (req: NextRequest) => {
  try {

    const { searchParams } = new URL(req.url);

    const leadId = searchParams.get("leadId") as string;

    // const logs = await prisma.leadLog.findMany({
    //   where: { leadId },
    //   orderBy: { createdAt: "asc" },

    // });

    if (leadId) {
      const logs = await prisma.lead.findUnique({
        where: { id: leadId },


        include: {

          logs: true,




        },
      });


      return NextResponse.json({ logs }, { status: 200 });
    } else {

    } const logs = await prisma.lead.findMany({



      include: {

        logs: true,

      },
    });


    return NextResponse.json({ logs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching lead timeline:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};


export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Delete one config by id
      const config = await prisma.lead.delete({
        where: { id: id },
      });

      return NextResponse.json({ message: "Blog deleted successfully", config }, { status: 200 });
    } else {
      // // Delete all configs
      // const deletedConfigs = await prisma.lead.deleteMany();

      // return NextResponse.json({ message: "All configs deleted successfully", deletedCount: deletedConfigs.count }, { status: 200 });
    }
  } catch (error) {
    console.error("Error deleting config:", error);
    return NextResponse.json({ error: `An error occurred: ${error}` }, { status: 500 });
  }
};