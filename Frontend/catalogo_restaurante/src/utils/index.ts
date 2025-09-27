export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style:'currency',
        currency: 'EUR'
    }).format(amount)
}

export function getImagePath(imagePath: string) {
  const cloudinaryBaseUrl = 'https://res.cloudinary.com';

  if (imagePath.startsWith(cloudinaryBaseUrl)) {
    return [imagePath]; // solo la URL de Cloudinary
  }

  // Paths relativos en public/
  return [`/products/${imagePath}.jpg`, `/products/${imagePath}.png`];
}
