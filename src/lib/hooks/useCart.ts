"use client";

import { useState, useEffect } from 'react';

export interface CartItem {
  slug: string;
  title: string;
  image: string;
  priceString: string;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
     
    setMounted(true);
    const stored = localStorage.getItem('harsh_cart');
    if (stored) {
      setItems(JSON.parse(stored));
    }
    
    const handleStorage = () => {
      const updated = localStorage.getItem('harsh_cart');
      if (updated) setItems(JSON.parse(updated));
    };
    window.addEventListener('harsh_cart_updated', handleStorage);
    return () => window.removeEventListener('harsh_cart_updated', handleStorage);
  }, []);

  const addToCart = (item: Omit<CartItem, 'quantity'>, qty: number = 1) => {
    const stored = localStorage.getItem('harsh_cart');
    const cart: CartItem[] = stored ? JSON.parse(stored) : [];
    
    const existing = cart.find(i => i.slug === item.slug);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ ...item, quantity: qty });
    }
    
    localStorage.setItem('harsh_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('harsh_cart_updated'));
    setItems(cart);
  };

  const removeFromCart = (slug: string) => {
    const stored = localStorage.getItem('harsh_cart');
    if (!stored) return;
    const cart: CartItem[] = JSON.parse(stored).filter((i: CartItem) => i.slug !== slug);
    
    localStorage.setItem('harsh_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('harsh_cart_updated'));
    setItems(cart);
  };
  
  const updateQuantity = (slug: string, quantity: number) => {
    const stored = localStorage.getItem('harsh_cart');
    if (!stored) return;
    const cart: CartItem[] = JSON.parse(stored);
    const existing = cart.find(i => i.slug === slug);
    if (existing) {
        existing.quantity = Math.max(1, quantity);
        localStorage.setItem('harsh_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('harsh_cart_updated'));
        setItems(cart);
    }
  }

  const clearCart = () => {
    localStorage.setItem('harsh_cart', JSON.stringify([]));
    window.dispatchEvent(new Event('harsh_cart_updated'));
    setItems([]);
  };

  return { 
    items, 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    clearCart, 
    totalItems: items.reduce((acc, item) => acc + item.quantity, 0),
    mounted 
  };
}
