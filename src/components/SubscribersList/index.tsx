import React, { useEffect, useState } from 'react';
import {
  CalendarDaysIcon,
  FlagIcon,
  RocketLaunchIcon,
} from '@heroicons/react/20/solid';
import { FullPagination } from '@/components/FullPagination';
import { useQuery } from 'react-query';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { Button } from 'antd';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import { Subscriber } from '@/shared/interfaces/ISubscribers';
import { getPaginatedMySubscribersByMyEvent } from '@/services/user';
import Image from 'next/future/image';

const initPageOptions: PageOptions = { page: 1 };

interface SubscribersListProps {
  eventUUID: string;
}

export const SubscribersList: React.FC<SubscribersListProps> = ({
  eventUUID,
}) => {
  const [subscriberPage, setSubscriberPage] = useState<Subscriber[]>([]);
  const [pageOptions, setPageOptions] = useState<PageOptions>(initPageOptions);
  const { data: dataPage } = useQuery(
    ['SubscribersList', pageOptions],
    () => getPaginatedMySubscribersByMyEvent(pageOptions.page, eventUUID),
    { staleTime: Infinity },
  );

  useEffect(() => {
    if (dataPage?.data) {
      setSubscriberPage([...dataPage.data]);
    }
  }, [dataPage]);

  const handleLoad = (loadPage: number) => {
    setPageOptions({
      ...pageOptions,
      page: loadPage,
    });
  };
  return (
    <div>
      <div className="container mx-auto">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      <div className="flex">
                        <RocketLaunchIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        Inscrito
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex">
                        <CalendarDaysIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        Titulo
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex">
                        <FlagIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        Empresa
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Ver mais</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {subscriberPage?.map(
                    ({
                      uuid,
                      name,
                      title,
                      photoUrl,
                      nickname,
                      companyName,
                      companyRole,
                    }: Subscriber) => (
                      <tr key={uuid}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="w-16 flex-shrink-0">
                              <Image
                                className="aspect-video w-16 rounded object-cover group-hover:opacity-75"
                                src={photoUrl}
                                alt={name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {name}
                              </div>
                              <div className="mt-1 text-gray-500">
                                {nickname}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {title}
                              </div>
                              <div className="mt-1 text-gray-500">
                                {companyRole}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {companyName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Link href={`/profile/${uuid}`}>
                              <Button
                                type="link"
                                icon={<RightOutlined />}
                                style={{ display: 'flex' }}
                                className="flex flex-row-reverse items-center gap-2"
                              >
                                Ver mais
                              </Button>
                            </Link>
                            <span className="sr-only">, {name}</span>
                          </a>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {dataPage && (
        <div className="my-10">
          <FullPagination
            {...dataPage.meta}
            handleGoToPage={(goToPage) => handleLoad(goToPage)}
          />
        </div>
      )}
    </div>
  );
};
