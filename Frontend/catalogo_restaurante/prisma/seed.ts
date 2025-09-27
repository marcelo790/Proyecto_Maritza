import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🧹 Limpiando tablas y reiniciando IDs...");

    // Ejecutar deletes en orden correcto usando transacción
    await prisma.$transaction([
      prisma.productTranslation.deleteMany(),
      prisma.product.deleteMany(),
      prisma.categoryTranslation.deleteMany(),
      prisma.category.deleteMany(),
    ]);

    console.log("📦 Insertando categorías...");
    for (const cat of categories) {
      // Validar translations
      const validTranslations = cat.translations?.map((t: any) => ({
        locale: t.locale ?? "es",
        name: t.name ?? "Sin nombre",
      })) ?? [];

      const newCategory = await prisma.category.create({
        data: {
          slug: cat.slug ?? `cat-${Date.now()}`,
          translations: {
            create: validTranslations,
          },
        },
      });

      console.log(`✅ Categoría insertada: ${newCategory.slug}`);
    }

    console.log("📦 Insertando productos...");
    for (const prod of products) {
      // Validar translations
      const validTranslations = prod.translations?.map((t: any) => ({
        locale: t.locale ?? "es",
        name: t.name ?? "Sin nombre",
        description: t.description ?? "",
      })) ?? [];

      const newProduct = await prisma.product.create({
        data: {
          price: prod.price ?? 0,
          image: prod.image ?? "",
          type: prod.type ?? "general",
          category: {
            connect: { id: prod.categoryId },
          },
          translations: {
            create: validTranslations,
          },
        },
      });

      console.log(
        `✅ Producto insertado: ${
          validTranslations[0]?.name ?? "Sin nombre"
        }`
      );
    }

    console.log("🎉 Seed completado con traducciones correctamente!");
  } catch (err: any) {
    console.error("❌ Error en seed general:", err);
    console.error(err.stack);
  } finally {
    await prisma.$disconnect();
  }
}

main();
