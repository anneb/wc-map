import { html } from 'lit';

import { WebMap } from './web-map.js';

class WebMapboxGL extends WebMap {

  render() {
    return html`
      <style>
        ${WebMapboxGL.externalStyles}
      </style>
      <div id="map"></div>
    `;
  }

  static externalStyles = '';

  async connectedCallback() {
    super.connectedCallback();
    this.status = 'web-mapbox-gl connected to the DOM'
    try {
      // Fetch and apply the external CSS
      if (!WebMapboxGL.externalStyles) {
        this.status = 'web-mapbox-gl fetching external CSS'
        // fetch mapbox-gl.css from unpkg.com
        const response = await fetch('https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css');
        WebMapboxGL.externalStyles = await response.text();
        this.status = 'web-mapbox-gl external CSS fetched'
        this.requestUpdate();
      }

      // Inject the mapbox script
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js';
      this.status = 'injecting MapboxGL script'
      script.onload = async () => {
        this.status = 'MapboxGL script loaded'
        try {
          // Add the map
          //const map = new window.L.Map(this.shadowRoot.getElementById('map')).setView([52.3522, 5.1], 5);
          const map = new mapboxgl.Map({
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
          // set the mapbox access token
          mapboxgl.accessToken = WebMapboxGL.keys.mapbox;
          map.on('load', () => {
            map.on('idle', () => {
              this.dispatchEvent(new CustomEvent('map-ready'));
              console.log('web-mapbox-gl map-ready event dispatched')
              this.status = 'web-mapbox-gl ready';
            });
            map.addLayer({
              id: 'world',
              type: 'fill',
              source: {
                type: 'geojson',
                data: './world.geo.json',
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
      this.status = error.message;
    }
  }
}

customElements.define('web-mapbox-gl', WebMapboxGL);