import { html } from 'lit';

import { WebMap } from './web-map.js';
import { fetchText } from '../../utils/fetchdata.js';

class WebMapLibreGL extends WebMap {

  render() {
    return html`
      <style>
        ${WebMapLibreGL.externalStyles}
      </style>
      <div id="map"></div>
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
              center: [5.1, 52.2522],
              zoom: 4.0,
              pitch: 0,
              sources: {},
              layers: []
            }
          });
          map.on('load', () => {
            map.on('idle', () => {
              this.dispatchEvent(new CustomEvent('map-ready'));
              console.log('web-maplibre-gl map-ready event dispatched')
              this.status = 'web-maplibre-gl ready';
            });
            map.addLayer({
              id: 'world',
              type: 'fill',
              source: {
                type: 'geojson',
                data: './data/world.geo.json',
                attribution: '<a href="https://www.naturalearthdata.com/">Natural Earth</a>'
              },
              paint: {
                'fill-color': '#bbcce4',
                'fill-outline-color': '#3388ff'
              }
            })
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
}

customElements.define('web-maplibre-gl', WebMapLibreGL);