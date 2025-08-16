import { defineConfig } from "vite";
export default defineConfig({
  plugins: [
    {
      manifest: {
        name: "Shopping List", // Full app name
        short_name: "ShopList", // Short name shown under app icon
        start_url: "/", // Entry point when app is launched
        display: "standalone", // Makes app look like a native app
        background_color: "#ffffff", // Background color for splash screen
        theme_color: "#2196f3", // Theme color for the browser UI
        orientation: "portrait", // Force app orientation to portrait

        // ===========================
        // ICONS 
        // ===========================
        icons: [
          {
            src: "/favicon_io/android-chrome-192x192.png", // Small icon
            sizes: "192x192", // Must match actual file size
            type: "image/png",
          },
          {
            src: "/favicon_io/android-chrome-512x512.png", // Large icon
            sizes: "512x512", // Must match actual file size
            type: "image/png",
          },
        ],

        // ===========================
        // SCREENSHOTS 
        // ===========================
        screenshots: [
          // {
          //   src: "/screenshot1.png", // Landscape screenshot
          //   sizes: "738x1854", 
          //   type: "image/png",
          //   form_factor: "narrow", // Required for desktop/mobile wide view
          // },
          {
            src: "/screenshot2.png", // Portrait screenshot
            sizes: "1410x762",
            type: "image/png",
            form_factor: "wide", // Required for mobile portrait view
          },
        ],
      },
    },
  ],
});
