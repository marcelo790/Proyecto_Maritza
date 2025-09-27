import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { ProductWithTranslations } from '@/src/lib/types' // asegúrate de tener este tipo

async function searchProducts(searchTerm: string): Promise<ProductWithTranslations[]> {
  const products = await prisma.product.findMany({
    where: {
      translations: {
        some: {
          locale: 'es',
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
    },
    include: {
      category: {
        include: {
          translations: true, // Incluye traducciones de la categoría
        },
      },
      translations: {
        where: { locale: 'es' },
        select: { locale: true, name: true, description: true }, // Agrega locale
      },
    },
  });

  return products;
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
  const products = await searchProducts(searchParams.search);

  return (
    <>
      <Heading>Resultado de Búsqueda: {searchParams.search}</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
}
