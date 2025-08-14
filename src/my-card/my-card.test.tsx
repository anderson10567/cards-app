
import { describe, it, expect } from 'vitest';
import { LitElement } from 'lit';
import '../my-card/my-card'; 

describe('MyCard', () => {
  it('renders quote correctly', async () => {
    
    const card = document.createElement('my-card') as LitElement & {
      updateComplete: Promise<void>;
    };
    card.setAttribute('title', 'Цитата 1');
    card.setAttribute('type', 'quote');
    document.body.appendChild(card);

    await customElements.whenDefined('my-card');
    await card.updateComplete;

    const h3 = card.shadowRoot?.querySelector('h3');
    const p = card.shadowRoot?.querySelector('p');
    const div = card.shadowRoot?.querySelector('.card');

    expect(h3?.textContent).toBe('Цитата 1');
    expect(p?.textContent).toBe('Цитата');
    expect(div?.classList.contains('quote')).toBe(true);
  });

  it('renders todo correctly', async () => {
    const card = document.createElement('my-card') as LitElement & {
      updateComplete: Promise<void>;
    };
    card.setAttribute('title', 'Задача 1');
    card.setAttribute('type', 'todo');
    document.body.appendChild(card);

    await customElements.whenDefined('my-card');
    await card.updateComplete;

    const h3 = card.shadowRoot?.querySelector('h3');
    const p = card.shadowRoot?.querySelector('p');
    const div = card.shadowRoot?.querySelector('.card');

    expect(h3?.textContent).toBe('Задача 1');
    expect(p?.textContent).toBe('Задача');
    expect(div?.classList.contains('todo')).toBe(true);
  });
});
