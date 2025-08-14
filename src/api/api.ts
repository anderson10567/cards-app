export const DATA_SOURCES = {
  quotes: 'https://dummyjson.com/quotes?limit=20&skip=10',
  todos: 'https://dummyjson.com/todos?limit=20&skip=10',
} as const;

export type DataSourceKey = keyof typeof DATA_SOURCES;

export interface DataItem {
  title: string;
  type: 'quote' | 'todo';
}

interface QuoteItem {
  id: number;
  quote: string;
  author: string;
}

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface QuotesResponse {
  quotes: QuoteItem[];
  total: number;
  skip: number;
  limit: number;
}

interface TodosResponse {
  todos: TodoItem[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchData(source: DataSourceKey): Promise<DataItem[]> {
  try {
    const response = await fetch(DATA_SOURCES[source]);
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    const data = (await response.json()) as QuotesResponse | TodosResponse;

    if (source === 'quotes') {
      const quotesData = data as QuotesResponse;
      return quotesData.quotes.map((q) => ({ title: q.quote, type: 'quote' }));
    }

    if (source === 'todos') {
      const todosData = data as TodosResponse;
      return todosData.todos.map((t) => ({ title: t.todo, type: 'todo' }));
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
}
