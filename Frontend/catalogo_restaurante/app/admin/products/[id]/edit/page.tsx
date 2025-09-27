import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      translations: {
        where: { locale: 'es' }, // idioma que quieras
        select: { name: true, description: true },
      },
    },
  });

  if (!product) notFound();

  return product;
}

export default async function EditProductsPage({params}: {params: {id: string}}) {
    const product = await getProductById(+params.id)
  return (
    <>
        <Heading>Editar Producto: {product.translations[0]?.name ?? 'Producto'}</Heading>
        <GoBackButton />
        <EditProductForm>
            <ProductForm product={product}/>
        </EditProductForm>
    </>
  )
}
