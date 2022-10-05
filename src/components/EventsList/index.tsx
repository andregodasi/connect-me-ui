import React, { useEffect, useState, Fragment } from 'react';
import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  ArchiveBoxIcon as ArchiveBoxIconMini,
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FolderArrowDownIcon,
  PencilIcon,
  UserPlusIcon,
  PlusSmallIcon,
} from '@heroicons/react/20/solid';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Button } from '@/components/Button';
import { FullPagination } from '@/components/FullPagination';
import { useQuery } from 'react-query';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { getPaginatedMyEvents } from '@/services/event';
import { Event } from '@/shared/interfaces/IEvent';
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const initPageOptions: PageOptions = { page: 1 };

interface EventsListProps {
  groupUUID: string;
}

export const EventsList: React.FC<EventsListProps> = ({ groupUUID }) => {
  const candidates = [
    {
      name: 'Emily Selman',
      email: 'emily.selman@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      applied: 'January 7, 2020',
      appliedDatetime: '2020-07-01T15:34:56',
      status: 'Completed phone screening',
    },
    // More candidates...
  ];
  const [eventPage, setEventPage] = useState<Event[]>([]);
  const [pageOptions, setPageOptions] = useState<PageOptions>(initPageOptions);
  const {
    isLoading,
    error,
    data: dataPage,
    isFetching,
  } = useQuery(
    ['DashboardEvents', pageOptions],
    () => getPaginatedMyEvents(pageOptions.page),
    { staleTime: Infinity }
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
      {/* Top section */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white">
        {/* Toolbar*/}
        <div className="flex h-16 flex-col justify-center">
          <div className="">
            <div className="flex justify-between py-3">
              {/* Left buttons */}
              <div>
                <div className="isolate inline-flex rounded-md shadow-sm sm:space-x-3 sm:shadow-none">
                  <span className="inline-flex sm:shadow-sm">
                    <button
                      type="button"
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    >
                      <ArrowUturnLeftIcon
                        className="mr-2.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Reply</span>
                    </button>
                    <button
                      type="button"
                      className="relative -ml-px hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                    >
                      <PencilIcon
                        className="mr-2.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Note</span>
                    </button>
                    <button
                      type="button"
                      className="relative -ml-px hidden items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                    >
                      <UserPlusIcon
                        className="mr-2.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Assign</span>
                    </button>
                  </span>

                  <span className="hidden space-x-3 lg:flex">
                    <button
                      type="button"
                      className="relative -ml-px hidden items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                    >
                      <ArchiveBoxIconMini
                        className="mr-2.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Archive</span>
                    </button>
                    <button
                      type="button"
                      className="relative -ml-px hidden items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:inline-flex"
                    >
                      <FolderArrowDownIcon
                        className="mr-2.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Move</span>
                    </button>
                  </span>

                  <Menu
                    as="div"
                    className="relative -ml-px block sm:shadow-sm lg:hidden"
                  >
                    <div>
                      <Menu.Button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:rounded-md sm:px-3">
                        <span className="sr-only sm:hidden">More</span>
                        <span className="hidden sm:inline">More</span>
                        <ChevronDownIcon
                          className="h-5 w-5 text-gray-400 sm:ml-2 sm:-mr-1"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm sm:hidden'
                                )}
                              >
                                Note
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm sm:hidden'
                                )}
                              >
                                Assign
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Archive
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Move
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              {/* Right buttons */}
              <nav aria-label="Pagination">
                <Button
                  href={`/my-communities/${groupUUID}/my-events/create`}
                  type="submit"
                  variant="solid"
                  color="blue"
                  aria-label="Criar comunidade"
                >
                  <span className="flex items-center gap-2">
                    <span className="hidden md:flex">Criar evento</span>
                    <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </Button>
                {/*  <span className="isolate inline-flex rounded-md shadow-sm">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </span> */}
              </nav>
            </div>
          </div>
        </div>
        {/* Message header */}
      </div>
      <ul
        role="list"
        className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0"
      >
        {eventPage?.map(({ uuid, name, description }: Event) => (
          <li key={uuid}>
            <a href="#" className="group block">
              <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded group-hover:opacity-75"
                      src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-purple-600">
                        {name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <EnvelopeIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{description}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Applied on{' '}
                          <time dateTime="20/10/2022">20/10/2022</time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          ativo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
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
