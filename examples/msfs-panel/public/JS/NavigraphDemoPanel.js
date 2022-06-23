class NavigraphDemoPanel extends UIElement {
  constructor() {
    super(...arguments);

    this.panel_id = "NAVIGRAPH_DEMO_PANEL";
    this.isInitialized = false;
    this.ingameUi = null;
  }

  connectedCallback() {
    super.connectedCallback();

    this.ingameUi = this.querySelector("ingame-ui");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

window.customElements.define("navigraph-demo-panel", NavigraphDemoPanel);

checkAutoload();
