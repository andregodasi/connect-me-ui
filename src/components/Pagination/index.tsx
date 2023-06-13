import { Button } from '../Button';

interface PaginationProps {
  page: number;
  take: number;
  itemCount: number;
  pageCount?: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  handlePrevious: (previousPage: number) => void;
  handleNext: (nextPage: number) => void;
}

export function Pagination({
  page,
  take,
  itemCount,
  hasPreviousPage,
  hasNextPage,
  handlePrevious,
  handleNext,
}: PaginationProps) {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          <span className="font-medium">{(page - 1) * page + 1}</span> a{' '}
          <span className="font-medium">{page * take}</span> de{' '}
          <span className="font-medium">{itemCount}</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between gap-4 sm:justify-end">
        <Button
          disabled={!hasPreviousPage}
          type="button"
          variant="solid"
          color="blue"
          onClick={() => {
            handlePrevious(page - 1);
          }}
        >
          Anterior
        </Button>
        <Button
          disabled={!hasNextPage}
          type="button"
          variant="solid"
          color="blue"
          onClick={() => handleNext(page + 1)}
        >
          Próximo
        </Button>
      </div>
    </nav>
  );
}
