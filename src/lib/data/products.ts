export interface Product {
  slug: string;
  title: string;
  category: string;
  image: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  availableSizes?: string[];
}

export const products: Product[] = [
  {
    slug: "paper-cups-raw-material",
    title: "Paper Cups Raw Material",
    category: "Raw Material",
    image: "/images/raw_material.jpg",
    shortDescription: "High-quality, precisely die-cut printed paper blanks ready for cup forming machines.",
    description: "Our Paper Cup Raw Material consists of premium, food-grade paperboard blanks printed with vibrant, high-resolution graphics. Engineered for seamless integration into high-speed cup forming machines, these blanks ensure zero jamming and perfect sealing. We use eco-friendly inks and rigorous quality control to ensure your final product is structurally sound and visually striking.",
    features: [
      "Precision die-cut for perfect machine feeding",
      "Vibrant, food-safe flexo and offset printing",
      "PE and PLA coating options available",
      "Custom sizing from 4oz to 22oz"
    ],
    specs: {
      "GSM Range": "150 GSM to 350 GSM",
      "Coating": "Single or Double PE/PLA",
      "Printing": "Up to 6 colors CMYK",
      "Pricing": "₹130 per blank",
      "Supply Format": "Die-cut fans or full reels",
      "Minimum Order": "500 Kgs"
    }
  },
  {
    slug: "paper-plates-raw-material",
    title: "Paper Plates Raw Material",
    category: "Raw Material",
    image: "/images/plates_material.jpg",
    shortDescription: "Heavy-duty paperboard rolls engineered for rigid, leak-proof paper plates.",
    description: "Sourced from the finest mills, our Paper Plates Raw Material offers exceptional rigidity and moisture resistance. Designed for manufacturers requiring high-speed output, our paper rolls guarantee clean cuts and strong edge formation. Available in pristine white, natural kraft, and custom printed designs to suit any dining occasion.",
    features: [
      "High rigidity for heavy food loads",
      "Moisture and grease resistant coating",
      "Smooth finish for premium feel",
      "Compatible with automatic punching machines"
    ],
    specs: {
      "GSM Range": "80 GSM to 450 GSM",
      "Material Options": "Virgin Kraft, White Board, Silver Laminated",
      "Roll Width": "Custom slit from 100mm to 1200mm",
      "Core Size": "76mm standard",
      "Minimum Order": "1 Ton"
    }
  },
  {
    slug: "finished-paper-cups",
    title: "Finished Paper Cups",
    category: "Finished Products",
    image: "/images/finished_cups.jpg",
    shortDescription: "Premium custom-printed paper cups available in various sizes for cafes and events.",
    description: "Our Finished Paper Cups are the ultimate solution for premium beverage service. Manufactured in-house using our own high-grade raw materials, these cups offer unparalleled structural integrity and insulation. From single-wall everyday cups to double-wall insulated designs, we provide full custom branding to make your logo stand out in the hands of your customers.",
    features: [
      "Leak-proof ultrasonic bottom seal",
      "Excellent thermal insulation",
      "Odorless and food-grade certified",
      "Vibrant wraparound printing"
    ],
    availableSizes: ["55 ml", "65 ml", "150 ml", "210 ml"],
    specs: {
      "Available Sizes": "55 ml, 65 ml, 150 ml, 210 ml",
      "Pricing": "₹130 per 100 pieces",
      "Wall Types": "Single Wall, Double Wall, Ripple Wall",
      "Lids": "Matching PS or Compostable lids available",
      "Printing": "Custom CMYK / Spot Colors"
    }
  },
  {
    slug: "table-covers-rolls",
    title: "Table Covers Rolls",
    category: "Disposable Goods",
    image: "/images/table_covers.jpg",
    shortDescription: "Elegant, highly absorbent disposable table cover rolls for catering and events.",
    description: "Harsh Industries Table Covers Rolls provide a hygienic, premium surface for dining and catering events. Made from a durable paper-poly blend, they offer the elegant look and feel of fabric while featuring a waterproof backing that protects tables from spills. Perfect for large-scale events, banquets, and everyday restaurant use.",
    features: [
      "High absorbency top layer",
      "Waterproof poly-backing",
      "Tear-resistant durability",
      "Elegant embossed patterns"
    ],
    specs: {
      "Roll Dimensions": "1.2m x 50m (Customizable)",
      "Material": "Paper-Poly laminate (Tissue + PE)",
      "Pricing": "₹150 per Roll",
      "Colors": "White, Kraft, Custom Pantone",
      "Minimum Order": "100 Rolls"
    }
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
