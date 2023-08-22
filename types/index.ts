export interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  ingredient: string;
  image: string;
  color1: string;
  color2: string;
  gradient: string;
}

export interface Collection {
  id: string;
  name: string;
  category: string;
  origine: string;
  brand: string;
  color1: string;
  color2: string;
  logocolor1: string;
  logocolor2: string;
  landingcolor1: string;
  landingcolor2: string;
  background: string;
  preview: string;
  description: string;
  products: Product[];
}
