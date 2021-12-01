import {LitElement, html, css} from 'lit';

export class MapZoom extends LitElement {
  zoom: number;

  static get styles() {
    return css`:host {
      display: inline-block}
      #zoomlevelbox {
        padding: 2px;        
      }
      #zoomlevelbox input {
        position: relative;
        width: 50px;
        border: 0;
      }
      #zoomlevelbox input:hover{
        border-bottom: 1px solid DeepSkyBlue;
      }`
  }

  static get properties() {
    return {
      zoom: {type: Number},
    }
  }
  // Declare reactive properties
  constructor() {
      super();
      this.zoom = 0;
  }
  // Render the UI as a function of component state
  render() {
    return html`<div id="zoomlevelbox"><label for="zoominput">Zoom:</label><input id="zoominput" type="text" value=${this.zoom}></input></div>`;
  }
  firstUpdated()
  {
    this.dispatchEvent(new CustomEvent('registerzoomchange',{
      detail: (zoom)=>this._updateZoom(zoom),
      bubbles: true,
      composed: true
    }));
  }
  private _updateZoom(zoom) {
    this.zoom = zoom;
  }
}

customElements.define('map-zoom', MapZoom);