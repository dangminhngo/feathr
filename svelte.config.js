import path from 'path'

import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import svg from '@poppanator/sveltekit-svg'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        svg({
          includePaths: ['./src/assets/icons'],
        }),
      ],
      resolve: {
        alias: {
          $: path.resolve('./src'),
          $assets: path.resolve('./src/assets'),
          $components: path.resolve('./src/components'),
          $lib: path.resolve('./src/lib'),
          $routes: path.resolve('./src/routes'),
          $styles: path.resolve('./src/styles'),
        },
      },
    },
  },
}

export default config
