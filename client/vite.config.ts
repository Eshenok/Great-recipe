import { defineConfig } from 'vite';
import { createServer } from 'vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2021,
  }
})
