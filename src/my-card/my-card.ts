import { LitElement, html, css } from 'lit';

export class MyCard extends LitElement {
  static styles = css`
    .card {
      padding: 15px;
      border-radius: 8px;
      margin: 8px;
      width: 300px;
      height: 100%;
      flex: none;

      box-sizing: border-box;
      color: var(--text, #000);
      background-color: var(--card-bg, #fff);
      border: 1px solid #ccc;

      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.14);
      transition:
        transform 0.2s,
        box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .quote {
      --card-bg: var(--card-bg-quote, #1cbf16ff);
    }
    .todo {
      --card-bg: var(--card-bg-todo, #fff8dc);
    }
    h3 {
      margin-top: 0;
      margin-bottom: 8px;
      font-size: 1.1rem;
    }
  `;

  static properties = {
    title: { type: String },
    type: { type: String },
  };
  type: unknown;

  render() {
    return html`
      <div class="card ${this.type}">
        <h3>${this.title}</h3>
        <p>${this.type === 'quote' ? 'Цитата' : 'Задача'}</p>
      </div>
    `;
  }
}

customElements.define('my-card', MyCard);
