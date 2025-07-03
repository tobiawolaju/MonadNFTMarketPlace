import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyfills from 'rollup-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      // This Rollup polyfill is required for wagmi
      'stream': 'rollup-plugin-node-polyfills/polyfills/stream',
      'util': 'rollup-plugin-node-polyfills/polyfills/util',
      'buffer': 'rollup-plugin-node-polyfills/polyfills/buffer',
      'process': 'rollup-plugin-node-polyfills/polyfills/process-es6',
      'crypto': 'rollup-plugin-node-polyfills/polyfills/crypto-browser',
      'assert': 'rollup-plugin-node-polyfills/polyfills/assert',
      'http': 'rollup-plugin-node-polyfills/polyfills/http',
      'https': 'rollup-plugin-node-polyfills/polyfills/http',
      'os': 'rollup-plugin-node-polyfills/polyfills/os',
      'url': 'rollup-plugin-node-polyfills/polyfills/url',
      'zlib': 'rollup-plugin-node-polyfills/polyfills/zlib',
      'path': 'rollup-plugin-node-polyfills/polyfills/path',
      'fs': 'rollup-plugin-node-polyfills/polyfills/fs',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin()
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyfills()
      ]
    }
  }
})
