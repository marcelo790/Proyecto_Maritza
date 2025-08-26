import { PrismaClient } from "@prisma/client";
import {categories} from './data/categories.ts';
import {products} from './data/products.ts';

const prisma = new PrismaClient();

async function main() {

    try {
        await prisma.category.createMany({
            data: categories, 
            skipDuplicates: true
        })
        await prisma.product.createMany({
            data: products, 
            skipDuplicates: true
        })
    } catch (error) {
        console.log(error)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })