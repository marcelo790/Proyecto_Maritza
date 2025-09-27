import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

// Tipos de datos
type TranslationInput = { locale: string; name: string; description?: string };

type CategoryInput = {
  slug: string;
  translations: Omit<TranslationInput, "description">[];
};

type ProductInput = {
  price: number;
  image: string;
  type: string;
  categoryId: number; // usamos el ID directamente
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
    const createdCategories = await Promise.all(
      (categories as CategoryInput[]).map((cat) =>
        prisma.category.create({
          data: {
            slug: cat.slug,
            translations: {
              create: cat.translations.map((t) => ({
                locale: t.locale,
                name: t.name,
              })),
            },
          },
        })
      )
    );

    console.log("📦 Insertando productos...");
    for (const prod of products as ProductInput[]) {
      await prisma.product.create({
        data: {
          price: prod.price,
          image: prod.image,
          type: prod.type,
          categoryId: prod.categoryId, // asignamos directamente el ID
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

    console.log("🎉 Seed completado con traducciones");
  } catch (err: any) {
    console.error("❌ Error en seed general:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
