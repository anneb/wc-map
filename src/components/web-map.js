import { LitElement, html, css } from 'lit';
import { APIkeys } from '../keys.js';

const NEWEVENT = 1;
const REGISTEREDEVENT = 2;

export class WebMap extends LitElement {
  static keys = APIkeys;
  static get styles() {
    return css`
      :host {
        display: block;
        width: 400px;
        height: 400px;
      }
      #map {
        width: 100%;
        height: 100%;
      }
    `;
  }
  constructor() {
    super();
    this.map = null;
    this.eventTypes = {}; // the events to listen for
  }

  render() {
    return html`
      <style>#map { padding: 4px; }</style>
      <div id="map">
        Please use one of the specific web-map components:
        <ol>
          <li>&lt;web-map-leaflet&gt;</li>
          <li>&lt;web-mapbox-gl&gt;</li>
          <li>&lt;web-maplibre-gl&gt;</li>
          <li>&lt;web-map-openlayers&gt;</li>
        </ol>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    // derived classes should set this.map when the map is ready
  }
  addEventListener (event, listener, options) {
    console.log('add event listener for ' + event);
    super.addEventListener(event, listener, options);
    if (!this.eventTypes[event]) {
      this.eventTypes[event] = NEWEVENT;
      this.updateNativeEvents()
    }
  }
  updateNativeEvents () {
    if (this.map) {
      for (const event in this.eventTypes) {
        if (this.eventTypes[event] === NEWEVENT) {
          this.activateNativeEventListener(event);
          this.eventTypes[event] = REGISTEREDEVENT;
        }
      }
    }
  }
  activateNativeEventListener(event) {
    console.warn(`activateNativeEventListener for ${event} not yet implemented for ${this.constructor.name}`);
  }
  mapReady(e) {
    this.updateNativeEvents();
    this.dispatchEvent(new CustomEvent('map-ready'));
  }
}

customElements.define('web-map', WebMap);