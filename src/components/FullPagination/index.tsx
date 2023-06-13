import { usePagination } from '@/hooks/usePagination';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';

interface PaginationProps {
  page: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  handleGoToPage: (goToPage: number) => void;
}

export function FullPagination({
  page,
  pageCount,
  hasPreviousPage,
  hasNextPage,
  handleGoToPage,
}: PaginationProps) {
  const numbersList = usePagination(pageCount, page);
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
      aria-label="Pagination"
    >
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => handleGoToPage(page - 1)}
          disabled={!hasPreviousPage}
          className={`inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500  ${
            hasPreviousPage
              ? 'hover:border-gray-200 hover:text-gray-700'
              : 'cursor-not-allowed opacity-70'
          }`}
        >
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Anterior
        </button>
      </div>

      <div className="md:hidden">
        <p className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
          <span className="font-medium">{page}</span>
          <span className="font-medium">/</span>
          <span className="font-medium">{pageCount}</span>
        </p>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {numbersList.map((nummberPage, index) => {
          return Number(nummberPage) ? (
            <button
              onClick={() => handleGoToPage(Number(nummberPage))}
              key={`pagination-item-${nummberPage}`}
              type="button"
              className={`${
                page === nummberPage
                  ? 'inline-flex items-center border-t-2 border-blue-500 px-4 pt-4 text-sm font-medium text-blue-600'
                  : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700'
              }`}
            >
              {nummberPage}
            </button>
          ) : (
            <div
              key={`pagination-item-${nummberPage}-${index}`}
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
            >
              {nummberPage}
            </div>
          );
        })}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => handleGoToPage(page + 1)}
          disabled={!hasNextPage}
          type="button"
          className={`inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500  ${
            hasNextPage
              ? 'hover:border-gray-200 hover:text-gray-700'
              : 'cursor-not-allowed opacity-70'
          }`}
        >
          Próximo
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}
