import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🧹 Limpiando tablas y reiniciando IDs...");
    // TRUNCATE reinicia los IDs automáticamente
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`);

    console.log("📦 Insertando categorías...");
    for (const cat of categories) {
      try {
        await prisma.category.create({ data: cat });
        console.log(`✅ Categoría insertada: ${cat.name}`);
      } catch (err: any) {
        console.error(`❌ Error insertando categoría "${cat.name}": ${err.message}`);
      }
    }

    console.log("📦 Insertando productos...");
    for (const prod of products) {
      try {
        await prisma.product.create({ data: prod });
        console.log(`✅ Producto insertado: ${prod.name}`);
      } catch (err: any) {
        console.error(`❌ Error insertando producto "${prod.name}": ${err.message}`);
      }
    }

    console.log("🎉 Seed completado con IDs reiniciados");
  } catch (err: any) {
    console.error("❌ Error en seed general:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
