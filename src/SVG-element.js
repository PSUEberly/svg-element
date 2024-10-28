import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

// Array of goal data containing goal names and colors
const goalData = [
  { name: 'No Poverty', color: '#e5243b' },
  { name: 'Zero Hunger', color: '#dda63a' },
  { name: 'Good Health and Well-being', color: '#4c9f38' },
  { name: 'Quality Education', color: '#c5192d' },
  { name: 'Gender Equality', color: '#ff3a21' },
  { name: 'Clean Water and Sanitation', color: '#26bde2' },
  { name: 'Affordable and Clean Energy', color: '#fcc30b' },
  { name: 'Decent Work and Economic Growth', color: '#a21942' },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925' },
  { name: 'Reduced Inequalities', color: '#dd1367' },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24' },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e' },
  { name: 'Climate Action', color: '#3f7e44' },
  { name: 'Life Below Water', color: '#0a97d9' },
  { name: 'Life on Land', color: '#56c02b' },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d' },
  { name: 'Partnerships for the Goals', color: '#19486a' },
];

export class SVGElement extends DDDSuper(LitElement) {

  static get tag() {
    return "SVG-element";
  }


  constructor() {
    super();
    this.goal = "circle"; // Default goal
    this._currentSrc = new URL(`./lib/svgs/goal-circle.svg`, import.meta.url).href;
    this.color = '#FFFFFF';
    this.colorOnly = false;
    this.fetchPriority = 'low';
    this.alt = ''; // Alt text
  }

  static get properties() {
    return {
      goal: { type: String, reflect: true },
      colorOnly: { type: Boolean, reflect: true },
      fetchPriority: { type: String, reflect: true },
      _currentSrc: { type: String },
      alt: { type: String }
    };
  }

  static get styles() {
    return [super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
          font-size: var(--SVG-element-font-size, var(--ddd-font-size-s));
        }
        .color-only {
          width: 100px;
          height: 100px;
        }
      `
    ];
  }
  // Checks if 'goal' property has changed to update the image
  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage();
    }
  }

  // Update the image source and alt text based on the 'goal' property
  updateGoalImage() {
    // special cases for 'all' and 'circle'
    if (this.goal === 'all' || this.goal === 'circle') {
      this._currentSrc = new URL(`./lib/svgs/goal-${this.goal}.svg`, import.meta.url).href;
      this.alt = this.goal === 'all' 
        ? 'All Sustainable Development Goals' 
        : 'Sustainable Development Goals Circle';
    } else {
      // numeric goals 1-17
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        this._currentSrc = new URL(`./lib/svgs/goal-${goalNumber}.svg`, import.meta.url).href;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`;
      }
    }
    console.log("Image source:", this._currentSrc);
  }

  // Render the HTML template for the component
  // render a colored div or an image based on 'colorOnly' property
  render() {
    // If colorOnly is true, display a colored div based on goal's color
    if (this.colorOnly) {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        const color = goalData[goalNumber - 1].color;
        return html`<div class="color-only" style="background-color: ${color};"></div>`;
      }
    }

    // Otherwise, display the goal image
    return html`
      <img
        src="${this._currentSrc}"
        alt="${this.alt}"
        fetchpriority="${this.fetchPriority}"
      />
    `;
  }
}

globalThis.customElements.define(SVGElement.tag, SVGElement);
