import {LitElement, html, css} from 'lit';
import maplibregl = require('maplibre-gl');
import { mapLibreCss } from './map-libre.css';
import {markdownToHtml} from '../utils/markdown'


export class MapLibre extends LitElement {
  zoom: number;
  centerLat: number;
  centerLong: number;
  pitch: number;
  bearing: number;
  staticmap: boolean;
  map: maplibregl.Map;

  static get properties() {
    return {
      zoom: {type: Number},
      centerLat: {type: Number},
      centerLong: {type: Number},
      pitch: {type: Number},
      bearing: {type: Number},
      staticmap: {type: Boolean}
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
      this.staticmap = false;
  }
  // Render the UI as a function of component state
  public override render() {
    return html`<div id="map"></div><slot></slot>`;
  }
  public override firstUpdated() {
    if (this.map) {
      this.map.remove();
    }
    this.map = new maplibregl.Map({
        container: this.shadowRoot.querySelector('#map') as HTMLElement,
        center: [this.centerLong,this.centerLat],
        zoom: this.zoom,
        pitch: this.pitch,
        bearing: this.bearing,
        interactive: !this.staticmap
    });
    this.addEventListener('addlayer', (e)=>this._addLayer(e));
  }
  public override updated(changedProperties) {
    if (this.map && changedProperties.has('staticmap')) {
      const handlers = ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"];
      for (const handler of handlers) {
        this.staticmap ? this.map[handler].disable() : this.map[handler].enable();
      }
    }
  }
  private _addLayer(event) {
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

    source.attribution ? mlSource.attribution = markdownToHtml(source.attribution): null;
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