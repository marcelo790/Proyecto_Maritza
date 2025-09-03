import { redirect } from 'next/navigation';
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link';
import ProductSearchForm from '@/components/products/ProductSearchForm';
import CategoryTable from '@/components/categories/CategoriesTable';
import CategoriesPagination from '@/components/categories/CategoriesPagination';

async function getCategories(page: number, pageSize: number) {
    
    const skip = (page - 1) * pageSize

    const categories = await prisma.category.findMany({
        take: pageSize,
        skip,
    });
    return categories
}

async function categoryCount() {
    return await prisma.category.count()
}

export default async function CategoriesPage({searchParams}: {searchParams: Promise<{ page?: string }>}) {

    const params = await searchParams;  // 👈 Espera que se resuelva
  const page = params.page ? +params.page : 1;
    const pageSize = 10

    if(page < 0) redirect('/admin/categories')
    const categoriesData =  getCategories(page, pageSize)
    const totalCategoriesData = categoryCount()
    const [categories, totalCategories] = await Promise.all([categoriesData, totalCategoriesData])
    const totalPages = Math.ceil(totalCategories / pageSize)

    if(page > totalPages) redirect('/admin/categories')
    
  return (
    <>
        <Heading>Administrar Categorias</Heading>
        <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
            <Link href={'/admin/categories/new'}
                  className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center
                  font-bold cursor-pointer'  
            >
                Crear Categoria
            </Link>
            <ProductSearchForm />
        </div>
        <CategoryTable 
            categories={categories}
        />
        <CategoriesPagination
            page={page}
            totalPages={totalPages}
        />
    </>
  )
}
