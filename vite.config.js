import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ⚠️  CHANGE "sayang-gacha" below to your actual GitHub repo name.
//     Example: repo is "for-mabel" → base: '/for-mabel/'
//     This MUST match or all images will 404 on GitHub Pages.

export default defineConfig({
  plugins: [react()],
  base: '/sayang-gacha/',
});
