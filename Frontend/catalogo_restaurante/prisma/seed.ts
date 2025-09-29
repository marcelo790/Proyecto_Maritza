
import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

type TranslationInput = { locale: string; name: string; description?: string };
type CategoryInput = {
  id: number; // ⚠ aseguramos que tenga ID fijo en data/categories.ts
  slug: string;
  translations: Omit<TranslationInput, "description">[];
};
type ProductInput = {
  price: number;
  image: string;
  type: string;
  categoryId: number; // ⚠ volvemos a usar categoryId numérico
  translations: TranslationInput[];
};

async function main() {
  try {
    console.log("🧹 Limpiando tablas y reiniciando IDs...");
    await prisma.$executeRaw`
      TRUNCATE TABLE "ProductTranslation", "CategoryTranslation", "Product", "Category"
      RESTART IDENTITY CASCADE
    `;

    console.log("📦 Insertando categorías...");
    for (const cat of categories as CategoryInput[]) {
      await prisma.category.create({
        data: {
          id: cat.id, // ⚠ insertamos el mismo ID que luego usarán los productos
          slug: cat.slug,
          translations: {
            create: cat.translations.map((t) => ({
              locale: t.locale,
              name: t.name,
            })),
          },
        },
      });
      console.log(`✅ Categoría insertada: ${cat.slug} (ID: ${cat.id})`);
    }

    console.log("📦 Insertando productos...");
    for (const prod of products as ProductInput[]) {
      await prisma.product.create({
        data: {
          price: prod.price,
          image: prod.image,
          type: prod.type,
          categoryId: prod.categoryId, // ⚠ ya coincide porque lo pusimos en el dataset
          translations: {
            create: prod.translations.map((t) => ({
              locale: t.locale,
              name: t.name,
              description: t.description ?? "",
            })),
          },
        },
      });

      console.log(
        `✅ Producto insertado: ${prod.translations
          .map((t) => `${t.locale}:${t.name}`)
          .join(", ")}`
      );
    }

    console.log("🎉 Seed completado con IDs consistentes");
  } catch (err: any) {
    console.error("❌ Error en seed:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();

