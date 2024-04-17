import { html } from 'lit';

import { WebMap } from './web-map.js';
import { fetchText } from '../../utils/fetchdata.js';
import '../internal/map-positioner.js';

export class WebMapLibreGL extends WebMap {

  render() {
    return html`
      <style>
        ${WebMapLibreGL.externalStyles}
      </style>
      <div id="map"></div>
      <map-positioner>
        <slot name="top-left" slot="top-left"></slot>
        <slot name="top-center" slot="top-center"></slot>
        <slot name="top-right" slot="top-right"></slot>
        <slot name="middle-center" slot="middle-center"></slot>
        <slot name="bottom-left" slot="bottom-left"></slot>
        <slot name="bottom-center" slot="bottom-center"></slot>
        <slot name="bottom-right" slot="bottom-right"></slot>
      </map-positioner>
    `;
  }

  static externalStyles = '';

  async connectedCallback() {
    super.connectedCallback();
    this.status = 'web-maplibre-gl connected to the DOM'
    try {
      // Fetch and apply the external CSS
      if (!WebMapLibreGL.externalStyles) {
        this.status = 'web-maplibre-gl fetching external CSS'        
        // fetch maplibre-gl.css from unpkg.com
        fetchText('https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.css').then((text) => {
          WebMapLibreGL.externalStyles = text;
          this.status = 'web-maplibre-gl external CSS fetched'
          this.requestUpdate();
        });
      }
      // Inject the mapboxgl script
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.js';
      this.status = 'injecting MaplibreGL script'
      script.onload = async () => {
        this.status = 'MaplibreGL script loaded'
        try {
          // Add the map
          const map = new maplibregl.Map({
            container: this.shadowRoot.querySelector('#map'),
            style: {
              version: 8,
              center: [0, 0],
              zoom: 0,
              pitch: 0,
              sources: {},
              layers: []
            }
          });
          map.on('load', () => {
            this._map = map;
            map.on('mousemove', (e) => {
              this.dispatchEvent(new CustomEvent('map-mousemove', 
              { 
                detail: {
                  originalEvent: e.originalEvent,
                  offsetX: e.point.x,
                  offsetY: e.point.y,
                  lat: e.lngLat.lat,
                  lng: e.lngLat.lng
                }
              }
            ))});
            this._mapReady()
          });
        } catch (error) {
          this.status = error.message;
        }
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('web-maplibre-gl: ' + error.message)
      this.status = error.message;
    }
  }
  _addLayer(layer) {
    if (!this._map) {
      console.error('web-maplibre-gl: map not ready for addLayer')
      return;
    }
    if (!layer.source) {
      console.warn(`Layer ${layer.id} has no source`);
      return;
    }
    this._map.addLayer(layer);
  }
}

customElements.define('web-maplibre-gl', WebMapLibreGL);