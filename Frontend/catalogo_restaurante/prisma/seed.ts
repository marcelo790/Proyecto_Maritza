import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🧹 Limpiando tablas y reiniciando IDs...");
    await prisma.productTranslation.deleteMany();
    await prisma.product.deleteMany();
    await prisma.categoryTranslation.deleteMany();
    await prisma.category.deleteMany();


    console.log("📦 Insertando categorías...");
    for (const cat of categories) {
      await prisma.category.create({
        data: {
          slug: cat.slug,
          translations: {
            create: cat.translations.map((t: any) => ({
              locale: t.locale,
              name: t.name,
            })),
          },
        },
      });
      console.log(`✅ Categoría insertada: ${cat.slug}`);
    }

    console.log("📦 Insertando productos...");
    for (const prod of products) {
      await prisma.product.create({
        data: {
          price: prod.price,
          image: prod.image,
          type: prod.type,
          category: {
            connect: { id: prod.categoryId }, // 👈 conecta con Category existente
          },
          translations: {
            create: prod.translations.map((t: any) => ({
              locale: t.locale,
              name: t.name,
              description: t.description,
            })),
          },
        },
      });
      console.log(`✅ Producto insertado: ${prod.translations[0].name}`);
    }

    console.log("🎉 Seed completado con traducciones");
  } catch (err: any) {
    console.error("❌ Error en seed general:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
