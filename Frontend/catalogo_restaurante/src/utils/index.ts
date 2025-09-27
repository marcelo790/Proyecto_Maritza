import path from "path";
import fs from 'fs'

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style:'currency',
        currency: 'EUR'
    }).format(amount)
}

export function getImagePath(imagePath: string){
    const publicPath = path.join(process.cwd(), "public", "products");
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if(imagePath.startsWith(cloudinaryBaseUrl)){
        return imagePath
    }else{
        const jpgPath = path.join(publicPath, `${imagePath}.jpg`);
        if (fs.existsSync(jpgPath)) {
            return `/products/${imagePath}.jpg`;
        }

        const pngPath = path.join(publicPath, `${imagePath}.png`);
        if (fs.existsSync(pngPath)) {
            return `/products/${imagePath}.png`;
        }
        //return `/products/plato.jpg`
    }
}
