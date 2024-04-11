// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

const production = process.env.NODE_ENV === 'production';

export default {
  input: [
    'src/components/map-app.js',
    'src/components/maps/web-map-leaflet.js',
    'src/components/maps/web-map-openlayers.js',
    'src/components/maps/web-map.js',
    'src/components/maps/web-mapbox-gl.js',
    'src/components/maps/web-maplibre-gl.js'
  ],
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    assetFileNames: '[name][extname]',
    preserveModules: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    production && terser(),
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' },
        { src: 'public/**/*', dest: 'dist' }
      ]
    })
  ]
};