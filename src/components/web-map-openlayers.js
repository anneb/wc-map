import { html } from 'lit';
import OLMap from 'ol/Map.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource} from 'ol/source.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import View from 'ol/View.js';
import {fromLonLat} from 'ol/proj.js';

import { WebMap } from './web-map.js';

class WebMapOpenLayers extends WebMap {

  render() {
    return html`
      <style>
        ${WebMapOpenLayers.externalStyles}
      </style>
      <div id="map"></div>
    `;
  }

  static externalStyles = '';

  async connectedCallback() {
    super.connectedCallback();
    this.status = 'web-map-openlayers connected to the DOM'
    try {
      // Fetch and apply the external CSS
      if (!WebMapOpenLayers.externalStyles) {
        this.status = 'web-map-openlayers fetching external CSS'
        const response = await fetch('https://cdn.jsdelivr.net/npm/ol@v8.2.0/ol.css');
        WebMapOpenLayers.externalStyles = await response.text();
        this.status = 'web-map-openlayers external CSS fetched'
        this.requestUpdate();
      }      
      // Add the map
      const worldSource = new VectorSource({
        url: './world.geo.json',
        format: new GeoJSON(),
        attributions: '<a href="https://www.naturalearthdata.com/">Natural Earth</a>'
      })
      const worldLayer = new VectorLayer({
        source: worldSource
      });

      const lonLat = [5.1, 52.3522];
      const webMercator = fromLonLat(lonLat);
      const map = new OLMap({
        target: this.shadowRoot.querySelector('#map'),
        layers: [worldLayer],
        view: new View({
          center: webMercator,
          zoom: 5
        })
      });
      map.once('rendercomplete', () => {
        this.status = 'web-map-openlayers ready';
        this.dispatchEvent(new CustomEvent('map-ready'));
        console.log('web-map-openlayers map-ready event dispatched');
      });
    } catch (error) {
      this.status = error.message;
    }
  }
}

customElements.define('web-map-openlayers', WebMapOpenLayers);