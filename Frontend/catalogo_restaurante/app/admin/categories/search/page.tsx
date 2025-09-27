import CategoryTable from '@/components/categories/CategoriesTable'
import CategorySearchForm from '@/components/categories/CategorySearchForm'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'

async function searchCategories(searchTerm: string) {
  const categories = await prisma.category.findMany({
    where: {
      translations: {
        some: {
          locale: 'es', // el idioma que quieras
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
    },
    include: {
      translations: {
        where: { locale: 'es' },
        select: { name: true },
      },
    },
  });

  return categories;
}

export default async function SearchPage({searchParams}: {searchParams: {search: string}}) {

  const categories = await searchCategories(searchParams.search)
  return (
    <>
        <Heading>
            Resultado de Busqueda: {searchParams.search}
        </Heading>
        <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
            <CategorySearchForm />
        </div>
        {categories.length ? (
            <CategoryTable
                categories={categories}
            />
        ): (
            <p className='text-center text-lg'>No hay resultados</p>
        )}
        
    </>
  )
}
