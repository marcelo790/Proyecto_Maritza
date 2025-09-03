import AddCategoryForm from '@/components/categories/AddCategoryForm'
import CategoryForm from '@/components/categories/CategoryForm'
import Heading from '@/components/ui/Heading'
import React from 'react'

export default function CreateCategoryPage() {
  return (
    <>
      <Heading>Nueva Categoria</Heading>
      <AddCategoryForm>
        <CategoryForm/>
      </AddCategoryForm>
    </>
  )
}
