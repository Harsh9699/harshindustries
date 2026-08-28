import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data/products";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[100px] md:pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop max-w-[1600px] mx-auto min-h-screen">
        <div className="mb-xl text-center md:text-left">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Our Catalog</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-[672px]">
            Explore our complete range of precision-manufactured paper products. Built for scale, durability, and brand impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {products.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.slug} className="group cursor-pointer">
              <div className="bg-surface-container-high rounded-lg border brutalist-border overflow-hidden h-full flex flex-col hover:border-primary transition-all">
                <div className="h-[250px] md:h-[300px] bg-surface-container-lowest relative overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  ></div>
                  <div className="absolute top-sm right-sm bg-surface/80 backdrop-blur-sm border brutalist-border px-sm py-xs rounded flex items-center gap-xs">
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                    <span className="font-mono-data text-mono-data text-[10px] text-on-surface uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-lg flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">{product.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">{product.shortDescription}</p>
                  </div>
                  <div className="font-label-caps text-label-caps text-primary group-hover:underline">
                    View Specifications &rarr;
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
