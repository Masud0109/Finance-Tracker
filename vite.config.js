import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/finance-tracker/', // Use your actual repo name, all lowercase and no spaces
});