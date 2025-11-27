import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // UPDATED: Set to '/' because you are now hosting at the root of danflatt.ca
  base: '/', 
  
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
