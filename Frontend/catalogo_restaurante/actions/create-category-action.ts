"use server"

import { prisma } from "@/src/lib/prisma";
import { CategorySchema } from "@/src/schema";

export async function createCategory(data: unknown){
    const result = CategorySchema.safeParse(data)
    if(!result.success){
        return{
            errors: result.error.issues
        }
    }

    await prisma.category.create({
        data: result.data
    })
}