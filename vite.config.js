import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/goit-react-hw-05-phonebook/",
  build: {
    outDir: "./dist",
  },
});
