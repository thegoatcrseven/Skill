import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Active les logs pour les requêtes Prisma
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
