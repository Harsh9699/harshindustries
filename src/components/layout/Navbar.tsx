"use client";
import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";

export default function Navbar() {
  const { totalItems, mounted } = useCart();

  return (
    <>
      {/* TopNavBar */}
      <nav className="bg-surface-container-low fixed top-0 w-full z-50 border-b border-outline flat no shadows flex justify-between items-center px-margin-desktop py-sm max-w-full mx-auto hidden md:flex">
        <Link href="/" className="flex items-center gap-sm cursor-pointer hover:opacity-90 transition-opacity">
          <img
            alt="Harsh Industries Logo"
            className="h-16 w-auto object-contain"
            src="/images/logo.png"
          />
        </Link>
        <ul className="flex gap-lg items-center">
          <li>
            <Link
              className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200 cursor-pointer"
              href="/products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200 cursor-pointer"
              href="/why-us"
            >
              Why Us
            </Link>
          </li>
          <li>
            <Link
              className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200 cursor-pointer"
              href="/#enquiry"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              className="text-on-surface-variant font-label-caps text-label-caps hover:text-primary transition-colors duration-200 cursor-pointer"
              href="/track"
            >
              Track Order
            </Link>
          </li>
        </ul>
        <div>
          <Link href="/cart">
            <button className="bg-primary text-on-primary font-label-caps text-label-caps px-xl py-sm rounded-full hover:opacity-90 transition-opacity active:scale-95 shadow-sm flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Cart {mounted && totalItems > 0 ? `(${totalItems})` : ""}
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="bg-surface-container-low fixed top-0 w-full z-50 border-b border-outline flex justify-between items-center px-margin-mobile py-sm md:hidden">
        <Link href="/" className="flex items-center gap-sm">
          <img
            alt="Harsh Industries Logo"
            className="h-12 w-auto object-contain"
            src="/images/logo.png"
          />
        </Link>
        <button className="material-symbols-outlined text-primary">menu</button>
      </nav>
    </>
  );
}
