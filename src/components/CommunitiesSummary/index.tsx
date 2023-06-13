import { Group } from '@/shared/interfaces/IGroup';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

interface CommunitiesSummaryProps {
  communities: Group[];
  isLoading: boolean;
}

export function CommunitiesSummary({
  communities,
  isLoading,
}: CommunitiesSummaryProps) {
  return (
    <div className="w-full rounded-lg border bg-white pt-4 shadow-md sm:pt-8">
      <div className="mb-4 flex items-center justify-between px-4 sm:px-8">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          Comunidades seguidas
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Veja todas
        </a>
      </div>
      <div className="flow-root">
        <ul role="list">
          {communities?.map((community) => (
            <li key={community.uuid}>
              <div className="px-4 sm:px-8">
                <hr />
              </div>
              <Link
                href={`/communities/${community.slug}`}
                className="block rounded-lg pt-8 pb-6 hover:bg-gray-50 sm:px-8"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-md object-cover"
                      src="https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp"
                      alt="Neil image"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-medium text-gray-900">
                      {community.name}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
