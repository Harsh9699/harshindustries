import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductBySlug, products } from "@/lib/data/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButtons from "@/components/products/AddToCartButtons";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[100px] md:pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto min-h-screen">
        {/* Breadcrumb */}
        <div className="font-mono-data text-mono-data text-on-surface-variant mb-lg">
          <Link href="/products" className="hover:text-primary">Products</Link> / <span className="text-on-surface">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          {/* Image Gallery */}
          <div className="bg-surface-container-lowest border brutalist-border rounded-lg overflow-hidden h-[400px] md:h-[600px] sticky top-[120px]">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${product.image}')` }}
            ></div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-lg">
            <div>
              <div className="inline-flex items-center gap-xs bg-surface-container-high border brutalist-border px-sm py-xs rounded mb-md">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span className="font-mono-data text-mono-data text-[10px] text-on-surface uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">{product.title}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">{product.description}</p>
            </div>

            <div className="h-px bg-outline-variant/30 w-full my-sm"></div>

            {/* Key Features */}
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-md">Key Features</h2>
              <ul className="flex flex-col gap-sm">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-sm font-body-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary mt-1" style={{ fontSize: '18px' }}>check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            <div className="mt-md">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-md">Technical Specifications</h2>
              <div className="border brutalist-border rounded overflow-hidden">
                <table className="w-full text-left font-body-sm">
                  <tbody className="divide-y divide-outline-variant/30">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key} className="bg-surface">
                        <td className="p-md text-on-surface-variant w-1/3 border-r brutalist-border">{key}</td>
                        <td className="p-md font-medium text-on-surface">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-xl p-lg bg-secondary-container border brutalist-border flex flex-col gap-lg">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Ready to order?</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Request a sample or place a bulk order.</p>
              </div>
              <AddToCartButtons 
                product={{
                  slug: product.slug,
                  title: product.title,
                  image: product.image,
                  priceString: product.specs["Pricing"],
                  availableSizes: product.availableSizes
                }} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
