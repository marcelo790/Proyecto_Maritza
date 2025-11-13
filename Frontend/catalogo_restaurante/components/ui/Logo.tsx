import Image from "next/image"

export default function Logo() {
  return (
    <div className='flex justify-center '>
        <div className='logo relative w-50 h-50'>
            <Image
                fill
                alt="Logo Rincon de Maritza"
                src='/logo.png'
                style={{ objectFit: "fill" }}
            />
        </div>
    </div>
  )
}
