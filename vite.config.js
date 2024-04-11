export default {
    base: '',
    root: './',
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          component1: 'src/components/maps/web-map-leaflet.js',
          component2: 'src/components/maps/web-map-openlayers.js',
          component3: 'src/components/maps/web-map.js',
          component4: 'src/components/maps/web-mapbox-gl.js',
          component5: 'src/components/maps/web-maplibre-gl.js'
        },
        output: {
          assetFileNames: `assets/[name].[ext]`
        }
      }
    }// other options...
}