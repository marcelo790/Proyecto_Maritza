import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product} : ProductCardProps) {

    const imagePath = getImagePath(product.image)
  return (
    <div className="card-producto relative max-w-md aspect-[4/3]">
        <img 
            width={400}
            height={500}
            src={imagePath} 
            //src={`/products/${product.image}.png`} 
            alt={`Producto ${product.name}`}
            className="object-cover"
            style={{WebkitMaskImage: "url('/marco.png')",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: 'cover',
                maskImage: "url('/marco.png')",
                maskRepeat: 'no-repeat',
                maskSize: 'cover'
            }}
        />
        <img 
            width={400}
            height={500}
            src={`/marco-borde.png`} 
            //src={`/products/${product.image}.jpg`} 
            alt={`Producto ${product.name}`}
            className="absolute inset-0 object-cover pointer-events-none drop-shadow-md"
        />
        <div className="detalle-producto p-1">
            {product.type !== '' && (
                <p>{product.type}</p>
                )}
            <h3 className="font-bold">{product.name}</h3>
            {product.description !== '' && (
                <p>{product.description}</p>
                )}
            
            <p className="parrafo-precio ">
                {formatCurrency(product.price)}
            </p>

        </div>
    </div>
  )
}
