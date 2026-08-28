"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function BusinessCardPage() {
  const websiteUrl = "https://harshindustries.com"; // Change to the actual deployed domain
  // Using an open API to generate a real working QR code in our theme color (Hex 2B5C3F without the #)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(websiteUrl)}&color=2B5C3F&bgcolor=FBFBF9`;

  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-grow pt-[100px] md:pt-[140px] pb-xl px-margin-mobile md:px-margin-desktop min-h-screen bg-surface-container-lowest print:p-0 print:m-0 print:min-h-0">
        <div className="max-w-[1000px] mx-auto print:max-w-none">
          
          <div className="text-center mb-xl print:hidden">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-sm">Your Business Card</h1>
            <p className="font-body-md text-on-surface-variant max-w-[600px] mx-auto mb-lg">
              We generated a premium, print-ready business card matching your new Eco-Friendly brand. 
              The QR code on the back works automatically—scan it with your phone to open the website!
            </p>
            <button 
              onClick={() => window.print()}
              className="btn-primary font-label-caps text-label-caps px-xl py-md rounded-full shadow-md hover:-translate-y-1 transition-transform flex items-center gap-xs mx-auto"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              Print High-Quality Card
            </button>
            <p className="font-mono-data text-[12px] text-on-surface-variant mt-xs">
              (Tip: Check "Background Graphics" in your printer settings)
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-xl items-center justify-center print:block print:w-full">
            
            {/* Front of Card (What We Do & Make) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-[400px] aspect-[1.75/1] bg-[#FBFBF9] border brutalist-border rounded-xl shadow-xl flex flex-col items-center justify-center p-6 relative overflow-hidden print:shadow-none print:break-after-page print:border-outline-variant print:max-w-[3.5in] print:h-[2in] print:mx-auto print:mb-8"
              style={{ width: "3.5in", height: "2in", boxSizing: "border-box" }}
            >
              {/* Decorative border */}
              <div className="absolute inset-2 border border-primary/20 rounded-lg pointer-events-none"></div>
              
              <img 
                src="/images/logo.png" 
                alt="Harsh Industries Logo" 
                className="h-[40px] w-auto object-contain mb-2"
              />
              <h2 className="font-headline-sm text-[12px] text-primary font-bold uppercase tracking-widest mb-1 text-center">
                Harsh Industries
              </h2>
              <div className="w-8 h-[1px] bg-primary/50 mb-2"></div>
              
              <p className="font-label-caps text-[7px] text-primary text-center uppercase tracking-widest mb-3">
                Precision Manufacturing • Eco-Friendly Packaging
              </p>

              <div className="w-full grid grid-cols-2 gap-x-2 gap-y-1.5 px-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span className="font-body-sm text-[8px] text-on-surface font-medium">Custom Paper Cups</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span className="font-body-sm text-[8px] text-on-surface font-medium">Die-Cut Cup Blanks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span className="font-body-sm text-[8px] text-on-surface font-medium">Paper Plate Rolls</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span className="font-body-sm text-[8px] text-on-surface font-medium">Table Cover Rolls</span>
                </div>
              </div>
            </motion.div>

            {/* Back of Card (Contact & Scanner) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-[400px] aspect-[1.75/1] bg-primary border border-primary-container rounded-xl shadow-xl flex flex-row relative overflow-hidden print:shadow-none print:border-outline-variant print:max-w-[3.5in] print:h-[2in] print:mx-auto"
              style={{ width: "3.5in", height: "2in", boxSizing: "border-box" }}
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 bottom-0 w-[45%] bg-black/10 border-l border-white/10"></div>
              
              {/* Left Side: Info */}
              <div className="flex-1 p-6 flex flex-col justify-center relative z-10 text-white">
                <h2 className="font-headline-sm text-[16px] font-bold tracking-tight mb-0.5">
                  Mahesh Kukreja
                </h2>
                <div className="font-label-caps text-[8px] text-white/70 uppercase tracking-widest mb-3">
                  Founder & Director
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[10px] text-secondary">call</span>
                    <span className="font-body-sm text-[9px]">+91 7000922254</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[10px] text-secondary">mail</span>
                    <span className="font-body-sm text-[9px]">Msk57510@gmail.com</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[10px] text-secondary mt-[1px]">location_on</span>
                    <span className="font-body-sm text-[8.5px] leading-tight max-w-[150px]">A-28/3, Khadka MIDC, Bhusawal 425201, Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[10px] text-secondary">language</span>
                    <span className="font-body-sm text-[9px]">harshindustries.com</span>
                  </div>
                </div>
              </div>

              {/* Right Side: QR Code */}
              <div className="w-[45%] p-4 flex flex-col items-center justify-center relative z-10">
                <div className="bg-white p-1.5 rounded shadow-sm w-[75px] h-[75px] flex items-center justify-center">
                  <img src={qrCodeUrl} alt="Scan to visit website" className="w-full h-full object-contain" />
                </div>
                <div className="font-label-caps text-[6px] text-white text-center mt-2 uppercase tracking-widest">
                  Scan To Order Online
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
