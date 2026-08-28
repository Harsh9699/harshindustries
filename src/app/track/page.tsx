"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

export default function TrackOrderPage() {
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (!db) {
        throw new Error("Database configuration missing.");
      }

      const docRef = doc(db, "enquiries", trackingId.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setResult({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError("We couldn't find an order or sample request with that Tracking ID.");
      }
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while tracking your order. Please ensure the Tracking ID is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[100px] md:pt-[120px] pb-xl px-margin-mobile md:px-margin-desktop min-h-screen bg-background">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-xl">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-sm">Track Your Request</h1>
            <p className="font-body-md text-on-surface-variant max-w-[500px] mx-auto">
              Enter the Tracking ID provided when you submitted your order or sample request to check its current status.
            </p>
          </div>

          <div className="bg-surface border brutalist-border p-lg md:p-xl rounded-xl shadow-sm mb-xl">
            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-md">
              <input 
                type="text"
                required
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your Tracking ID (e.g. abc123xyz)"
                className="flex-1 bg-surface-container-lowest border brutalist-border rounded px-md py-sm font-body-md focus:border-primary focus:ring-0 transition-colors h-[54px]"
              />
              <button 
                type="submit" 
                disabled={loading || !trackingId.trim()}
                className="btn-primary font-label-caps text-label-caps h-[54px] px-xl flex items-center justify-center min-w-[150px]"
              >
                {loading ? "Tracking..." : "Track Now"}
              </button>
            </form>
            {error && (
              <div className="mt-md p-sm bg-error-container/20 border border-error text-error font-body-sm rounded">
                {error}
              </div>
            )}
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container-lowest border brutalist-border rounded-xl overflow-hidden"
            >
              <div className="p-lg bg-surface border-b brutalist-border flex flex-col md:flex-row justify-between items-start md:items-center gap-sm">
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">Tracking ID</div>
                  <div className="font-mono-data text-primary">{result.id}</div>
                </div>
                <div className="text-left md:text-right">
                  <div className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">Type</div>
                  <div className="font-body-md font-medium text-on-surface">{result.requestType || "Sample Request"}</div>
                </div>
              </div>

              <div className="p-lg md:p-xl">
                <div className="relative">
                  {/* Status Timeline */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-outline-variant/30"></div>
                  
                  {/* Step 1: Received */}
                  <div className="flex gap-md relative mb-xl">
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_var(--color-surface-container-lowest)]">
                      <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Request Received</h3>
                      <p className="font-body-sm text-on-surface-variant mt-xs">
                        Your request for <span className="font-medium text-on-surface">{result.product}</span> was successfully received.
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Processing/Accepted/Declined */}
                  <div className="flex gap-md relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_var(--color-surface-container-lowest)] ${
                      result.status === "New" ? "bg-surface border-2 border-outline-variant text-outline-variant" :
                      result.status === "Accepted" ? "bg-[#2e7d32] text-white" :
                      result.status === "Declined" ? "bg-error text-white" : "bg-primary text-on-primary"
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {result.status === "New" ? "pending" :
                         result.status === "Accepted" ? "check_circle" :
                         result.status === "Declined" ? "cancel" : "info"}
                      </span>
                    </div>
                    <div>
                      <h3 className={`font-headline-sm text-headline-sm ${
                        result.status === "New" ? "text-on-surface-variant" :
                        result.status === "Accepted" ? "text-[#2e7d32]" :
                        result.status === "Declined" ? "text-error" : "text-primary"
                      }`}>
                        {result.status === "New" ? "Under Review" :
                         result.status === "Accepted" ? "Request Approved" :
                         result.status === "Declined" ? "Request Declined" : result.status}
                      </h3>
                      <p className="font-body-sm text-on-surface-variant mt-xs">
                        {result.status === "New" ? "Our manufacturing team is currently reviewing your request." :
                         result.status === "Accepted" ? "Your request has been approved! We will contact you shortly regarding delivery and next steps." :
                         result.status === "Declined" ? "Unfortunately, we cannot fulfill this request at the moment. Please contact us for more details." : 
                         "Status updated."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mt-xl pt-lg border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-2 gap-md">
                   <div>
                      <div className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">Customer</div>
                      <div className="font-body-sm text-on-surface">{result.name}</div>
                   </div>
                   <div>
                      <div className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">Contact Email</div>
                      <div className="font-body-sm text-on-surface">{result.email}</div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
