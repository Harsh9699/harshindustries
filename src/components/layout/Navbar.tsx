"use client";
import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { totalItems, mounted } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* TopNavBar */}
      <nav className="bg-surface-container-low fixed top-0 w-full z-50 border-b border-outline flex justify-between items-center px-margin-desktop py-sm max-w-full mx-auto hidden md:flex">
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
              Cart {mounted && totalItems > 0 ? \(\)\ : ""}
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="bg-surface-container-low fixed top-0 w-full z-[60] border-b border-outline flex justify-between items-center px-margin-mobile py-sm md:hidden">
        <Link href="/" className="flex items-center gap-sm">
          <img
            alt="Harsh Industries Logo"
            className="h-12 w-auto object-contain"
            src="/images/logo.png"
          />
        </Link>
        
        <div className="flex items-center gap-md">
          <Link href="/cart" className="relative p-1">
            <span className="material-symbols-outlined text-on-surface-variant text-[24px]">shopping_cart</span>
            {mounted && totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="material-symbols-outlined text-primary text-[28px] p-1"
          >
            {isMobileOpen ? "close" : "menu"}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] bg-surface z-50 flex flex-col p-lg md:hidden shadow-lg border-b border-outline"
            style={{ height: 'calc(100vh - 72px)' }}
          >
            <div className="flex flex-col gap-lg mt-md">
              <Link 
                onClick={() => setIsMobileOpen(false)} 
                href="/products" 
                className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-sm"
              >
                Products
              </Link>
              <Link 
                onClick={() => setIsMobileOpen(false)} 
                href="/why-us" 
                className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-sm"
              >
                Why Us
              </Link>
              <Link 
                onClick={() => setIsMobileOpen(false)} 
                href="/#enquiry" 
                className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-sm"
              >
                Contact
              </Link>
              <Link 
                onClick={() => setIsMobileOpen(false)} 
                href="/track" 
                className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant/30 pb-sm"
              >
                Track Order
              </Link>
            </div>
            
            <div className="mt-auto mb-xl flex flex-col gap-sm">
               <p className="font-label-caps text-on-surface-variant">Need Help?</p>
               <a href="tel:+917000922254" className="font-headline-sm text-primary flex items-center gap-xs">
                 <span className="material-symbols-outlined">call</span>
                 +91 70009 22254
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
