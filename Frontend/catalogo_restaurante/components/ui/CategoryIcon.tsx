"use client"
import { Category } from '@prisma/client';
import Image from "next/image";
import Link from 'next/link';
import { useParams } from 'next/navigation';


type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category} : CategoryIconProps) {

  const params = useParams<{category: string}>();
  return (
    <div
        className={`link-category flex items-center gap-4 w-full  p-3 `}
        style={{ backgroundColor: category.slug === params.category ? '#2C7600' : '' }}
    >
        <div className='w-9 h-9 relative'>
          <Image 
            fill
            src={`/categories/${category.slug}.svg`} alt='Imagen Categoria'/>
        </div>
        <Link
              href={`/order/${category.slug}`}>
          {category.name}
        </Link>
    </div>
  )
}
