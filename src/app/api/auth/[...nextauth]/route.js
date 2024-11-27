import { hash } from "bcryptjs";
import prisma from "@/lib/prisma"; // Assurez-vous que Prisma est bien configuré

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST" && req.url === "/api/auth/signup") {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Cet email est déjà utilisé." });
      }

      const hashedPassword = await hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ message: "Utilisateur créé avec succès." });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      return res.status(500).json({ error: "Erreur interne du serveur." });
    }
  }

  // Si la méthode ou l'URL ne correspond pas
  res.setHeader("Allow", ["POST"]);
  res.status(405).json({ error: `Méthode ${method} non autorisée.` });
}
