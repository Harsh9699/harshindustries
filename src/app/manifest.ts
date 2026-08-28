import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harsh Industries",
    short_name: "Harsh Ind",
    description: "Premium paper cups, plates, and materials manufacturer.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBFBF9",
    theme_color: "#556B2F",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
