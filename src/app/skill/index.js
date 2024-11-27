// pages/api/skills/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, level } = req.body;
    const skill = await prisma.skill.create({
      data: { name, level },
    });
    res.status(201).json(skill);
  } else if (req.method === 'GET') {
    const skills = await prisma.skill.findMany();
    res.status(200).json(skills);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ message: "Method not allowed" });
  }
}