import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { name, isCollaboration, goalIds } = await req.json();

    const folder = await prisma.folder.create({
      data: {
        name,
        isCollaboration,
        goals: {
          connect: goalIds?.map((id) => ({ id })) || [],
        },
      },
    });

    return new Response(JSON.stringify(folder), { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du dossier :", error);
    return new Response(JSON.stringify({ error: "Erreur lors de la création du dossier." }), {
      status: 500,
    });
  }
}
