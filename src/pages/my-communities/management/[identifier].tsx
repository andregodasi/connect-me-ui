import { GetServerSideProps } from 'next';
import { Fragment, useState } from 'react';
import { Menu, Transition, Tab } from '@headlessui/react';
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  LinkIcon,
  PencilIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import MainContainer from '@/containers/MainContainer';
import { useMutation, useQuery } from 'react-query';
import {
  deleteGroup,
  findByIdentifierGroup,
  publishGroup,
} from '@/services/group';
import Link from 'next/link';
import { Button, Drawer, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { formatWeekYear } from '@/shared/utils/transforms/dates';
import {
  ToggleOptions,
  ToggleStatus,
  ToggleStatusEnum,
} from '@/components/ToggleStatus';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { EventsListByGroup } from '@/components/EventsListByCommunity';
import { FollowersByCommunity } from '@/components/FollowersByCommunity';
import PreviewCommunity from '@/components/PreviewCommunity';
import { MyComments } from '@/components/MyComments';
import { parseCookies } from 'nookies';

const statusOptions: ToggleOptions = {
  published: {
    name: 'Publicado',
    action: 'Publicar',
    description:
      'Essa comunidade está publicada e visivel para na plataforma para qualquer usuário.',
  },
  draft: {
    name: 'Rascunho',
    action: 'Rascunho',
    description:
      'Essa comunidade está em rascunho e está visiavel apenas para o seu administrador',
  },
  delete: {
    name: 'Excluído',
    action: 'Excluir',
    description:
      'Essa comunidade será excluída e todas suas informação serão apagadas.',
  },
  loading: {
    name: 'Carregando...',
    action: 'Carregando...',
    description: 'Carregando...',
  },
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface ManagementGroupProps {
  identifier: string;
}

export default function ManagementGroup({ identifier }: ManagementGroupProps) {
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

  const { data: group, refetch: refetchGroup } = useQuery(
    [`my-communities-management${identifier}`],
    () => findByIdentifierGroup(identifier),
    {
      enabled: !!identifier,
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: mutatePublishGroup, isLoading: mutatePublishGroupLoading } =
    useMutation(publishGroup, {
      onSuccess: () => {
        refetchGroup();
        toast.success(`Comunidade publicada com sucesso!`);
      },
      onSettled: () => {
        // Error or success... doesn't matter!
        setIsOpenModalPublished(false);
      },
    });

  const { mutate: mutateDeleteGroup, isLoading: mutateDeleteGroupLoading } =
    useMutation(deleteGroup, {
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
    if (!mutatePublishGroupLoading) {
      setIsOpenModalPublished(false);
    }
  };

  const handleCancelModalDelete = () => {
    if (!mutateDeleteGroupLoading) {
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
                  title="Quantidade de seguidores"
                  aria-label="Quantidade de seguidores"
                >
                  <UserGroupIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {group?.users?.length}
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
              <div className="mt-1 flex flex-col sm:mt-4 sm:flex-wrap ">
                <div
                  className="mt-2 flex items-center text-sm text-gray-500"
                  title="Eventos onlines"
                  aria-label="Eventos onlines"
                >
                  Descrição da comunidade
                </div>
                <div className="max-w-2xl">{group?.description}</div>
              </div>
            </div>
            <div className="mt-5 flex xl:mt-0 xl:ml-4">
              <span className="hidden sm:block">
                <Link
                  href={`/my-communities/${identifier}`}
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
                {group?.isPublised ? (
                  <Link
                    href={`/communities/${group.slug}`}
                    type="button"
                    className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    <LinkIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Ver comunidade
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
                  group?.isPublised
                    ? ToggleStatusEnum.PUBLISHED
                    : ToggleStatusEnum.DRAFT
                }
                isLoading={
                  mutatePublishGroupLoading || mutateDeleteGroupLoading
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
                          href={`/my-communities/${identifier}`}
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
                    {!group?.isPublised && (
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
                    {group?.isPublised && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`/communities/${group.slug}`}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex w-full items-center px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            <LinkIcon
                              className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            Ver comunidade
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
              <h2 className="flex items-center gap-2 text-lg font-medium text-gray-900">
                <div>Gerencie sua comunidade </div>
                <Link
                  className="flex md:hidden"
                  href={`/my-communities/${identifier}/my-events/create`}
                >
                  <Button
                    aria-label="Criar evento"
                    className="items-center"
                    style={{ display: 'flex' }}
                    icon={<PlusOutlined />}
                    size="small"
                    shape="round"
                    type="primary"
                    title="Criar evento"
                  >
                    <span className="flex items-center gap-2">
                      <span>Evento</span>
                    </span>
                  </Button>
                </Link>
              </h2>
              <Tab.Group as="div">
                <div className="flex items-center justify-between border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-500 text-blue-500'
                            : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                        )
                      }
                    >
                      Eventos
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-500 text-blue-500'
                            : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                        )
                      }
                    >
                      Seguidores
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-500 text-blue-500'
                            : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                        )
                      }
                    >
                      Comentários
                    </Tab>
                  </Tab.List>
                  <Link
                    className="hidden md:flex"
                    href={`/my-communities/${identifier}/my-events/create`}
                  >
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
                    <EventsListByGroup groupUUID={identifier} />
                  </Tab.Panel>
                  <Tab.Panel className="mb-10">
                    <FollowersByCommunity groupUUID={identifier} />
                  </Tab.Panel>
                  <Tab.Panel className="mb-10">
                    <MyComments uuidEntity={identifier} type="group" />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </main>
      </div>
      <Modal
        title="Publicar comunidade?"
        open={isOpenModalPublished}
        maskClosable={false}
        onOk={() => mutatePublishGroup(group.uuid)}
        onCancel={handleCancelModalPublished}
        okButtonProps={{
          shape: 'round',
          size: 'large',
          loading: mutatePublishGroupLoading,
        }}
        cancelButtonProps={{
          size: 'large',
          type: 'text',
          disabled: mutatePublishGroupLoading,
        }}
        okText="Publicar"
        cancelText="Cancelar"
      >
        <p>
          Após a publicação da comunidade ele ficará disponível para todos os
          usuários da plataforma, você tem certeza quer deseja publicar?
        </p>
      </Modal>
      <Modal
        title="Excluir comunidade?"
        open={isOpenModalDelete}
        maskClosable={false}
        onOk={() => mutateDeleteGroup(group.uuid)}
        onCancel={() => handleCancelModalDelete()}
        okButtonProps={{
          shape: 'round',
          size: 'large',
          danger: true,
          loading: mutateDeleteGroupLoading,
        }}
        cancelButtonProps={{
          size: 'large',
          type: 'text',
          disabled: mutateDeleteGroupLoading,
        }}
        okText="Excluir"
        cancelText="Cancelar"
      >
        <p>
          Após a exclusão, todos os dados da comunidade serão deletados e não
          poderão ser recuperados, você tem certeza que deseja excluir o evento?
        </p>
      </Modal>
      <Drawer
        title="Prévia da tela da comunidade"
        placement="bottom"
        closable={true}
        onClose={onClose}
        open={open}
        key="Brawer-Preview"
        height="100vh"
      >
        {group && <PreviewCommunity group={group} isFollower />}
      </Drawer>
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const identifier = ctx.params?.identifier || '';

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
    props: { identifier },
  };
};
