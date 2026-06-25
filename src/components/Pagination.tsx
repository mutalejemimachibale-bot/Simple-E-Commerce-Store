import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProductStore } from '../stores/productStore';
import { PRODUCTS_PER_PAGE } from '../types';

export default function Pagination() {
  const { filteredProducts, currentPage, setPage } = useProductStore();

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (showEllipsisStart) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (showEllipsisEnd) {
        pages.push('...');
      }
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-5 w-5 text-text-primary" />
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={`min-w-[40px] h-10 rounded-lg font-semibold transition-all ${
                currentPage === page
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-primary hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={`ellipsis-${index}`} className="px-2 text-text-secondary">
              {page}
            </span>
          )
        ))}
      </div>

      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="h-5 w-5 text-text-primary" />
      </button>
    </div>
  );
}
