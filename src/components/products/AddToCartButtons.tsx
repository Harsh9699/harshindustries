"use client";

import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import Link from "next/link";

interface AddToCartButtonsProps {
  product: {
    slug: string;
    title: string;
    image: string;
    priceString?: string;
    availableSizes?: string[];
  };
}

export default function AddToCartButtons({ product }: AddToCartButtonsProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || "");

  const handleAddToCart = () => {
    const finalTitle = selectedSize ? `${product.title} - ${selectedSize}` : product.title;
    const finalSlug = selectedSize ? `${product.slug}-${selectedSize.replace(/\s+/g, '-').toLowerCase()}` : product.slug;
    
    addToCart({
      slug: finalSlug,
      title: finalTitle,
      image: product.image,
      priceString: product.priceString || "Contact for pricing",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-lg w-full">
      {product.availableSizes && product.availableSizes.length > 0 && (
        <div className="bg-surface-container-lowest p-md rounded border brutalist-border">
          <label className="block font-label-caps text-[12px] text-on-surface-variant mb-md uppercase tracking-widest">Select Size</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-sm">
            {product.availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`font-label-caps text-label-caps py-sm border rounded transition-colors whitespace-nowrap flex items-center justify-center ${
                  selectedSize === size 
                    ? 'bg-primary border-primary text-on-primary shadow-sm' 
                    : 'bg-surface border-outline-variant text-on-surface hover:border-primary hover:text-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-md">
        <Link href={`/#enquiry?product=${product.title}${selectedSize ? ` - ${selectedSize}` : ''}&type=Sample`} className="flex-1">
          <button className="btn-outline font-label-caps text-label-caps px-xl py-md h-[54px] w-full whitespace-nowrap">
            Request Sample
          </button>
        </Link>
        <button 
          onClick={handleAddToCart}
          className={`${added ? 'bg-primary-container text-on-primary-container border-primary-container' : 'btn-primary'} flex-1 font-label-caps text-label-caps px-xl py-md h-[54px] w-full transition-colors flex items-center justify-center gap-xs whitespace-nowrap`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {added ? 'check' : 'add_shopping_cart'}
          </span>
          {added ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
