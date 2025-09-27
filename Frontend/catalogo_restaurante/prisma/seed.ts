import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🧹 Limpiando tablas...");

    await prisma.$transaction([
      prisma.productTranslation.deleteMany(),
      prisma.product.deleteMany(),
      prisma.categoryTranslation.deleteMany(),
      prisma.category.deleteMany(),
    ]);

    console.log("📦 Insertando categorías...");
    for (const cat of categories) {
      await prisma.category.create({
        data: {
          slug: cat.slug ?? `cat-${Date.now()}`,
          translations: {
            create: cat.translations.map((t: any) => ({
              locale: t.locale ?? "es",
              name: t.name ?? "Sin nombre",
            })),
          },
        },
      });
    }

    console.log("📦 Insertando productos...");
    for (const prod of products) {
      await prisma.product.create({
        data: {
          price: prod.price ?? 0,
          image: prod.image ?? "",
          type: prod.type ?? "general",
          category: { connect: { id: prod.categoryId } },
          translations: {
            create: prod.translations.map((t: any) => ({
              locale: t.locale ?? "es",
              name: t.name ?? "Sin nombre",
              description: t.description ?? "",
            })),
          },
        },
      });
    }

    console.log("🎉 Seed completado!");
  } catch (err: any) {
    console.error("❌ Error en seed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
