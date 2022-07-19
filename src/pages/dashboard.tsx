import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getAPIClient } from '../services/axios';

import MainContainer from '@/containers/MainContainer';
import {
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const tabs = [
  { name: 'Eventos', href: '#', current: true },
  { name: 'Comunidades', href: '#', current: false },
  { name: 'Empresas', href: '#', current: false },
];
const files = [
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: true,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: true,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: true,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: true,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: true,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: true,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
  {
    name: 'Web Summit',
    size: 'Evento de tecnologia',
    source:
      'https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp',
    current: false,
  },
];

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // api.get('/users');
  }, []);

  return (
    <MainContainer>
      <div className="container mx-auto grid grid-cols-3 gap-4 px-2 sm:px-4 lg:px-8">
        <div>
          <form action="#" method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
              <h3 className="flex-1 p-3 pt-8 text-2xl font-bold text-gray-900">
                Quer buscar algo?
              </h3>
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome do Evento / Grupo / Empresa
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Endereço
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Qual assunto
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    >
                      <option>Tecnologia</option>
                      <option>Agile</option>
                      <option>Games</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="... col-span-2">
          <div>
            <div className="flex flex-1 items-stretch overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                  <div className="flex">
                    <h1 className="flex-1 text-2xl font-bold text-gray-900">
                      Veja seus eventos
                    </h1>
                    <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      >
                        <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Use list view</span>
                      </button>
                      <button
                        type="button"
                        className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      >
                        <ViewGridIconSolid
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Use grid view</span>
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="mt-3 sm:mt-2">
                    <div className="sm:hidden">
                      <label htmlFor="tabs" className="sr-only">
                        Select a tab
                      </label>
                      {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                      <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        defaultValue="Recently Viewed"
                      >
                        <option>Eventos</option>
                        <option>Comunidades</option>
                        <option>Empresa</option>
                      </select>
                    </div>
                    <div className="hidden sm:block">
                      <div className="flex items-center border-b border-gray-200">
                        <nav
                          className="-mb-px flex flex-1 space-x-6 xl:space-x-8"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab) => (
                            <a
                              key={tab.name}
                              href={tab.href}
                              aria-current={tab.current ? 'page' : undefined}
                              className={classNames(
                                tab.current
                                  ? 'border-blue-500 text-blue-600'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                              )}
                            >
                              {tab.name}
                            </a>
                          ))}
                        </nav>
                        <div className="ml-6 hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
                          <button
                            type="button"
                            className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                          >
                            <ViewListIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            <span className="sr-only">Use list view</span>
                          </button>
                          <button
                            type="button"
                            className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                          >
                            <ViewGridIconSolid
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            <span className="sr-only">Use grid view</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gallery */}
                  <section
                    className="mt-8 pb-16"
                    aria-labelledby="gallery-heading"
                  >
                    <h2 id="gallery-heading" className="sr-only">
                      Recently viewed
                    </h2>
                    <ul
                      role="list"
                      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                    >
                      {files.map((file) => (
                        <li key={file.name} className="relative">
                          <div
                            className={classNames(
                              file.current
                                ? 'ring-2 ring-blue-500 ring-offset-2'
                                : 'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                              'aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100'
                            )}
                          >
                            <img
                              src={file.source}
                              alt=""
                              className={classNames(
                                file.current ? '' : 'group-hover:opacity-75',
                                'pointer-events-none object-cover'
                              )}
                            />
                            <button
                              type="button"
                              className="absolute inset-0 focus:outline-none"
                            >
                              <span className="sr-only">
                                View details for {file.name}
                              </span>
                            </button>
                          </div>
                          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="pointer-events-none block text-sm font-medium text-gray-500">
                            {file.size}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['connect.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  await apiClient.get('/me');

  return {
    props: {},
  };
};
