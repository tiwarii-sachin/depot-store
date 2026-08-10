// Mock catalog used until a real backend is connected.
// A real backend should return objects in this exact shape from GET /api/products
// so the frontend needs zero changes when you swap the data source.

export const CATEGORIES = ["All", "Apparel", "Electronics", "Home", "Field Gear"];

export const PRODUCTS = [
  {
    id: "DPT-1001",
    name: "Canvas Work Jacket",
    category: "Apparel",
    price: 89.0,
    stock: 14,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    description:
      "Heavyweight cotton canvas jacket built for repeated wear. Reinforced elbows, brass hardware, and a blanket-lined collar.",
  },
  {
    id: "DPT-1002",
    name: "Wireless Charging Dock",
    category: "Electronics",
    price: 34.5,
    stock: 42,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1591290619762-c6b3696bad02?w=800&q=80",
    description:
      "15W fast-charging dock with a machined aluminum base. Fits most phones with a case on.",
  },
  {
    id: "DPT-1003",
    name: "Insulated Steel Bottle",
    category: "Field Gear",
    price: 28.0,
    stock: 76,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    description:
      "24oz double-wall vacuum bottle. Keeps cold drinks cold for 24 hours, hot drinks hot for 12.",
  },
  {
    id: "DPT-1004",
    name: "Mechanical Desk Lamp",
    category: "Home",
    price: 64.0,
    stock: 9,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=800&q=80",
    description:
      "Articulated task lamp with a die-cast steel arm and warm/cool dimmable LED head.",
  },
  {
    id: "DPT-1005",
    name: "Cargo Utility Pants",
    category: "Apparel",
    price: 72.0,
    stock: 31,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    description:
      "Ripstop cotton work pants with six pockets and a gusseted crotch for range of motion.",
  },
  {
    id: "DPT-1006",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 49.99,
    stock: 23,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    description:
      "IP67-rated speaker with 14-hour battery life and a carabiner clip for the trail.",
  },
  {
    id: "DPT-1007",
    name: "Cast Iron Skillet 10\"",
    category: "Home",
    price: 38.0,
    stock: 58,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    description:
      "Pre-seasoned cast iron, made for stovetop, oven, and open fire. Lasts generations.",
  },
  {
    id: "DPT-1008",
    name: "Trail Backpack 30L",
    category: "Field Gear",
    price: 96.0,
    stock: 17,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description:
      "Weatherproof 30L pack with a padded laptop sleeve and external bottle pockets.",
  },
  {
    id: "DPT-1009",
    name: "Merino Wool Beanie",
    category: "Apparel",
    price: 22.0,
    stock: 65,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80",
    description:
      "Fine-gauge merino knit, itch-free and warm across a wide range of temperatures.",
  },
  {
    id: "DPT-1010",
    name: "USB-C Hub, 7-in-1",
    category: "Electronics",
    price: 41.0,
    stock: 39,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80",
    description:
      "HDMI, SD, 3x USB-A, and 100W passthrough charging in an anodized aluminum shell.",
  },
  {
    id: "DPT-1011",
    name: "Enamel Camp Mug",
    category: "Home",
    price: 14.0,
    stock: 88,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80",
    description:
      "Classic speckled enamel mug. Rolled rim, wire handle, dishwasher safe.",
  },
  {
    id: "DPT-1012",
    name: "Folding Camp Chair",
    category: "Field Gear",
    price: 54.0,
    stock: 21,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    description:
      "Steel-frame folding chair with a mesh seatback and side pocket. Packs into its own bag.",
  },
];
