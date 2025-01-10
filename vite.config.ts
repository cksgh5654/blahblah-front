import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
    },
  },
  // 절대 경로 설정
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
    ],
  },
});
