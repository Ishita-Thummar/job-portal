// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   exclude: ['@mapbox/node-pre-gyp'],
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // Define `global` for compatibility
  },
  optimizeDeps: {
    exclude: [
      'jsonwebtoken',
      '@mapbox/node-pre-gyp',
      '@mswjs/interceptors',
      'mock-aws-s3',
      'aws-sdk',
      'nock',
    ],
  },
  server: {
    fs: {
      allow: ['..'], // Restrict access to necessary directories only
    },
  },
});
