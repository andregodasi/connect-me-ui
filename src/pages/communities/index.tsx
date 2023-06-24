import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import MainContainer from '@/containers/MainContainer';
import {
  Squares2X2Icon as ViewGridIconSolid,
  Bars4Icon,
} from '@heroicons/react/20/solid';
import { useQuery } from 'react-query';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { Button } from '@/components/Button';
import { getPaginatedGroups } from '@/services/group';
import {
  Group,
  GroupFilters,
  GroupPageOptionWithFilters,
} from '@/shared/interfaces/IGroup';
import GroupCard from '@/components/GroupCard';
import { Form, Input, Button as ButtonAnt } from 'antd';
import { ToggleForm } from '@/components/ToggleForm';
import { SkeletonCards } from '@/components/SkeletonCards';
import { Placeholder } from '@/components/Placeholder';
import emptyCommunities from '@/images/svg/alien_space.svg';

const initPageOptions: PageOptions = { page: 1 };

export default function Communities({ isFollowing = false }) {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [filters, setFilters] = useState<GroupFilters>();
  const [pageOptions, setPageOptions] = useState<GroupPageOptionWithFilters>({
    ...initPageOptions,
    isFollowing,
  });
  const {
    isLoading,
    data: dataPage,
    isFetching,
  } = useQuery(
    ['DashboardCommunities', pageOptions, filters],
    () => getPaginatedGroups(pageOptions),
    { staleTime: Infinity },
  );

  useEffect(() => {
    if (dataPage?.data && dataPage?.meta?.page === 1) {
      setGroupList([...dataPage.data]);
    } else if (dataPage?.data) {
      setGroupList([...groupList, ...dataPage.data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPage]);

  const handleLoadMore = () => {
    setPageOptions({
      ...pageOptions,
      page: pageOptions.page ? pageOptions.page + 1 : 1,
    });
  };

  async function searching(data: any) {
    const filtersData: any = {
      q: data.community,
      isFollowing: data.isFollowing,
    };

    setPageOptions({
      page: 1,
      ...filtersData,
    });

    setFilters({ ...filtersData });
  }

  const isShowLoading = isLoading || isFetching;

  const isShowSkeleton = isShowLoading && !groupList.length;

  const isShowEmpty = !isShowLoading && !groupList.length;

  const isShowList = !isShowLoading && !!groupList.length;

  return (
    <MainContainer>
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-1 items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <div className="flex flex-col">
                <h1 className="h-16 flex-1 border-b border-gray-200 text-2xl font-bold text-gray-900">
                  Fique de olho em nossas comunidades!
                </h1>
                <hr />
                <Form onFinish={searching} layout="vertical" className="!mt-4">
                  <div className="flex gap-4">
                    <Form.Item
                      label="Comunidade"
                      name="community"
                      className="flex-1"
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item
                      label="Seguidor"
                      name="isFollowing"
                      className="!mb-0"
                      initialValue={isFollowing}
                    >
                      <ToggleForm />
                    </Form.Item>
                  </div>

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
                    <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Use grid view</span>
                  </button>
                </div>
              </div>

              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="sr-only">
                  Comunidades
                </h2>
                {isShowEmpty && (
                  <Placeholder
                    image={emptyCommunities}
                    alt="Nenhum evento encontrado"
                    title="Ops, não encontramos nenhumna comunidade!"
                    descriptionTop="Não encontramos nenhuma comunidade nesse planeta, será que você está no planeta certo? "
                    descriptionBottom="Não encontramos nenhuma comunidade com os filtros selecionados. Tente novamente com outros filtros."
                  />
                )}
                {isShowSkeleton && <SkeletonCards />}
                {isShowList && (
                  <>
                    <ul
                      role="list"
                      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:gap-x-6 xl:gap-x-8"
                    >
                      {groupList.map((group) => (
                        <li key={group.uuid} className="relative">
                          <GroupCard {...(group as any)} />
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
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'connect.token': token } = parseCookies(ctx);

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
