import { formatCurrency } from "@/src/utils";
import { Product, Category } from "@prisma/client";
import Link from "next/link";

// Tipos extendidos con traducciones
type Translation = { name: string; description?: string; locale: string };

type ProductWithTranslations = Product & {
  translations?: Translation[];
  category: Category & {
    translations?: Translation[];
  };
};

type ProductTableProps = {
  products: ProductWithTranslations[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Producto</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Precio</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Categoría</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => {
                  // Traducción en español
                  const productTranslation = product.translations?.find(t => t.locale === "es");
                  const categoryTranslation = product.category.translations?.find(t => t.locale === "es");

                  return (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        //productTranslation?.name ?? product.name
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        //categoryTranslation?.name ?? product.category.name
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          Editar <span className="sr-only">, //productTranslation?.name ?? product.name</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
