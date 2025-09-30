'use client'

import { useEffect, useState } from 'react'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

type Category = {
  id: number
  slug: string
  name: string
}

type Props = {
  locale: 'es' | 'en'
  selectedCategory: string
  onSelectCategory: (slug: string) => void
}

export default function OrderSidebar({ locale, selectedCategory, onSelectCategory }: Props) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(`/api/categories?locale=${locale}`)
      const data = await res.json()
      setCategories(data)
    }
    fetchCategories()
  }, [locale])

  return (
    <aside className="contenedor-izquierdo md:w-82 md:h-screen bg-transparent overflow-y-auto">
      <Logo />
      <nav className="mt-1 text-white">
        {categories.map(category => (
          <CategoryIcon
            key={category.id}
            category={category}
            active={category.slug === selectedCategory}
            onClick={() => onSelectCategory(category.slug)}
          />
        ))}
      </nav>
    </aside>
  )
}
