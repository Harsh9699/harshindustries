"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function WhyUsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[80px] md:pt-[120px] bg-background">
        {/* Header Section */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-[1000px] mx-auto text-center py-xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-md items-center">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-xs bg-primary-container text-on-primary-container px-sm py-xs rounded-full font-label-caps text-[10px] uppercase tracking-widest mb-sm">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              The Harsh Industries Difference
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-headline-lg text-headline-lg text-primary">
              Rooted in Quality. Built for Scale.
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body-lg text-body-lg text-on-surface-variant max-w-[700px]">
              We don't just manufacture paper products; we engineer reliable, eco-friendly solutions that elevate your brand and protect the environment. Here is why top cafes, distributors, and event organizers choose us.
            </motion.p>
          </motion.div>
        </section>

        {/* Pillars Section */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto py-xl">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-lg"
          >
            {/* Pillar 1 */}
            <motion.div variants={fadeUp} className="bg-surface p-xl rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-sm">
              <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-[32px]">precision_manufacturing</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Uncompromising Precision</h3>
              <p className="font-body-md text-on-surface-variant">
                Our state-of-the-art facility in Bhusawal MIDC utilizes advanced ultrasonic sealing and precision die-cutting technology. This ensures every single cup and plate is completely leak-proof, structurally rigid, and perfectly formed without jamming your machines.
              </p>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div variants={fadeUp} className="bg-surface p-xl rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-sm">
              <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-[32px]">forest</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Eco-Friendly First</h3>
              <p className="font-body-md text-on-surface-variant">
                We are deeply committed to sustainability. All our raw materials are sourced from certified ethical mills. We offer 100% food-grade paper with biodegradable coating options, ensuring your products are as kind to the earth as they are safe for your customers.
              </p>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div variants={fadeUp} className="bg-surface p-xl rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-sm">
              <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-[32px]">factory</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Massive Industrial Scale</h3>
              <p className="font-body-md text-on-surface-variant">
                Whether you need a small batch of custom prints or massive wholesale volume, we deliver. With a daily capacity exceeding 1 Million units, we guarantee uninterrupted supply chains, rigorous quality checks at scale, and timely deliveries across the country.
              </p>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div variants={fadeUp} className="bg-surface p-xl rounded-2xl border border-outline-variant shadow-sm flex flex-col gap-sm">
              <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-[32px]">palette</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary">Striking Custom Branding</h3>
              <p className="font-body-md text-on-surface-variant">
                Your packaging is your best advertisement. We offer vibrant, food-safe flexographic and offset printing with up to 6 custom colors. Our in-house design team ensures your logo, wrappers, and brand identity look flawless on every cup.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-on-primary py-xl mt-xl">
          <div className="max-w-[800px] mx-auto px-margin-mobile text-center flex flex-col items-center gap-md">
            <h2 className="font-headline-lg text-headline-lg text-white">Experience the Quality Yourself</h2>
            <p className="font-body-lg text-white/90">
              Stop settling for weak, generic paper products. Partner with us for durable, branded, and sustainable solutions.
            </p>
            <div className="flex gap-sm mt-md">
              <Link href="/#enquiry">
                <button className="bg-white text-primary rounded-full font-label-caps text-label-caps px-xl py-md h-[48px] inline-flex items-center justify-center hover:bg-surface-container transition-colors shadow-sm">
                  Request Sample
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
