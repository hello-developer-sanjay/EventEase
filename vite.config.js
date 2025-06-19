import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/eventease': {
        target: 'https://q0lvs5rnt9.execute-api.ap-south-1.amazonaws.com/prod',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/eventease/, ''),
      },
      '/api/eventpro': {
        target: 'https://eventmanager-api-19july.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/eventpro/, ''),
      },
    },
  },
});