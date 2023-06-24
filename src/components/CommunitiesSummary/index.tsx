import { Group } from '@/shared/interfaces/IGroup';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import placeholderImage from '@/images/screen-0.webp';
import { Skeleton } from 'antd';
import { Placeholder } from '../Placeholder';
import naveCow from '@/images/svg/nave_cow.svg';
interface CommunitiesSummaryProps {
  communities: Group[];
  isLoading: boolean;
}

export function CommunitiesSummary({
  isLoading,
  communities,
}: CommunitiesSummaryProps) {
  const isShowEmpty = !isLoading && (!communities || communities.length === 0);
  const isShowList = !isLoading && communities && communities.length > 0;
  return (
    <div className="w-full rounded-lg border bg-white pt-4 shadow-md sm:pt-8">
      <div className="mb-4 flex items-center justify-between px-4 sm:px-8">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          Comunidades seguidas
        </h5>
        {isShowList && (
          <Link
            href="/communities?isFollowing=true"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Veja todas
          </Link>
        )}
      </div>
      <div className="flow-root">
        {isLoading && (
          <ul role="list" className="mb-0">
            <li
              key="summaryEvent"
              className="block px-4 pt-8 pb-4 hover:bg-gray-50 sm:px-8"
            >
              <Skeleton
                active
                paragraph={{ rows: 0 }}
                avatar={{ size: 48, shape: 'square', className: '!rounded-md' }}
              />
            </li>
            <li
              key="summaryEvent"
              className="block px-4 pt-8 pb-4 hover:bg-gray-50 sm:px-8"
            >
              <Skeleton
                active
                paragraph={{ rows: 0 }}
                avatar={{ size: 48, shape: 'square', className: '!rounded-md' }}
              />
            </li>
          </ul>
        )}

        {isShowEmpty && (
          <Placeholder
            image={naveCow}
            alt="Você não esta seguindo nenhuma comunidade."
            width={260}
            height={200}
            descriptionTop="Você não esta seguindo nenhuma comunidade."
            descriptionBottom="Não espere ser abduzido para conhecer novas culturas! Siga uma comunidade!"
          />
        )}

        {isShowList && (
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
                      <Image
                        width={100}
                        height={100}
                        className="h-12 w-12 rounded-md object-cover"
                        src={community.coverUrl || placeholderImage}
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-medium text-gray-900">
                        {community.name}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
