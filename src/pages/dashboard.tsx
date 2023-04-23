import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getAPIClient } from '../services/axios';
import { Tab } from '@headlessui/react';
import MainContainer from '@/containers/MainContainer';
import {
  Squares2X2Icon as ViewGridIconSolid,
  Bars4Icon,
} from '@heroicons/react/20/solid';
import EventCard from '@/components/EventCard';
import { useQuery } from 'react-query';
import { Page } from '@/shared/interfaces/IPage';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { getPaginatedEvents } from '@/services/event';
import {
  Event,
  EventFilters,
  EventPageOptionWithFilters,
} from '@/shared/interfaces/IEvent';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';
import { useForm } from 'react-hook-form';
import { Toggle } from '@/components/Toggle';
import { EventsSummary } from '@/components/EventsSummary';
import { CommunitiesSummary } from '@/components/CommunitiesSummary';
import { getPaginatedGroups } from '@/services/group';

interface SerachData {
  name?: string;
  isFollowing?: boolean;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

const initPageOptions: EventPageOptionWithFilters = { page: 1 };

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [filters, setFilters] = useState<EventFilters>();
  const { register, handleSubmit, control } = useForm<SerachData>();
  const [eventList, setEventList] = useState<Event[]>([]);
  const [pageOptions, setPageOptions] =
    useState<EventPageOptionWithFilters>(initPageOptions);
  const {
    isLoading,
    error,
    data: dataPage,
    isFetching,
  } = useQuery(
    ['DashboardEvents', pageOptions],
    () => getPaginatedEvents(pageOptions),
    { staleTime: Infinity }
  );

  const {
    isLoading: isLoadingMyEvents,
    error: errorMyEvents,
    data: myEvents,
  } = useQuery(
    ['DashboardMyEvents'],
    () => getPaginatedEvents({ page: 1, take: 5, isSubscribed: true }),
    {
      staleTime: Infinity,
    }
  );

  const {
    isLoading: isLoadingMyGroups,
    error: errorMyGroups,
    data: myGroups,
  } = useQuery(
    ['DashboardMyGroups'],
    () => getPaginatedGroups({ page: 1, take: 5, isFollowing: true }),
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (dataPage?.data && dataPage?.meta?.page === 1) {
      setEventList([...dataPage.data]);
    } else if (dataPage?.data) {
      setEventList([...eventList, ...dataPage.data]);
    }
  }, [dataPage]);

  const handleLoadMore = () => {
    setPageOptions({
      ...pageOptions,
      page: pageOptions.page ? pageOptions.page + 1 : 1,
    });
  };

  async function searching(data: any) {
    const filtersData = {
      q: data.name,
      isFollowing: data.isFollowing,
    };
    setPageOptions({
      ...pageOptions,
      page: 1,
      ...filtersData,
    });

    setFilters({ ...filtersData });
  }

  return (
    <MainContainer>
      <div className="container mx-auto grid grid-cols-3 gap-4 px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* <form action="#" method="POST">
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
          </form> */}
          <EventsSummary
            events={myEvents?.data}
            isLoading={isLoadingMyEvents}
          />
          <CommunitiesSummary
            communities={myGroups?.data || []}
            isLoading={isLoadingMyGroups}
          />
        </div>
        <div className="col-span-2">
          <div>
            <div className="flex flex-1 items-stretch overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                  <div className="flex flex-col">
                    <h1 className="h-16 flex-1 border-b border-gray-200 text-2xl font-bold text-gray-900">
                      Acompanhe todos os eventos
                    </h1>
                    <hr />

                    <form
                      onSubmit={handleSubmit(searching)}
                      className="mt-10 grid grid-cols-12 gap-4"
                    >
                      <TextField
                        className="col-span-10"
                        register={register}
                        label="Nome"
                        name="name"
                        type="text"
                        autoComplete="name"
                      />
                      <div className="col-span-2">
                        <Toggle
                          control={control}
                          name="isFollowing"
                          label="Nas suas comunidades"
                        />
                      </div>
                      <div className="col-span-2 flex items-end">
                        <Button
                          type="submit"
                          variant="solid"
                          color="blue"
                          className="w-full"
                        >
                          <span>Buscar</span>
                        </Button>
                      </div>
                    </form>
                    <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      >
                        <Bars4Icon className="h-5 w-5" aria-hidden="true" />
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

                  <section
                    className="mt-8 pb-16"
                    aria-labelledby="gallery-heading"
                  >
                    <h2 id="gallery-heading" className="sr-only">
                      Recently viewed
                    </h2>
                    <ul
                      role="list"
                      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:gap-x-6 xl:gap-x-8"
                    >
                      {eventList.map((event) => (
                        <li key={event.uuid} className="relative">
                          <EventCard {...(event as any)} />
                        </li>
                      ))}
                    </ul>
                    {dataPage?.meta?.hasNextPage && (
                      <div className="my-6 flex justify-center">
                        <Button
                          type="button"
                          variant="solid"
                          color="blue"
                          onClick={() => handleLoadMore()}
                          isLoading={isLoading || isFetching}
                        >
                          Carrefar mais
                        </Button>
                      </div>
                    )}
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

  return {
    props: {},
  };
};
