// app/api/categories/route.ts
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") || "es";

  const categories = await prisma.category.findMany({
    include: {
      translations: {
        where: { locale },
        select: { name: true },
      },
    },
  });

  const mapped = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.translations[0]?.name ?? "",
  }));

  return NextResponse.json(mapped);
}
