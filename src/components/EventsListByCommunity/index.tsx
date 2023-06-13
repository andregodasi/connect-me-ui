import React, { useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  PencilIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  FlagIcon,
  RocketLaunchIcon,
} from '@heroicons/react/20/solid';
import { FullPagination } from '@/components/FullPagination';
import { useQuery } from 'react-query';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { getPaginatedMyEventsByGroup } from '@/services/event';
import { Event } from '@/shared/interfaces/IEvent';
import { formatWeekDateTime } from '@/shared/utils/transforms/dates';
import { Button } from 'antd';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import Image from 'next/future/image';

const initPageOptions: PageOptions = { page: 1 };

interface EventsListProps {
  groupUUID: string;
}

export const EventsListByGroup: React.FC<EventsListProps> = ({ groupUUID }) => {
  const [eventPage, setEventPage] = useState<Event[]>([]);
  const [pageOptions, setPageOptions] = useState<PageOptions>(initPageOptions);
  const { data: dataPage } = useQuery(
    ['EventsListByGroup', pageOptions],
    () => getPaginatedMyEventsByGroup(pageOptions.page, groupUUID),
    { staleTime: Infinity },
  );

  useEffect(() => {
    if (dataPage?.data) {
      setEventPage([...dataPage.data]);
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
                        Evento
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
                        Data
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
                        Status
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      title="Capacidade de público"
                    >
                      <div className="flex">
                        <UserGroupIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />{' '}
                        Cap. público
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Gerenciar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {eventPage?.map(
                    ({
                      uuid,
                      name,
                      description,
                      coverUrl,
                      isPublised,
                      initialDate,
                      finishDate,
                      limitParticipants,
                    }: Event) => (
                      <tr key={uuid}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="w-16 flex-shrink-0">
                              <Image
                                className="aspect-video w-16 rounded object-cover group-hover:opacity-75"
                                src={coverUrl}
                                alt={name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {name}
                              </div>
                              <div className="ellipis-4 mt-1 min-w-[10rem] text-gray-500">
                                {description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <p className="mt-2 flex flex-col text-sm text-gray-500">
                            <div>
                              Inicio:{' '}
                              <time dateTime={formatWeekDateTime(initialDate)}>
                                {formatWeekDateTime(initialDate)}
                              </time>
                            </div>
                            <div>
                              Fim:{' '}
                              <time dateTime={formatWeekDateTime(finishDate)}>
                                {formatWeekDateTime(finishDate)}
                              </time>
                            </div>
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {isPublised ? (
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              <CheckCircleIcon
                                className="mr-1 h-3 w-3 flex-shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                              Publicado
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                              <PencilIcon
                                className="mr-1 h-3 w-3 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              Em rascunho
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {limitParticipants}
                        </td>
                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Link
                              href={`/my-communities/${groupUUID}/my-events/management/${uuid}`}
                            >
                              <Button
                                type="link"
                                icon={<RightOutlined />}
                                style={{ display: 'flex' }}
                                className="flex flex-row-reverse items-center gap-2"
                              >
                                Gerenciar
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
