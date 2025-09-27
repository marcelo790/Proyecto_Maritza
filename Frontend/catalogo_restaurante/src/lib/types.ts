export type Translation = {
  locale: string;
  name: string;
  description?: string;
};

export type CategoryWithTranslations = {
  id: number;
  slug: string;
  translations?: Translation[];
};

export type ProductWithTranslations = {
  id: number;
  price: number;
  image: string;
  type: string;
  categoryId: number;
  translations?: Translation[];
  category: CategoryWithTranslations;
};
