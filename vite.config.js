import path from 'path'

import { sveltekit } from '@sveltejs/kit/vite'
import svg from '@poppanator/sveltekit-svg'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    svg({
      includePaths: ['./src/assets/icons'],
    }),
    sveltekit(),
  ],
  resolve: {
    alias: {
      $assets: path.resolve('./src/assets'),
      $lib: path.resolve('./src/lib'),
      $routes: path.resolve('./src/routes'),
    },
  },
}

export default config
