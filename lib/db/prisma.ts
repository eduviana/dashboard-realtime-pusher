import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaClient } from "@/app/generated/prisma/client";

// Previene múltiples instancias en Dev (Hot Reload de Next.js)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

// En Dev guardamos la instancia en globalThis
if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}