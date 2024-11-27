import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, isCollaboration, goalIds } = req.body;

    try {
      const folder = await prisma.folder.create({
        data: {
          name,
          isCollaboration,
          goals: {
            connect: goalIds?.map((id) => ({ id })) || [], // Connecter les objectifs si fournis
          },
        },
      });

      return res.status(201).json(folder);
    } catch (error) {
      console.error("Erreur lors de la création du dossier :", error);
      return res.status(500).json({ error: "Erreur lors de la création du dossier." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Méthode ${req.method} non autorisée.`);
  }
}
