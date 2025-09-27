import ProductCard from '@/components/products/ProductCard';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma';


type ProductWithTranslation = {
  id: number
  price: number
  image: string
  type: string
  name: string
  description: string
  category: {
    translations: { name: string }[]
  }
}

// ✅ Traemos productos + traducciones y los mapeamos
async function getProducts(category: string): Promise<ProductWithTranslation[]> {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
    include: {
      translations: {
        where: { locale: 'es' },
        select: { name: true, description: true },
      },
      category: {
        include: {
          translations: {
            where: { locale: 'es' },
            select: { name: true },
          },
        },
      },
    },
  })

  // Mapeamos para sacar directamente name y description
  return products.map((p) => ({
    id: p.id,
    price: p.price,
    image: p.image,
    type: p.type,
    name: p.translations[0]?.name ?? '',
    description: p.translations[0]?.description ?? '',
    category: p.category,
  }))
}

export default async function OrderPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const products = await getProducts(category);
  return (
    <>
      <Heading>
        EL RINCON DE MARITZA
      </Heading>
      <div className='grid grid-cols-1  xl:grid-cols-3 2xl:grid-cols-4 gap-16 items-start mx-10'>
        {products.map(product => (
          <ProductCard 
          key={product.id}
          product={product}/>
        ))}
      </div>
    </>
  )
}
