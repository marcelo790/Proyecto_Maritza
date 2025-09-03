import CategoryForm from "@/components/categories/CategoryForm"
import EditCategoryForm from "@/components/categories/EditCategoryForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getCategoryById(id: number){
    const category = await prisma.category.findUnique({
        where: {
            id
        }
    })
    if(!category){
        notFound()
    }
    return category
}

export default async function EditCategoriesPage({params}: {params: {id: string}}) {
    const category = await getCategoryById(+params.id)
  return (
    <>
        <Heading>Editar Categoria: {category.name}</Heading>
        <GoBackButton />
        <EditCategoryForm>
            <CategoryForm category={category}/>
        </EditCategoryForm>
    </>
  )
}
