import {LitElement, html, css} from 'lit';
import {MapLayerType} from '../types/map-layer-type'
import {MapLayer} from './map-layer'

export class MapLayerOSM extends MapLayer {
  
  // Declare reactive properties
  constructor() {
      super();
      this.layer = {
          title: "OpenStreetMap",
          id: "openstreetmap",
          type: "raster",
          source: {
              tileSize: 256,
              type: "tms",
              url: ["https://tiles.edugis.nl/mapproxy/osm/tiles/osm_EPSG900913/{z}/{x}/{y}.png?origin=nw"],
              attribution: "[© OpenStreetmap contributors](https://www.openstreetmap.org/about)"
          }
      };
  }
  // Render the UI as a function of component state
  render() {
    return html`<div>${this.layer.title}</div>`;
  }
}

customElements.define('map-layer-osm', MapLayerOSM);