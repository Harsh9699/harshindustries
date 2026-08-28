"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { products } from "@/lib/data/products";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    product: "",
    requestType: "Sample",
  });
  
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Client-side URL parsing to avoid Next.js Suspense boundary requirements for useSearchParams
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const productParam = params.get("product");
      const typeParam = params.get("type");
      
      if (productParam || typeParam) {
        setFormData(prev => ({
          ...prev,
          product: productParam || prev.product,
          requestType: (typeParam === "Sample" || typeParam === "Order") ? typeParam : prev.requestType,
        }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      if (!db) {
        console.warn("Firebase not configured. Simulating submission...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        setTrackingId("TEST-TRACKING-123");
        setStatus("success");
        return;
      }

      const docRef = await addDoc(collection(db, "enquiries"), {
        ...formData,
        status: "New",
        createdAt: serverTimestamp(),
      });
      
      setTrackingId(docRef.id);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", address: "", product: "", requestType: "Sample" }); // Reset form
      
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to submit enquiry.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 border border-primary">
          <span className="material-symbols-outlined text-primary text-3xl">check</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Request Received</h3>
        <p className="font-body-md text-on-surface-variant max-w-[400px]">
          Thank you for reaching out. Our manufacturing team will review your request.
        </p>
        <div className="bg-surface-container-low border brutalist-border p-sm rounded mt-2 text-center inline-block">
          <div className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase">Your Tracking ID</div>
          <div className="font-mono-data font-bold text-primary text-lg tracking-widest">{trackingId}</div>
        </div>
        <p className="font-body-sm text-on-surface-variant mt-2">
          Save this ID to track your request status later.
        </p>
        <button 
          onClick={() => {
            setStatus("idle");
            setTrackingId("");
          }} 
          className="btn-outline font-label-caps text-label-caps px-lg py-sm mt-4 hover:bg-surface-container-high transition-colors"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
      <div>
        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Full Name</label>
        <input 
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full bg-surface border brutalist-border rounded text-on-surface font-body-md px-md py-sm focus:border-primary focus:ring-0 transition-colors h-[48px]" 
          placeholder="Enter your name" 
          type="text" 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <div>
          <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Business Email</label>
          <input 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-surface border brutalist-border rounded text-on-surface font-body-md px-md py-sm focus:border-primary focus:ring-0 transition-colors h-[48px]" 
            placeholder="you@company.com" 
            type="email" 
          />
        </div>
        <div>
          <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Contact Number</label>
          <input 
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-surface border brutalist-border rounded text-on-surface font-body-md px-md py-sm focus:border-primary focus:ring-0 transition-colors h-[48px]" 
            placeholder="+91 7000922254" 
            type="tel" 
          />
        </div>
      </div>
      <div>
        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Request Type</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-xs cursor-pointer">
            <input 
              type="radio" 
              name="requestType" 
              value="Sample" 
              checked={formData.requestType === "Sample"} 
              onChange={(e) => setFormData({...formData, requestType: e.target.value})}
              className="text-primary focus:ring-primary h-4 w-4"
            />
            <span className="font-body-md text-on-surface">Request a Sample</span>
          </label>
          <label className="flex items-center gap-xs cursor-pointer">
            <input 
              type="radio" 
              name="requestType" 
              value="Order" 
              checked={formData.requestType === "Order"} 
              onChange={(e) => setFormData({...formData, requestType: e.target.value})}
              className="text-primary focus:ring-primary h-4 w-4"
            />
            <span className="font-body-md text-on-surface">Place an Order</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Delivery Address</label>
        <textarea 
          required
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="w-full bg-surface border brutalist-border rounded text-on-surface font-body-md px-md py-sm focus:border-primary focus:ring-0 transition-colors min-h-[80px]" 
          placeholder="Enter your full address" 
        />
      </div>
      <div>
        <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Select Product</label>
        <select 
          required
          value={formData.product}
          onChange={(e) => setFormData({...formData, product: e.target.value})}
          className="w-full bg-surface border brutalist-border rounded text-on-surface font-body-md px-md py-sm focus:border-primary focus:ring-0 transition-colors h-[48px]"
        >
          <option value="" disabled>Choose a product for sample/order</option>
          {products.map((p) => (
            <option key={p.slug} value={p.title}>{p.title}</option>
          ))}
        </select>
      </div>
      
      {status === "error" && (
        <div className="text-error font-body-sm bg-error-container/20 border border-error p-sm rounded-sm">
          {errorMessage}
        </div>
      )}

      <button 
        disabled={status === "loading"}
        className="btn-primary font-label-caps text-label-caps px-lg py-md h-[48px] w-full hover:opacity-90 transition-opacity mt-sm disabled:opacity-50 flex items-center justify-center" 
        type="submit"
      >
        {status === "loading" ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
