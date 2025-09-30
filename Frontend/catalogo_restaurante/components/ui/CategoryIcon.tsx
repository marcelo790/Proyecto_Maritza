"use client"
import Image from "next/image"
import Link from 'next/link'

type CategoryIconProps = {
  category: {
    id: number
    slug: string
    name: string // ya traducido
  }
  active?: boolean         // nueva prop opcional
  onClick?: () => void     // nueva prop opcional
}

export default function CategoryIcon({ category, active = false, onClick }: CategoryIconProps) {
  return (
    <div
      className={`link-category flex items-center gap-4 w-full p-3 cursor-pointer`}
      style={{ backgroundColor: active ? '#2C7600' : '' }}
      onClick={onClick}
    >
      <div className='w-9 h-9 relative'>
        <Image 
          fill
          src={`/categories/${category.slug}.svg`} 
          alt='Imagen Categoria'
        />
      </div>
      <Link href={`/order/${category.slug}`}>
        {category.name}
      </Link>
    </div>
  )
}
