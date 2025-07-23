import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BCV Calculator",
    short_name: "BCVCalc",
    description: "Helps you calculate the BCV and visualize the dealer margins.",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "./icon.png",
        type: "image/png",
      },
    ],
  }
}
