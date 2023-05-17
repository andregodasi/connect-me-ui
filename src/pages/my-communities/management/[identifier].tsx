import { GetServerSideProps } from 'next';
import { Fragment, useState } from 'react';
import { Disclosure, Listbox, Menu, Transition } from '@headlessui/react';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PencilIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import { Tab } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import MainContainer from '@/containers/MainContainer';
import { useQuery } from 'react-query';
import { findByIdentifierGroup } from '@/services/group';
import { EventsList } from '@/components/EventsList';
import Link from 'next/link';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { formatWeekYear } from '@/shared/utils/transforms/dates';

const tabs = [
  { name: 'Applied', href: '#', count: '2', current: false },
  { name: 'Phone Screening', href: '#', count: '4', current: false },
  { name: 'Interview', href: '#', count: '6', current: true },
  { name: 'Offer', href: '#', current: false },
  { name: 'Disqualified', href: '#', current: false },
];

const publishingOptions = [
  {
    name: 'Published',
    description: 'This job posting can be viewed by anyone who has the link.',
    current: true,
  },
  {
    name: 'Draft',
    description: 'This job posting will no longer be publicly accessible.',
    current: false,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface ManagementGroupProps {
  identifier: string;
}

export default function ManagementGroup({ identifier }: ManagementGroupProps) {
  const [selected, setSelected] = useState(publishingOptions[0]);

  const {
    isLoading,
    error,
    data: group,
    isFetching,
  } = useQuery(
    [`my-communities-management${identifier}`],
    () => findByIdentifierGroup(identifier),
    {
      enabled: !!identifier,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <MainContainer classNameMain="pt-0 pb-10">
      <div className="min-h-full">
        {/* Page heading */}
        <header className="bg-gray-50 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="min-w-0 flex-1">
              <nav className="flex" aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="flex flex-wrap items-center space-x-4"
                >
                  <li>
                    <div>
                      <a
                        href="/"
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Home
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <a
                        href="/my-communities"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Comunidades
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <a
                        href="#"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Gerenciamento
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {group?.name}
              </h1>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Link da comunidade"
                  aria-label="Link da comunidade"
                >
                  <LinkIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {group?.slug}
                </div>
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Eventos onlines"
                  aria-label="Eventos onlines"
                >
                  <MapPinIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  Online
                </div>
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Quantidade de seguidores"
                  aria-label="Quantidade de seguidores"
                >
                  <UserGroupIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  104
                </div>
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Data da criação da comunidade"
                  aria-label="Data da criação da comunidade"
                >
                  <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {formatWeekYear(group?.createdAt)}
                </div>
              </div>
            </div>
            <div className="mt-5 flex xl:mt-0 xl:ml-4">
              <span className="hidden sm:block">
                <a
                  href={`/my-communities/${identifier}`}
                  type="button"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Edit
                </a>
              </span>

              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <LinkIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  View
                </button>
              </span>

              <Listbox
                as="div"
                value={selected}
                onChange={setSelected}
                className="sm:ml-3"
              >
                {({ open }) => (
                  <>
                    <Listbox.Label className="sr-only rounded-full">
                      Change published status
                    </Listbox.Label>
                    <div className="relative">
                      <div className="inline-flex divide-x divide-blue-600 rounded-full shadow-sm">
                        <div className="inline-flex divide-x divide-blue-600 rounded-md shadow-sm">
                          <div className="inline-flex items-center rounded-l-full border border-transparent bg-blue-500 py-2 pl-3 pr-4 text-white shadow-sm">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            <p className="ml-2.5 text-sm font-medium">
                              {selected.name}
                            </p>
                          </div>
                          <Listbox.Button className="inline-flex items-center rounded-r-full bg-blue-500 p-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                            <span className="sr-only">
                              Change published status
                            </span>
                            <ChevronDownIcon
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </Listbox.Button>
                        </div>
                      </div>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute left-0 z-10 mt-2 -mr-1 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                          {publishingOptions.map((option) => (
                            <Listbox.Option
                              key={option.name}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-900',
                                  'cursor-default select-none p-4 text-sm'
                                )
                              }
                              value={option}
                            >
                              {({ selected, active }) => (
                                <div className="flex flex-col">
                                  <div className="flex justify-between">
                                    <p
                                      className={
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal'
                                      }
                                    >
                                      {option.name}
                                    </p>
                                    {selected ? (
                                      <span
                                        className={
                                          active
                                            ? 'text-white'
                                            : 'text-blue-500'
                                        }
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </div>
                                  <p
                                    className={classNames(
                                      active
                                        ? 'text-blue-200'
                                        : 'text-gray-500',
                                      'mt-2'
                                    )}
                                  >
                                    {option.description}
                                  </p>
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>

              {/* Dropdown */}
              <Menu as="div" className="relative ml-3 sm:hidden">
                <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  More
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          View
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </header>

        <main className="pt-8 pb-16">
          <div className="container mx-auto sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-medium text-gray-900">Candidates</h2>
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="mt-4 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  defaultValue={tabs.find((tab) => tab?.current)?.name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <Tab.Group as="div">
                <div className="flex items-center justify-between border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                        )
                      }
                    >
                      Eventos
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                        )
                      }
                    >
                      Participantes
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                        )
                      }
                    >
                      Mensagens
                    </Tab>
                  </Tab.List>
                  <Link href={`/my-communities/${identifier}/my-events/create`}>
                    <Button
                      aria-label="Criar evento"
                      className="items-center"
                      style={{ display: 'flex' }}
                      icon={<PlusOutlined />}
                      size="large"
                      shape="round"
                      type="primary"
                      title="Criar evento"
                    >
                      <span className="flex items-center gap-2">
                        <span className="hidden md:flex">Criar evento</span>
                      </span>
                    </Button>
                  </Link>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="mb-10">
                    <EventsList groupUUID={identifier} />
                  </Tab.Panel>
                  <Tab.Panel className="mb-10">no content</Tab.Panel>
                  <Tab.Panel className="mb-10">mensagem</Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </main>
      </div>
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const identifier = ctx.params?.identifier || '';
  return {
    props: { identifier },
  };
};
