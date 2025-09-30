'use client'

import { formatCurrency, getImagePath } from "@/src/utils"
import Image from "next/image"
import { useState } from "react"

type ProductCardProps = {
  product: {
    id: number
    price: number
    image: string
    type: string
    name: string
    description: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const paths = getImagePath(product.image)
  const [imgSrc, setImgSrc] = useState(paths[0])

  return (
    <div className="card-producto relative max-w-md aspect-[4/3]">
      <img
        width={400}
        height={500}
        src={imgSrc}
        alt={`Producto ${product.name}`}
        className="object-cover"
        onError={() => {
          if (imgSrc === paths[0] && paths[1]) setImgSrc(paths[1])
        }}
        style={{
          WebkitMaskImage: "url('/marco.png')",
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
        alt={`Producto ${product.name}`}
        className="absolute inset-0 object-cover pointer-events-none drop-shadow-md"
      />

      <div className="detalle-producto p-1">
        {product.type && <p>{product.type}</p>}
        <h3 className="font-bold">{product.name}</h3>
        {product.description && <p>{product.description}</p>}
        <p className="parrafo-precio">{formatCurrency(product.price)}</p>
      </div>
    </div>
  )
}
