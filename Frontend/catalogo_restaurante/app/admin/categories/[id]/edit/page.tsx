import CategoryForm from "@/components/categories/CategoryForm"
import EditCategoryForm from "@/components/categories/EditCategoryForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"


type EditCategoriesPageProps = {
  params: {
    id: string;
  };
}

async function getCategoryById(id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      translations: {
        where: { locale: 'es' }, // o el idioma que uses
        select: { name: true },
      },
    },
  });

  if (!category) notFound();

  return category;
}

export default async function EditCategoriesPage({ params }: EditCategoriesPageProps) {
  const category = await getCategoryById(Number(params.id));

  return (
    <>
        <Heading>Editar Categoria: {category.translations[0]?.name ?? 'Sin nombre'}</Heading>
        <GoBackButton />
        <EditCategoryForm>
            <CategoryForm category={category}/>
        </EditCategoryForm>
    </>
  )
}
