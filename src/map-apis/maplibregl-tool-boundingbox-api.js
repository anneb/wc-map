// maplibregl-handler.js
import { MapToolBoundingboxInterface  } from '../interfaces/map-tool-boundingbox-interface.js';

class MaplibreglToolBoundingboxAPI extends MapToolBoundingboxInterface {
    constructor(mapInstance) {
        super();
        this.webMap = mapInstance;
    }

    addMarker(lng, lat) {
      const el = document.createElement('div');
      el.style.backgroundColor = '#007cbf'; // color of the circle
      el.style.width = '20px'; // width of the circle
      el.style.height = '20px'; // height of the circle
      el.style.borderRadius = '50%'; // make the element a circle
      
      // Create a new marker with the custom element
      const marker = new this.webMap._maplibrary.Marker({
        element: el,
        draggable: true
      })
        .setLngLat([lng, lat]) // replace with your coordinates
        .addTo(this.webMap._map);
      
      // Add event listeners for the dragstart and dragend events
      marker.on('dragstart', function() {
        console.log('Drag start');
      });
      
      marker.on('dragend', function() {
        console.log('Drag end');
        var lngLat = marker.getLngLat();
        console.log('New coordinates: ' + lngLat.lng + ', ' + lngLat.lat);
      });
      return marker;
    }

    updateMarker(markerId, lat, lng) {
        // Update logic specific to MaplibreGL
    }

    finalizeBoundingBox() {
        // Finalize bounding box for MaplibreGL
    }
}

export { MaplibreglToolBoundingboxAPI };
