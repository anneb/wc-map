import { html } from 'lit';
import { WebMap } from './web-map.js';
import { fetchText, fetchLayer } from '../../utils/fetchdata.js';

class WebMapLeaflet extends WebMap {

  constructor() {
    super();
    this.map = null;
    this.status = 'web-map-leaflet constructor';
  }
  render() {
    return html`
      <style>
        ${WebMapLeaflet.externalStyles}
      </style>
      <div id="map"></div>
    `;
  }
  static externalStyles = '';

  async connectedCallback() {
    super.connectedCallback();
    this.status = 'web-map-leaflet connected to the DOM'
    try {
      // Fetch and apply the external CSS when loaded
      if (!WebMapLeaflet.externalStyles) {
        this.status = 'web-map-leaflet fetching external CSS'
        fetchText('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css').then((text) => {
          WebMapLeaflet.externalStyles = text;
          this.status = 'web-map-leaflet external CSS fetched'
          this.requestUpdate();
        });        
      }
      // Inject the Leaflet script
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      this.status = 'injecting Leaflet script'
      script.onload = async () => {
        this.status = 'Leaflet script loaded'
        try {
          // Add the map
          this.map = new window.L.Map(this.shadowRoot.getElementById('map')).setView([52.3522, 5.1], 5);
          console.log('web-map-leaflet map-ready event dispatched')
          this.status = 'web-map-leaflet ready';
          this.mapReady();
        } catch (error) {
          this.status = error.message;
        }
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('web-map-leaflet: ' + error.message)
      this.status = error.message;
    }
  }
  nativeAddLayer(layer) {
    if (!this.map) {
      console.error('web-map-leaflet: map not ready for addLayer')
      return;
    }
    // add layer to leaflet map
    switch (layer?.source?.type) {
      case 'geojson':
        window.L.geoJSON(layer.source.data).addTo(this.map);
        break;
    }
  }
  nativeUpdateView() {
    this.map?.setView([this.lat, this.lon], this.zoom);
  }
  nativeActivateEventListener(event) {
    console.log ('web-map-leaflet: registerNativeEvent for ' + event)
    if (this.map) {
      switch (event) {
        case 'map-mousemove':
          this.map.on('mousemove', (e) => {
            this.dispatchEvent(new CustomEvent('map-mousemove', { detail: {
                originalEvent: e.originalEvent,
                offsetX: e.containerPoint.x,
                offsetY: e.containerPoint.y,
                lat: e.latlng.lat,
                lng: e.latlng.lng
              }}
            ));
          });
          break;
      }
    } else {
      console.error ('web-map-leaflet: map not ready for ' + event)
    }
  }
}

customElements.define('web-map-leaflet', WebMapLeaflet);