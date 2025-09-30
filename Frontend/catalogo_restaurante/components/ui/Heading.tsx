'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/products/ProductCard'

type ProductWithTranslation = {
  id: number
  price: number
  image: string
  type: string
  name: string
  description: string
}

type Props = {
  category: string
  locale: 'es' | 'en'
}

export default function Heading({ category, locale }: Props) {
  const [products, setProducts] = useState<ProductWithTranslation[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products?category=${category}&locale=${locale}`)
        if (!res.ok) throw new Error('Error fetching products')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchProducts()
  }, [category, locale])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-16 items-start mx-10">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
