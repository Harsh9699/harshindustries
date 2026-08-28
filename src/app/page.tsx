"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnquiryForm from "@/components/home/EnquiryForm";
import { products } from "@/lib/data/products";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="flex-grow pt-[80px] md:pt-[100px]">
        {/* Hero Section */}
        <section className="relative min-h-[450px] md:min-h-[600px] flex items-center justify-center overflow-hidden py-12">
          {/* Background Video */}
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>
            {/* Dark Overlay for Legibility */}
            <div className="absolute inset-0 bg-[#07130a]/60 backdrop-blur-[2px]"></div>
          </motion.div>

          {/* Content Container */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center gap-lg"
          >
            <motion.h1 variants={fadeUp} className="font-display-lg text-display-lg text-white leading-tight max-w-[896px]">
              Welcome To Harsh Industries
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body-lg text-body-lg text-white/90 max-w-[672px]">
              High-quality, eco-friendly, and food-grade certified paper cups manufactured with precision. Built for industrial scale and custom branding.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-md mt-sm">
              <Link href="/products">
                <button className="btn-primary font-label-caps text-label-caps px-xl py-md h-[48px] inline-flex items-center justify-center hover:opacity-90 transition-opacity">
                  Order Now
                </button>
              </Link>
              <Link href="/#enquiry">
                <button className="bg-transparent border-2 border-white text-white rounded-full font-label-caps text-label-caps px-xl py-md h-[48px] inline-flex items-center justify-center hover:bg-white/10 transition-colors">
                  Request Sample
                </button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-xl mt-xl pt-lg border-t border-white/20 w-full max-w-[672px]">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary-fixed" data-icon="eco">eco</span>
                <span className="font-mono-data text-mono-data text-white">Eco Friendly</span>
              </div>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary-fixed" data-icon="verified">verified</span>
                <span className="font-mono-data text-mono-data text-white">Food Grade</span>
              </div>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary-fixed" data-icon="water_drop">water_drop</span>
                <span className="font-mono-data text-mono-data text-white">Leak Proof</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Strip */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-surface-container-highest border-y brutalist-border py-lg"
        >
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
              <div className="flex flex-col items-center justify-center gap-sm text-center p-md bg-surface border brutalist-border rounded-lg hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-[32px]" data-icon="layers">layers</span>
                <span className="font-label-caps text-label-caps text-on-surface">Paper Cup Raw Material</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-sm text-center p-md bg-surface border brutalist-border rounded-lg hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-[32px]" data-icon="album">album</span>
                <span className="font-label-caps text-label-caps text-on-surface">Paper Plate Material</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-sm text-center p-md bg-surface border brutalist-border rounded-lg hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-[32px]" data-icon="local_cafe">local_cafe</span>
                <span className="font-label-caps text-label-caps text-on-surface">Finished Paper Cups</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-sm text-center p-md bg-surface border brutalist-border rounded-lg hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-[32px]" data-icon="table_restaurant">table_restaurant</span>
                <span className="font-label-caps text-label-caps text-on-surface">Table Cover Rolls</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Product Gallery */}
        <section className="py-[120px] px-margin-mobile md:px-margin-desktop max-w-[1600px] mx-auto overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end mb-xl"
          >
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Product Gallery</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-[672px]">
                Explore our range of precision-manufactured cups, featuring custom designs and robust structural integrity for diverse applications.
              </p>
            </div>
            <div className="hidden md:flex gap-sm">
              <button className="w-12 h-12 rounded-full border brutalist-border flex items-center justify-center hover:border-primary text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="w-12 h-12 rounded-full border brutalist-border flex items-center justify-center hover:border-primary text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-gutter overflow-x-auto hide-scrollbar pb-lg snap-x snap-mandatory"
          >
            {products.map((product) => (
              <Link href={`/products/${product.slug}`} key={product.slug} className="min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-start bg-surface-container-high rounded-lg border brutalist-border overflow-hidden group hover:border-primary transition-all">
                <div className="h-[250px] md:h-[300px] bg-surface-container-lowest relative overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  ></div>
                  <div className="absolute top-sm right-sm bg-surface/80 backdrop-blur-sm border brutalist-border px-sm py-xs rounded flex items-center gap-xs">
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                    <span className="font-mono-data text-mono-data text-[10px] text-on-surface uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-lg">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">{product.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{product.shortDescription}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        </section>

        {/* Stats Bar */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-secondary-container py-xl border-y brutalist-border"
        >
          <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-xl text-center md:text-left">
            <motion.div variants={fadeUp} className="border-b md:border-b-0 md:border-r border-outline/30 pb-lg md:pb-0 md:pr-lg">
              <div className="font-display-lg text-display-lg text-primary mb-xs">15+</div>
              <div className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Years of Precision</div>
            </motion.div>
            <motion.div variants={fadeUp} className="border-b md:border-b-0 md:border-r border-outline/30 pb-lg md:pb-0 md:pr-lg">
              <div className="font-display-lg text-display-lg text-primary mb-xs">1M+</div>
              <div className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Daily Capacity</div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="font-display-lg text-display-lg text-primary mb-xs">500+</div>
              <div className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">B2B Partners</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enquiry Form */}
        <motion.section 
          id="enquiry"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="py-[120px] px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto"
        >
          <div className="bg-surface-container-low rounded-xl border brutalist-border grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl">
            <div className="relative h-[400px] md:h-auto border-b md:border-b-0 md:border-r brutalist-border">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuVAXdVJNF4XF2LVau5S-pO1GyKcEnBbKgJ9JFp_y3fqlSOOsrfUFvRQGugsMBdRE-WIwb2YbjwjmZjuq2kDZ6fuDRHmVkA3QCeQsCJcFZ_lghnRd93f_r6NfA5z5AJmxwV_l36GuV2KOGCgcq95ZVJ3CTRw5Z33Atf2-cU1ClB4hE7CgD99okcqrJjVwZyVN_rdz7fB7488eVz1_LYRRYRHi5Au75a2z70DHV4ORna1Ka1e2atMcr')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-lg w-full">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Scale Your Supply</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-[400px]">Connect with our manufacturing experts for wholesale pricing and custom production runs.</p>
              </div>
            </div>
            <div className="p-xl bg-surface-container-high">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-lg">Request a Sample</h3>
              <EnquiryForm />
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
