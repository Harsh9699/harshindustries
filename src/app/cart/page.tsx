"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/lib/hooks/useCart";
import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, mounted } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setStatus("loading");
    setErrorMessage("");

    try {
      if (!db) {
        console.warn("Firebase not configured. Simulating submission...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        setTrackingId("TEST-TRACKING-CART-123");
        setStatus("success");
        clearCart();
        return;
      }

      const cartDetails = items.map(item => `${item.title} (Qty: ${item.quantity})`).join(", ");

      const docRef = await addDoc(collection(db, "enquiries"), {
        ...formData,
        product: cartDetails, // Store all cart items as a comma-separated string for the admin panel
        requestType: "Order", // Cart checkouts are always full orders
        status: "New",
        createdAt: serverTimestamp(),
      });
      
      setTrackingId(docRef.id);
      setStatus("success");
      clearCart();
      
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to submit order.");
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  if (status === "success") {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-[100px] md:pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop min-h-[70vh] bg-background flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-md border border-primary">
            <span className="material-symbols-outlined text-primary text-4xl">check</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Order Received!</h1>
          <p className="font-body-lg text-on-surface-variant max-w-[500px] text-center mb-lg">
            Thank you for your order. Our manufacturing team will review your requirements and contact you shortly.
          </p>
          <div className="bg-surface-container-low border brutalist-border p-md rounded-lg text-center mb-lg">
            <div className="font-label-caps text-[12px] text-on-surface-variant mb-1 uppercase tracking-widest">Your Tracking ID</div>
            <div className="font-mono-data font-bold text-primary text-2xl tracking-widest">{trackingId}</div>
          </div>
          <Link href="/track">
            <button className="btn-primary font-label-caps text-label-caps px-xl py-md h-[48px] hover:opacity-90 transition-opacity">
              Track Order Status
            </button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[100px] md:pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop min-h-screen bg-background">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-lg">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="bg-surface border brutalist-border rounded-xl p-xl text-center flex flex-col items-center gap-md">
              <span className="material-symbols-outlined text-[64px] text-outline-variant">shopping_cart</span>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Your cart is empty</h3>
                <p className="font-body-md text-on-surface-variant mt-xs">Looks like you haven't added any products yet.</p>
              </div>
              <Link href="/products">
                <button className="btn-primary font-label-caps text-label-caps px-xl py-md h-[48px] mt-md">
                  Browse Products
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-xl">
              {/* Cart Items List */}
              <div className="flex-1 flex flex-col gap-md">
                {items.map((item) => (
                  <motion.div layout key={item.slug} className="bg-surface border brutalist-border rounded-xl p-sm md:p-md flex flex-col md:flex-row gap-md items-start md:items-center">
                    <div 
                      className="w-full md:w-[120px] h-[120px] bg-cover bg-center rounded-lg border brutalist-border shrink-0"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="flex-1 flex flex-col gap-xs">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">{item.title}</h3>
                      <p className="font-mono-data text-primary font-bold">{item.priceString}</p>
                    </div>
                    <div className="flex items-center gap-md w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-outline-variant/30 pt-sm md:pt-0 mt-sm md:mt-0">
                      <div className="flex items-center bg-surface-container-lowest border brutalist-border rounded-full px-sm h-[40px]">
                        <button 
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="w-10 text-center font-mono-data">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.slug)}
                        className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center hover:bg-error hover:text-on-error transition-colors shrink-0"
                        title="Remove item"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Checkout Form */}
              <div className="w-full lg:w-[450px] shrink-0">
                <div className="bg-surface-container-lowest border brutalist-border rounded-xl p-lg relative lg:sticky lg:top-[120px]">
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-md pb-sm border-b border-outline-variant/30">Checkout Details</h2>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                    <div>
                      <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Full Name</label>
                      <input 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-surface border brutalist-border rounded text-on-surface font-body-md px-md py-sm focus:border-primary h-[48px]" 
                        type="text" 
                      />
                    </div>
                    <div>
                      <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Business Email</label>
                      <input 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-surface border brutalist-border rounded text-on-surface font-body-md px-md py-sm focus:border-primary h-[48px]" 
                        type="email" 
                      />
                    </div>
                    <div>
                      <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Contact Number</label>
                      <input 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-surface border brutalist-border rounded text-on-surface font-body-md px-md py-sm focus:border-primary h-[48px]" 
                        type="tel" 
                      />
                    </div>
                    <div>
                      <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Delivery Address</label>
                      <textarea 
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-surface border brutalist-border rounded text-on-surface font-body-md px-md py-sm focus:border-primary min-h-[80px]" 
                      />
                    </div>
                    
                    {status === "error" && (
                      <div className="text-error font-body-sm bg-error-container/20 border border-error p-sm rounded-sm">
                        {errorMessage}
                      </div>
                    )}

                    <button 
                      disabled={status === "loading"}
                      className="btn-primary font-label-caps text-label-caps px-lg py-md h-[54px] w-full hover:opacity-90 transition-opacity mt-sm disabled:opacity-50 flex items-center justify-center gap-xs text-[16px]" 
                      type="submit"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {status === "loading" ? "hourglass_empty" : "send"}
                      </span>
                      {status === "loading" ? "Processing..." : "Place Bulk Order"}
                    </button>
                    <p className="font-body-sm text-on-surface-variant text-center mt-xs">
                      No payment required. Our team will contact you to confirm pricing and logistics.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
