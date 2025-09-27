import {prisma} from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

async function getCategories(locale: string = 'es') {
  return await prisma.category.findMany({
    include: {
      translations: {
        where: { locale },
        select: { name: true },
      },
    },
    orderBy: { id: 'asc' },
  })
}

export default async function OrderSidebar() {

  const categories = await getCategories('es')
  return (
    <aside className='contenedor-izquierdo md:w-82 md:h-screen bg-transparent overflow-y-auto '>
      <Logo/>
      <nav className='mt-1 text-white'>
        {categories.map((category) => (
          <CategoryIcon
            key={category.id}
            category={{
              ...category,
              name: category.translations[0]?.name ?? 'Categoría',
            }}
          />
        ))}
      </nav>
    </aside>
  )
}
