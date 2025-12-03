export interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  link: string;
  category: "Apparel" | "Accessories" | "Collectibles";
}

export const merchandiseItems: MerchandiseItem[] = [
  {
    id: "1",
    name: "Rhea Ripley T-Shirt",
    description: "Official Rhea Ripley WWE t-shirt",
    price: "$29.99",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    link: "https://shop.wwe.com",
    category: "Apparel",
  },
  {
    id: "2",
    name: "The Mami Hoodie",
    description: "Premium hoodie featuring Rhea Ripley's signature style",
    price: "$49.99",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    link: "https://shop.wwe.com",
    category: "Apparel",
  },
  {
    id: "3",
    name: "Championship Replica",
    description: "WWE Women's World Championship replica belt",
    price: "$399.99",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
    link: "https://shop.wwe.com",
    category: "Collectibles",
  },
  {
    id: "4",
    name: "Rhea Ripley Action Figure",
    description: "Official WWE action figure",
    price: "$24.99",
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    link: "https://shop.wwe.com",
    category: "Collectibles",
  },
  {
    id: "5",
    name: "The Judgment Day Cap",
    description: "Official cap featuring The Judgment Day logo",
    price: "$24.99",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop",
    link: "https://shop.wwe.com",
    category: "Accessories",
  },
  {
    id: "6",
    name: "Rhea Ripley Poster",
    description: "High-quality poster print",
    price: "$19.99",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop",
    link: "https://shop.wwe.com",
    category: "Collectibles",
  },
];

