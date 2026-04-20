import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    host: true,

    proxy: {
      // Backend API
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      },

      // Socket.IO real-time connection
      "/socket.io": {
        target: "http://localhost:3000",
        ws: true
      }
    }
  },

  build: {
    outDir: "dist"
  }
});
