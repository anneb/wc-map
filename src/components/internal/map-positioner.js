import { LitElement, html, css } from 'lit-element';

export class MapPositioner extends LitElement {
  static styles = css`
  :host {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
  }
  .outercontainer {
    position: relative;
    height: 100%;
    pointer-events: none;
    background: transparent;
    border: 1px solid black;
  }
  .top, .bottom, .left, .right {
    position: absolute;
    pointer-events: auto;
    cursor: pointer;
  }
  .top {
    top: 0;
  }
  .bottom {
    bottom: 0;
  }
  .left {
    left: 0;
    background-color: lightblue;
  }
  .center {
    left: 50%;
    transform: translateX(-50%);
  }
  .right {
    right: 0;
    background-color: lightcoral;
  }`;

  render() {
    return html`
      <div class="outercontainer">
        <div class="top left">
          <slot name="top-left"></slot>
        </div>
        <div class="top center">
          <slot name="top-center"></slot>
        </div>
        <div class="top right">
          <slot name="top-right"></slot>
        </div>
        <div class="bottom left">
          <slot name="bottom-left"></slot>
        </div>
        <div class="bottom center">
          <slot name="bottom-center"></slot>
        </div>
        <div class="bottom right">
          <slot name="bottom-right"></slot>
        </div>
      </div>
    `;
  }
}
customElements.define('map-positioner', MapPositioner);