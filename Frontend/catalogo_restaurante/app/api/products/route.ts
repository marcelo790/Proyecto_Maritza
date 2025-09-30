import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "";
  const locale = searchParams.get("locale") || "es";

  const products = await prisma.product.findMany({
    where: {
      category: { slug: category },
    },
    include: {
      translations: {
        where: { locale },
        select: { name: true, description: true },
      },
    },
  });

  const mapped = products.map((p) => ({
    id: p.id,
    price: p.price,
    image: p.image,
    type: p.type,
    name: p.translations[0]?.name ?? "",
    description: p.translations[0]?.description ?? "",
  }));

  return NextResponse.json(mapped);
}
