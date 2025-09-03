import {z} from 'zod'

export const SearchSchema = z.object({
    search: z.string()
                    .trim()
                    .min(1, {message: 'La busqueda no puede ir vacia'})
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    description: z.string()
        .trim(),
    type: z.string()
        .trim(),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string().min(1, {message: 'La Imagen es obligatoria'})
})

export const CategorySchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre de la Categoria no puede ir vacio'}),    
    slug: z.string()
        .trim(),    
})

