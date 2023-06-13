import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getAPIClient } from '../services/axios';
import MainContainer from '@/containers/MainContainer';
import {
  Squares2X2Icon as ViewGridIconSolid,
  Bars4Icon,
  TicketIcon,
} from '@heroicons/react/20/solid';
import EventCard from '@/components/EventCard';
import { useQuery } from 'react-query';
import { Page } from '@/shared/interfaces/IPage';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { getPaginatedEvents } from '@/services/event';
import {
  DatePicker,
  Form,
  Input,
  Space,
  Button as ButtonAnt,
  Row,
  Col,
  Collapse,
  Typography,
  Drawer,
} from 'antd';
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
import { ToggleForm } from '@/components/ToggleForm';
import styles from '../styles/Dashboard.module.css';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import {
  formatFinishDateISO8601,
  formatISO8601,
  formatInitialDateISO8601,
} from '@/shared/utils/transforms/dates';
import useMediaQuery from '@/hooks/useMediaQuery';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { Text } = Typography;

interface SerachData {
  name?: string;
  isFollowing?: boolean;
}

const initPageOptions: EventPageOptionWithFilters = { page: 1 };

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { isLG } = useMediaQuery();
  const [openUpcomingAppointments, setOpenUpcomingAppointments] =
    useState(false);
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
    ['DashboardEvents', pageOptions, filters],
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
    const filtersData: any = {
      q: data.event,
      isFollowing: data.isFollowing,
    };

    if (data?.rangeDate?.[0]) {
      filtersData['dateInitial'] = formatInitialDateISO8601(
        data.rangeDate?.[0]
      );
    }

    if (data?.rangeDate?.[1]) {
      filtersData['dateFinal'] = formatFinishDateISO8601(data.rangeDate?.[1]);
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
                      Acompanhe todos os eventos
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
                                name="isFollowing"
                                className="!mb-0"
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
