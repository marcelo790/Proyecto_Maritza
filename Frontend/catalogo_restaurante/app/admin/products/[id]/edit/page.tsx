import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      translations: {
        where: { locale: 'es' },
        select: { name: true, description: true, locale: true }, // ✅ agregamos locale
      },
      category: {
        include: {
          translations: true, // opcional, si quieres usar traducciones de la categoría
        },
      },
    },
  });

  if (!product) notFound();

  return product;
}

export default async function EditProductsPage({ params }: { params: { id: string } }) {
  const product = await getProductById(+params.id);

  return (
    <>
      <Heading>Editar Producto: {product.translations[0]?.name ?? 'Producto'}</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
