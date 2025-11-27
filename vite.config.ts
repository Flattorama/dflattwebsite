import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: The base must match your repo name for GitHub Pages to work
  base: '/dflattwebsite/', 
  
  plugins: [react()],
  
  resolve: {
    alias: {
      // Allows using imports like "@/components/Card"
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  server: {
    port: 3000,
    host: true,
  },
});
