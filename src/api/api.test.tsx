import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchData, DataItem } from './api';

describe('fetchData', () => {
  const mockQuotesResponse = {
    quotes: [{ quote: 'Цитата 1' }, { quote: 'Цитата 2' }],
  };
  const mockTodosResponse = {
    todos: [{ todo: 'Задача 1' }, { todo: 'Задача 2' }],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns mapped quotes', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockQuotesResponse,
    } as Partial<Response> as Response);

    const result: DataItem[] = await fetchData('quotes');
    expect(result).toEqual([
      { title: 'Цитата 1', type: 'quote' },
      { title: 'Цитата 2', type: 'quote' },
    ]);
  });

  it('returns mapped todos', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockTodosResponse,
    } as Partial<Response> as Response);

    const result: DataItem[] = await fetchData('todos');
    expect(result).toEqual([
      { title: 'Задача 1', type: 'todo' },
      { title: 'Задача 2', type: 'todo' },
    ]);
  });

  it('returns empty array on fetch error', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Partial<Response> as Response);

    const result = await fetchData('quotes');
    expect(result).toEqual([]);
  });
});
