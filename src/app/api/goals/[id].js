import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { title, description, deadline } = req.body;

    try {
      const updatedGoal = await prisma.goal.update({
        where: { id: parseInt(id) },
        data: { title, description, deadline: new Date(deadline) },
      });
      res.status(200).json(updatedGoal);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'objectif." });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée." });
  }
}

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.goal.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Objectif supprimé avec succès." });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'objectif." });
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée." });
  }
}
