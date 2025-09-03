import OrderSidebar from "@/components/order/OrderSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="contenedor md:flex">
            <OrderSidebar/>
            <main className="contenedor-derecho md:flex-1 md:h-screen overflow-y-auto">
                {children}
            </main>
        </div>
    </>
  )
}