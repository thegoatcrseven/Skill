import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const goals = await prisma.goal.findMany();
    return new Response(JSON.stringify(goals), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des objectifs :", error);
    return new Response("Erreur lors de la récupération des objectifs", { status: 500 });
  }
}

export async function POST(req) {
  const { title, description, deadline } = await req.json();
  
  try {
    const newGoal = await prisma.goal.create({
      data: {
        title,
        description,
        deadline: new Date(deadline),
      },
    });

    return new Response(JSON.stringify(newGoal), { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'objectif :", error);
    return new Response("Erreur lors de la création de l'objectif", { status: 500 });
  }
}
