import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('displays current page and total pages', () => {
    render(<Pagination total={20} limit={5} currentPage={2} setPage={vi.fn()} />);
    expect(screen.getByText('2 / 4')).toBeTruthy();
  });

  it('disables Prev on first page and Next on last page', () => {
    const { rerender } = render(
      <Pagination total={20} limit={5} currentPage={1} setPage={vi.fn()} />,
    );
    expect(screen.getByText('Prev').hasAttribute('disabled')).toBe(true);
    expect(screen.getByText('Next').hasAttribute('disabled')).toBe(false);

    rerender(<Pagination total={20} limit={5} currentPage={4} setPage={vi.fn()} />);
    expect(screen.getByText('Prev').hasAttribute('disabled')).toBe(false);
    expect(screen.getByText('Next').hasAttribute('disabled')).toBe(true);
  });

  it('calls setPage with correct value on button clicks', () => {
    const setPage = vi.fn();
    render(<Pagination total={20} limit={5} currentPage={2} setPage={setPage} />);

    fireEvent.click(screen.getByText('Prev'));
    expect(setPage).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Next'));
    expect(setPage).toHaveBeenCalledWith(3);
  });
});
