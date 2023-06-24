import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import MainContainer from '@/containers/MainContainer';
import { TicketIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import EventCard from '@/components/EventCard';
import { useQuery } from 'react-query';
import { getPaginatedEvents } from '@/services/event';
import {
  DatePicker,
  Form,
  Input,
  Button as ButtonAnt,
  Collapse,
  Drawer,
} from 'antd';
import {
  Event,
  EventFilters,
  EventPageOptionWithFilters,
} from '@/shared/interfaces/IEvent';
import { Button } from '@/components/Button';
import { EventsSummary } from '@/components/EventsSummary';
import { CommunitiesSummary } from '@/components/CommunitiesSummary';
import { getPaginatedGroups } from '@/services/group';
import { ToggleForm } from '@/components/ToggleForm';
import styles from '../styles/Dashboard.module.css';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import {
  formatFinishDateISO8601,
  formatInitialDateISO8601,
} from '@/shared/utils/transforms/dates';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Placeholder } from '@/components/Placeholder';
import emptyEvents from '@/images/svg/empty_results_large.svg';
import { SkeletonCards } from '@/components/SkeletonCards';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const initPageOptions: EventPageOptionWithFilters = { page: 1 };

interface DashboardProps {
  isSubscribed: boolean;
}

export default function Dashboard({ isSubscribed }: DashboardProps) {
  const { isLG } = useMediaQuery();
  const [openUpcomingAppointments, setOpenUpcomingAppointments] =
    useState(false);
  const [filters, setFilters] = useState<EventFilters>();
  const [eventList, setEventList] = useState<Event[]>([]);
  const [pageOptions, setPageOptions] = useState<EventPageOptionWithFilters>({
    ...initPageOptions,
    isSubscribed,
  });
  const {
    isLoading,
    data: dataPage,
    isFetching,
  } = useQuery(
    ['DashboardEvents', pageOptions, filters],
    () => getPaginatedEvents(pageOptions),
    { staleTime: Infinity },
  );

  const { isLoading: isLoadingMyEvents, data: myEvents } = useQuery(
    ['DashboardMyEvents'],
    () => getPaginatedEvents({ page: 1, take: 5, isSubscribed: true }),
    {
      staleTime: Infinity,
    },
  );

  const { isLoading: isLoadingMyGroups, data: myGroups } = useQuery(
    ['DashboardMyGroups'],
    () => getPaginatedGroups({ page: 1, take: 5, isFollowing: true }),
    {
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (dataPage?.data && dataPage?.meta?.page === 1) {
      setEventList([...dataPage.data]);
    } else if (dataPage?.data) {
      setEventList([...eventList, ...dataPage.data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPage]);

  useEffect(() => {
    if (isSubscribed) {
      setPageOptions((oldData) => {
        return { ...oldData, isSubscribed };
      });
    }
  }, [isSubscribed]);

  const handleLoadMore = () => {
    setPageOptions({
      ...pageOptions,
      page: pageOptions.page ? pageOptions.page + 1 : 1,
    });
  };

  async function searching(data: any) {
    const filtersData: any = {
      q: data.event,
      isSubscribed: data.isSubscribed,
    };

    if (data?.rangeDate?.[0]) {
      filtersData.dateInitial = formatInitialDateISO8601(data.rangeDate?.[0]);
    }

    if (data?.rangeDate?.[1]) {
      filtersData.dateFinal = formatFinishDateISO8601(data.rangeDate?.[1]);
    }

    setPageOptions({
      page: 1,
      ...filtersData,
    });

    setFilters({ ...filtersData });
  }

  const handleCloseUpcomingAppointments = () => {
    setOpenUpcomingAppointments(false);
  };

  const handleOpenUpcomingAppointments = () => {
    setOpenUpcomingAppointments(true);
  };

  const isShowLoading = isLoading || isFetching;

  const isShowSkeleton = isShowLoading && !eventList.length;

  const isShowEmpty = !isShowLoading && !eventList.length;

  const isShowList = !isShowLoading && !!eventList.length;

  return (
    <MainContainer>
      <div className="container mx-auto grid gap-4 px-2 sm:px-4 lg:grid-cols-3 lg:px-8">
        <div className="hidden flex-col gap-8 lg:flex">
          <EventsSummary
            events={myEvents?.data}
            isLoading={isLoadingMyEvents}
          />
          <CommunitiesSummary
            communities={myGroups?.data || []}
            isLoading={isLoadingMyGroups}
          />
        </div>
        {!isLG && (
          <Drawer
            title="Próximos eventos"
            placement="left"
            onClose={handleCloseUpcomingAppointments}
            open={openUpcomingAppointments}
          >
            <div className="flex flex-col gap-8">
              <EventsSummary
                events={myEvents?.data}
                isLoading={isLoadingMyEvents}
              />
              <CommunitiesSummary
                communities={myGroups?.data || []}
                isLoading={isLoadingMyGroups}
              />
            </div>
          </Drawer>
        )}

        <div className="col-span-2">
          <div>
            <div className="flex flex-1 items-stretch overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                  <div className="flex flex-col">
                    <h1 className="h-16 flex-1 border-b border-gray-200 text-2xl font-bold text-gray-900">
                      {isSubscribed ? (
                        <>
                          Acompanhe seus eventos{' '}
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
                            <CheckCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                            Inscrito
                          </span>
                        </>
                      ) : (
                        'Acompanhe todos os eventos'
                      )}
                    </h1>
                    <hr />
                    <div className="lg:hidden">
                      <ButtonAnt
                        type="link"
                        size="small"
                        onClick={handleOpenUpcomingAppointments}
                        className={`!flex !items-center !gap-1 !p-0`}
                        icon={
                          <TicketIcon className="h-4 w-4" aria-hidden="true" />
                        }
                      >
                        Próximos Eventos
                      </ButtonAnt>
                    </div>

                    <Form
                      onFinish={searching}
                      layout="vertical"
                      className="!mt-4"
                    >
                      <Form.Item label="Evento" name="event">
                        <Input size="large" />
                      </Form.Item>

                      <Collapse
                        ghost
                        className="collapse"
                        expandIcon={({ isActive }) => (
                          <div className="flex items-center gap-1">
                            <ChevronDownIcon
                              className={`w-4 ${
                                isActive
                                  ? 'rotate-180 !text-blue-600'
                                  : 'rotate-0 !text-gray-400'
                              }`}
                            />
                            <FunnelIcon
                              className={`w-5 ${
                                isActive ? '!text-blue-600' : '!text-gray-400'
                              }`}
                            />
                          </div>
                        )}
                      >
                        <Panel
                          className={styles.collapse}
                          header="Mais filtros"
                          key="1"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row">
                            <div>
                              <Form.Item
                                label="Data do evento"
                                name="rangeDate"
                              >
                                <RangePicker
                                  size="large"
                                  popupClassName="popup-range-date-picker"
                                />
                              </Form.Item>
                            </div>
                            <div>
                              <Form.Item
                                label="Inscrito"
                                name="isSubscribed"
                                className="!mb-0"
                                initialValue={isSubscribed}
                              >
                                <ToggleForm />
                              </Form.Item>
                            </div>
                          </div>
                        </Panel>
                      </Collapse>

                      <Form.Item>
                        <ButtonAnt
                          loading={isLoading || isFetching}
                          type="primary"
                          htmlType="submit"
                          shape="round"
                          size="large"
                          className="mt-6"
                        >
                          Buscar
                        </ButtonAnt>
                      </Form.Item>
                    </Form>

                    {/* <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
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
                    </div> */}
                  </div>

                  <section
                    className="mt-8 pb-16"
                    aria-labelledby="gallery-heading"
                  >
                    <h2 id="gallery-heading" className="sr-only">
                      Próximos eventos
                    </h2>
                    {isShowEmpty && (
                      <Placeholder
                        image={emptyEvents}
                        alt="Nenhum evento encontrado"
                        title="Ops, Nenhum evento encontrado!!!"
                        descriptionBottom="Não encontramos nenhum evento com os filtros selecionados. Tente novamente com outros filtros."
                      />
                    )}
                    {isShowSkeleton && <SkeletonCards />}
                    {isShowList && (
                      <>
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
                              Carregar mais
                            </Button>
                          </div>
                        )}
                      </>
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
  const { ['connect.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const isSubscribed = ctx.query.isSubscribed === 'true';

  return {
    props: { isSubscribed },
  };
};
