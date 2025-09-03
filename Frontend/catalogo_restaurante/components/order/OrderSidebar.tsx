import {prisma} from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

async function getCategories() {
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {

  const categories = await getCategories()
  return (
    <aside className='contenedor-izquierdo md:w-82 md:h-screen bg-transparent overflow-y-auto '>
      <Logo/>
      <nav className='mt-1 text-white'>
        {categories.map(category => (
          <CategoryIcon
            key={category.id}
            category={category}
          />
        ))}
      </nav>
    </aside>
  )
}
