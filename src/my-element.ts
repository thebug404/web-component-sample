import { customElement, property } from 'lit/decorators.js'
import { LitElement, css, html, unsafeCSS } from 'lit'

import styles from './my-element.css?raw'

/**
 * An example element.
 */
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`${unsafeCSS(styles)}`

  @property({ type: Number })
    counter = 0

  private handleClick (): void {
    this.counter++
  }

  protected render (): unknown {
    return html`
      <button class="btn" @click=${this.handleClick}>Counter is: ${this.counter}</button>
    `
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
