import { prisma } from "@/src/lib/prisma";
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

async function getCategories() {
  // Incluimos las traducciones de cada categoría
  return await prisma.category.findMany({
    include: {
      translations: true,
    },
  });
}

type ProductFormProps = {
  product?: Product & {
    translations?: { name: string; description: string; locale: string }[];
  };
};

export default async function ProductForm({ product }: ProductFormProps) {
  const categories = await getCategories();

  // Traducción del producto en español
  const productTranslation = product?.translations?.find(t => t.locale === "es");

  return (
    <>
      {/* Nombre del producto */}
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100"
          placeholder="Nombre Producto"
          defaultValue={productTranslation?.name ?? ""}
        />
      </div>

      {/* Precio */}
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100"
          placeholder="Precio Producto"
          defaultValue={product?.price ?? ""}
        />
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="description">
          Descripción:
        </label>
        <input
          id="description"
          type="text"
          name="description"
          className="block w-full p-3 bg-slate-100"
          placeholder="Descripción del Producto"
          defaultValue={productTranslation?.description ?? ""}
        />
      </div>

      {/* Tipo de producto */}
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="type">
          Tipo de Producto:
        </label>
        <input
          id="type"
          type="text"
          name="type"
          className="block w-full p-3 bg-slate-100"
          placeholder="Tipo de Producto"
          defaultValue={product?.type ?? ""}
        />
      </div>

      {/* Selección de categoría */}
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="categoryId">
          Categoría:
        </label>
        <select
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId ?? ""}
        >
          <option value="">-- Seleccione --</option>
          {categories.map(category => {
            // Traducción de la categoría en español
            const categoryTranslation = category.translations?.find(t => t.locale === "es");
            return (
              <option key={category.id} value={category.id}>
                {categoryTranslation?.name ?? "Sin nombre"}
              </option>
            );
          })}
        </select>
      </div>

      {/* Imagen del producto */}
      <ImageUpload image={product?.image} />
    </>
  );
}
