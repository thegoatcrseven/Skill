// pages/api/skills/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { level } = req.body;
    const skill = await prisma.skill.update({
      where: { id: parseInt(id) },
      data: { level },
    });
    res.status(200).json(skill);
  } else if (req.method === 'DELETE') {
    await prisma.skill.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).json({ message: "Method not allowed" });
  }
}