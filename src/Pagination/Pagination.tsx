import React from 'react';

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  setPage: (p: number) => void;
}

export default function Pagination({ total, limit, currentPage, setPage }: PaginationProps) {
  const pages = Math.ceil(total / limit);

  return (
    <div style={{ marginTop: '10px' }}>
      <button disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>
        Prev
      </button>
      <span style={{ margin: '0 10px' }}>
        {currentPage} / {pages}
      </span>
      <button disabled={currentPage >= pages} onClick={() => setPage(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}
