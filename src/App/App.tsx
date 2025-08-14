import React, { useState, useEffect } from 'react';
import { fetchData, DataItem, DATA_SOURCES } from '../api/api';
import Pagination from '../Pagination/Pagination';
import '../my-card/my-card';

import { MyCardProps } from '../my-card.types';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'my-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        MyCardProps;
    }
  }
}

const PAGE_LIMIT = 5;

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [source, setSource] = useState<keyof typeof DATA_SOURCES>('quotes');
  const [data, setData] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const total = data.length;

  useEffect(() => {
    document.documentElement.setAttribute('main-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchData(source);
        setData(result);
        setCurrentPage(1);
      } catch {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [source]);

  const displayedData = data.slice((currentPage - 1) * PAGE_LIMIT, currentPage * PAGE_LIMIT);

  return (
    <div className="app-container">
      <div className="controls">
        <label>
          Источник данных:
          <select
            value={source}
            onChange={(e) => setSource(e.target.value as keyof typeof DATA_SOURCES)}
          >
            {Object.keys(DATA_SOURCES).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: '20px' }}>
          Тема:
          <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      {loading && <div>Загрузка данных...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {!loading && !error && (
        <>
          <div className="cards-wrapper">
            {displayedData.map((item, idx) => (
              <my-card key={idx} title={item.title} type={item.type}></my-card>
            ))}
          </div>

          <div className="total-count">Всего элементов: {total}</div>

          <Pagination
            total={total}
            limit={PAGE_LIMIT}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
