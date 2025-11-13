'use client'

import { useState } from 'react'
import OrderSidebar from '@/components/order/OrderSidebar'
import Heading from '@/components/ui/Heading'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<'es' | 'en'>('es')
  const [selectedCategory, setSelectedCategory] = useState<string>('ensaladas') // default

  return (
    <div className="contenedor md:flex">
      <OrderSidebar
        locale={locale}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <main className="contenedor-derecho md:flex-1 md:h-screen overflow-y-auto">
        <div className="headTitle flex items-center gap-4 my-10 mx-10">
          <h1 className="text-2xl font-bold text-white">EL RINCON DE MARITZA</h1>
          <div className='headIdioma'>
            <LanguageSwitcher locale={locale} onChange={setLocale} />
          </div>
        </div>
        <Heading category={selectedCategory} locale={locale} />
      </main>
    </div>
  )
}
