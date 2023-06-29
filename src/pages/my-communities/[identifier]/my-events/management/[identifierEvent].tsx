import { GetServerSideProps } from 'next';
import { Fragment, useState } from 'react';
import { Menu, Transition, Tab } from '@headlessui/react';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  GlobeAltIcon,
  LinkIcon,
  MapIcon,
  MapPinIcon,
  PencilIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import MainContainer from '@/containers/MainContainer';
import { useMutation, useQuery } from 'react-query';
import Link from 'next/link';
import { formatWeekDateTime } from '@/shared/utils/transforms/dates';
import {
  deleteEvent,
  findByIdentifierEvent,
  publishEvent,
} from '@/services/event';
import { SubscribersList } from '@/components/SubscribersList';
import {
  ToggleOptions,
  ToggleStatus,
  ToggleStatusEnum,
} from '@/components/ToggleStatus';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { classNames } from '@/shared/helpers/styleSheets';
import { Drawer, Modal } from 'antd';
import { MyComments } from '@/components/MyComments';
import PreviewEvent from '@/components/PreviewEvent';
import { EventType } from '@/shared/enums/event-type.enum';
import { parseCookies } from 'nookies';

const tabs = [
  { name: 'Applied', href: '#', count: '2', current: false },
  { name: 'Phone Screening', href: '#', count: '4', current: false },
  { name: 'Interview', href: '#', count: '6', current: true },
  { name: 'Offer', href: '#', current: false },
  { name: 'Disqualified', href: '#', current: false },
];

const statusOptions: ToggleOptions = {
  published: {
    name: 'Publicado',
    action: 'Publicar',
    description:
      'Esse evento está publicada e visivel para na plataforma para qualquer usuário.',
  },
  draft: {
    name: 'Rascunho',
    action: 'Rascunho',
    description:
      'Esse evento está em rascunho e está visiavel apenas para o seu administrador',
  },
  delete: {
    name: 'Excluído',
    action: 'Excluir',
    description:
      'Esse evento será excluída e todas suas informação serão apagadas.',
  },
  loading: {
    name: 'Carregando...',
    action: 'Carregando...',
    description: 'Carregando...',
  },
};

interface ManagementGroupProps {
  identifier: string;
  identifierEvent: string;
}

export default function ManagementGroup({
  identifier,
  identifierEvent,
}: ManagementGroupProps) {
  const router = useRouter();
  const [isOpenModalPublished, setIsOpenModalPublished] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { data: event, refetch: refetchEvent } = useQuery(
    [`my-events-management${identifierEvent}`],
    () => findByIdentifierEvent(identifierEvent),
    {
      enabled: !!identifierEvent,
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: mutatePublishEvent, isLoading: mutatePublishEventLoading } =
    useMutation(publishEvent, {
      onSuccess: () => {
        refetchEvent();
        toast.success(`Evento publicado com sucesso!`);
      },
      onSettled: () => {
        setIsOpenModalPublished(false);
      },
    });

  const { mutate: mutateDeleteEvent, isLoading: mutateDeleteEventLoading } =
    useMutation(deleteEvent, {
      onSuccess: () => {
        router.push('/my-communities');
        toast.success(`Comunidade excluída com sucesso!`);
      },
      onSettled: () => {
        // Error or success... doesn't matter!
        setIsOpenModalDelete(false);
      },
    });

  const handleToggleStatus = (status: ToggleStatusEnum) => {
    if (status === ToggleStatusEnum.PUBLISHED) {
      setIsOpenModalPublished(true);
      return;
    }

    if (status === ToggleStatusEnum.DELETE) {
      setIsOpenModalDelete(true);
    }
  };

  const handleCancelModalPublished = () => {
    if (!mutatePublishEventLoading) {
      setIsOpenModalPublished(false);
    }
  };

  const handleCancelModalDelete = () => {
    if (!mutateDeleteEventLoading) {
      setIsOpenModalDelete(false);
    }
  };

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
                      <Link
                        href="/"
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Home
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <Link
                        href="/my-communities"
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Comunidades
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <Link
                        href={`/my-communities/management/${identifier}`}
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Gerenciamento da comunidade
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Gerenciamento do evento
                      </div>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {event?.name}
              </h1>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Link do evento"
                  aria-label="Link do evento"
                >
                  <LinkIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {event?.slug}
                </div>
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Eventos onlines"
                  aria-label="Eventos onlines"
                >
                  {event?.address && (
                    <>
                      <MapIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <address className="not-italic">{event.address}</address>
                    </>
                  )}
                  {event?.link && (
                    <>
                      <LinkIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <address className="not-italic">{event.link}</address>
                    </>
                  )}
                </div>
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Eventos onlines"
                  aria-label="Eventos onlines"
                >
                  {event?.type === EventType.IN_PERSON ? (
                    <>
                      <MapPinIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      Presencial
                    </>
                  ) : (
                    <>
                      <GlobeAltIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      Online
                    </>
                  )}
                </div>
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Quantidade de inscritos"
                  aria-label="Quantidade de inscritos"
                >
                  <UserGroupIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {event?.users?.length || 0}
                </div>
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Data do evento"
                  aria-label="Data do evento"
                >
                  <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {formatWeekDateTime(event?.initialDate)}
                </div>
              </div>
              <div className="mt-1 flex flex-col sm:mt-4 sm:flex-wrap ">
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Eventos onlines"
                  aria-label="Eventos onlines"
                >
                  Descrição do evento
                </div>
                <div className="max-w-2xl">{event?.description}</div>
              </div>
            </div>
            <div className="mt-5 flex xl:mt-0 xl:ml-4">
              <span className="hidden sm:block">
                <Link
                  href={`/my-events/${identifier}`}
                  type="button"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Editar
                </Link>
              </span>
              <span className="ml-3 hidden sm:block">
                {event?.isPublised ? (
                  <Link
                    href={`/events/${event.slug}`}
                    type="button"
                    className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    <LinkIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Ver evento
                  </Link>
                ) : (
                  <button
                    onClick={() => showDrawer()}
                    type="button"
                    className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    <EyeIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Prévia
                  </button>
                )}
              </span>

              <ToggleStatus
                status={
                  event?.isPublised
                    ? ToggleStatusEnum.PUBLISHED
                    : ToggleStatusEnum.DRAFT
                }
                isLoading={
                  mutatePublishEventLoading || mutateDeleteEventLoading
                }
                toggleOptions={statusOptions}
                handleOnChange={(status: ToggleStatusEnum) =>
                  handleToggleStatus(status)
                }
              />

              {/* Dropdown */}
              <Menu as="div" className="relative ml-3 sm:hidden">
                <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Mais
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
                        <Link
                          href={`/my-events/${identifier}`}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'flex px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          <PencilIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          Editar
                        </Link>
                      )}
                    </Menu.Item>
                    {!event?.isPublised && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex w-full items-center px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            <EyeIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Prévia
                          </button>
                        )}
                      </Menu.Item>
                    )}
                    {event?.isPublised && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`/events/${event.slug}`}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex w-full items-center px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            <LinkIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Ver evento
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </header>

        <main className="pt-8 pb-16">
          <div className="container mx-auto sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-medium text-gray-900">
                Gerencie seu evento
              </h2>
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Selecione a tab
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
                          'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                        )
                      }
                    >
                      Inscritos
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                        )
                      }
                    >
                      Comentários
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="mb-10">
                    <SubscribersList eventUUID={identifierEvent} />
                  </Tab.Panel>
                  <Tab.Panel className="mb-10">
                    <MyComments uuidEntity={identifierEvent} type="event" />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </main>
      </div>
      <Modal
        title="Publicar evento?"
        open={isOpenModalPublished}
        maskClosable={false}
        onOk={() => mutatePublishEvent(event.uuid)}
        onCancel={handleCancelModalPublished}
        okButtonProps={{
          shape: 'round',
          size: 'large',
          loading: mutatePublishEventLoading,
        }}
        cancelButtonProps={{
          size: 'large',
          type: 'text',
          disabled: mutatePublishEventLoading,
        }}
        okText="Publicar"
        cancelText="Cancelar"
      >
        <p>
          Após a publicação do evento ele ficará disponível para todos os
          usuários da plataforma, você tem certeza quer deseja publicar?
        </p>
      </Modal>
      <Modal
        title="Excluir comunidade?"
        open={isOpenModalDelete}
        maskClosable={false}
        onOk={() => mutateDeleteEvent(event.uuid)}
        onCancel={() => handleCancelModalDelete()}
        okButtonProps={{
          shape: 'round',
          size: 'large',
          danger: true,
          loading: mutateDeleteEventLoading,
        }}
        cancelButtonProps={{
          size: 'large',
          type: 'text',
          disabled: mutateDeleteEventLoading,
        }}
        okText="Excluir"
        cancelText="Cancelar"
      >
        <p>
          Após a exclusão, todos os dados do evento serão deletados e não
          poderão ser recuperados, você tem certeza que deseja excluir o evento?
        </p>
      </Modal>
      <Drawer
        title="Prévia da tela do evento"
        placement="bottom"
        closable={true}
        onClose={onClose}
        open={open}
        key="Brawer-Preview"
        height="100vh"
      >
        {event && <PreviewEvent event={event} />}
      </Drawer>
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const identifier = ctx.params?.identifier || '';
  const identifierEvent = ctx.params?.identifierEvent || '';
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
    props: { identifier, identifierEvent },
  };
};
