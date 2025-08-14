import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as api from '../api/api';

const mockQuotes: api.DataItem[] = [
  { title: 'Цитата 1', type: 'quote' },
  { title: 'Цитата 2', type: 'quote' },
];

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(api, 'fetchData').mockImplementation(async () => mockQuotes);
  });

  it('shows loading and then cards', async () => {
    render(<App />);

    expect(screen.getByText(/Загрузка данных/i)).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByText(/Загрузка данных/i)).toBeNull();
      expect(screen.getByText(/Всего элементов: 2/i)).toBeTruthy();
    });
  });

  it('switches theme', async () => {
    render(<App />);

    const html = document.documentElement;

    expect(html.getAttribute('main-theme')).toBe('light');

    const select = screen.getByLabelText(/Тема/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'dark' } });

    await waitFor(() => {
      expect(html.getAttribute('main-theme')).toBe('dark');
    });
  });

  it('changes data source', async () => {
    render(<App />);
    await waitFor(() => screen.getByText(/Всего элементов/i));

    const select = screen.getByLabelText(/Источник данных/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'todos' } });

    await waitFor(() => {
      expect(screen.getByText(/Всего элементов: 2/i)).toBeTruthy();
    });
  });
});
