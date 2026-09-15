import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const splineWasmFiles = ['process.wasm', 'physics.wasm', 'navmesh.wasm']
const splineRuntimeBuild = resolve(
  'node_modules/@splinetool/runtime/build',
)

function splineWasmAssets() {
  return {
    name: 'spline-wasm-assets',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const fileName = request.url?.split('?')[0].slice(1)
        if (!splineWasmFiles.includes(fileName)) {
          next()
          return
        }

        response.setHeader('Content-Type', 'application/wasm')
        response.end(readFileSync(resolve(splineRuntimeBuild, fileName)))
      })
    },
    generateBundle() {
      for (const fileName of splineWasmFiles) {
        this.emitFile({
          type: 'asset',
          fileName,
          source: readFileSync(resolve(splineRuntimeBuild, fileName)),
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), splineWasmAssets()],
})
