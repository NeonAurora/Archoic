import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Site configuration
  site: 'https://archoic.com', // Replace with your actual domain
  
  // Build optimizations
  build: {
    inlineStylesheets: 'auto', // Inline small CSS files
  },
  
  // Image optimization
  image: {
    // Add domains for external images if needed
    // domains: ['images.unsplash.com'],
  },
  
  // Vite configuration
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Let Astro handle chunk splitting
          manualChunks: undefined,
        },
      },
    },
  },
});
