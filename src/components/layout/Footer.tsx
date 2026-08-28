import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full border-t border-outline-variant flat no shadows grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-xl">
      <div className="md:col-span-1 flex flex-col gap-sm items-start">
        <img
          alt="Harsh Industries Logo"
          className="h-14 w-auto object-contain mb-xs"
          src="/images/logo.png"
        />
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[200px]">
          Precision manufacturing for the modern food service industry.
        </p>
        <div className="mt-md font-mono-data text-mono-data text-on-surface-variant">
          A-28/3, Khadka MIDC, Bhusawal 425201, Maharashtra
          <br />
          Msk57510@gmail.com
          <br />
          +91 7000922254
        </div>
      </div>
      <div className="md:col-span-3 flex flex-wrap gap-xl md:justify-end">
        <div className="flex flex-col gap-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant mb-xs">
            Company
          </span>
          <Link
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            href="/why-us"
          >
            Why Us
          </Link>
          <Link
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            href="/business-card"
          >
            Digital Business Card
          </Link>
          <a
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            href="#"
          >
            Factory Map
          </a>
          <a
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            href="#"
          >
            Supply Chain
          </a>
        </div>
        <div className="flex flex-col gap-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant mb-xs">
            Legal
          </span>
          <a
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            href="#"
          >
            Terms of Service
          </a>
        </div>
      </div>
      <div className="md:col-span-4 border-t brutalist-border border-outline-variant/30 mt-lg pt-lg flex justify-between items-center">
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          © 2026 Harsh Industries. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
