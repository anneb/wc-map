import {LitElement, html, css} from 'lit';
import maplibregl = require('maplibre-gl');
import { mapLibreCss } from './map-libre.css';


export class MapLibre extends LitElement {
  zoom: number;
  centerLat: number;
  centerLong: number;
  pitch: number;
  bearing: number;
  map: maplibregl.Map;

  static get properties() {
    return {
      zoom: {type: Number},
      centerLat: {type: Number},
      centerLong: {type: Number},
      pitch: {type: Number},
      bearing: {type: Number}
    }
  }
  static styles = css`
    :host {
      display: inline-block;
      min-width: 30px;
      min-height: 30px;
    }
    ${mapLibreCss}
    #map {
      width: 100%;
      height: 100%;
    }
    `;

  // Declare reactive properties
  constructor() {
      super();
      this.zoom = 0;
      this.centerLat = 0;
      this.centerLong = 0;
      this.pitch = 0;
      this.bearing = 0;
      this.map = null;
  }
  // Render the UI as a function of component state
  render() {
    return html`<div id="map"></div><slot></slot>`;
  }
  firstUpdated() {
    if (this.map) {
      this.map.remove();
    }
    this.map = new maplibregl.Map({
        container: this.shadowRoot.querySelector('#map') as HTMLElement,
        center: [this.centerLong,this.centerLat],
        zoom: this.zoom,
        pitch: this.pitch,
        bearing: this.bearing
    });
    this.addEventListener('addlayer', (e)=>this._addLayer(e));
  }
  _addLayer(event) {
    const SourceTypeToMLType = {
      "tms": "raster"
    }    
    const {id,type,source} = event.detail;
    const mlSourceType = SourceTypeToMLType[source.type];
    const {url,attribution,minzoom,maxzoom,bounds,tileSize} = source;

    const mlSource:maplibregl.RasterSource = {
      type: mlSourceType,
      tiles: url
    }
    source.attribution ? mlSource.attribution = source.attribution: null;
    source.tileSize ? mlSource.tileSize = source.tileSize: null;
    const mapLibreLayer:maplibregl.AnyLayer = {
      id: id,
      type: type,
      source: mlSource
    }
    this.map.addLayer(mapLibreLayer);
  }
}

customElements.define('map-libre', MapLibre);