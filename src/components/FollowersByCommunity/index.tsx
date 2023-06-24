import React, { useEffect, useState } from 'react';
import {
  CalendarDaysIcon,
  FlagIcon,
  RocketLaunchIcon,
} from '@heroicons/react/20/solid';
import { FullPagination } from '@/components/FullPagination';
import { useQuery } from 'react-query';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { FollowersTableLine } from './components/FollowersTableLine';
import { Follower } from '@/shared/interfaces/IFollower';
import { getPaginatedMyFollowersByMyGroup } from '@/services/user';
import { LoadingList } from '../EventsListByCommunity/components/LoadingList';
import { Placeholder } from '../Placeholder';
import noFollowers from '@/images/svg/no_followers.svg';

const initPageOptions: PageOptions = { page: 1 };

interface FollowersByCommunityProps {
  groupUUID: string;
}

export const FollowersByCommunity: React.FC<FollowersByCommunityProps> = ({
  groupUUID,
}) => {
  const [followersPage, setFollowersPage] = useState<Follower[]>([]);
  const [pageOptions, setPageOptions] = useState<PageOptions>(initPageOptions);
  const {
    data: dataPage,
    isLoading,
    isFetching,
  } = useQuery(
    ['DashboardEvents', pageOptions],
    () => getPaginatedMyFollowersByMyGroup(pageOptions.page, groupUUID),
    { staleTime: Infinity },
  );

  useEffect(() => {
    if (dataPage?.data) {
      setFollowersPage([...dataPage.data]);
    }
  }, [dataPage]);

  const handleLoad = (loadPage: number) => {
    setPageOptions({
      ...pageOptions,
      page: loadPage,
    });
  };

  const isShowLoading = isLoading || isFetching;
  const isShowList = !isLoading && followersPage?.length;
  const isShowEmpty = !isLoading && !followersPage?.length;

  return (
    <div>
      <div className="container mx-auto">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                {(isShowList || isShowLoading) && (
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
                          Inscrito
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
                          Titulo
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
                          Empresa
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Mandar salve!</span>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Ver mais</span>
                      </th>
                    </tr>
                  </thead>
                )}
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isShowList &&
                    followersPage?.map((fallower: Follower) => (
                      <FollowersTableLine
                        follower={fallower}
                        key={fallower.name}
                      />
                    ))}
                  {isShowLoading && <LoadingList />}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isShowList && dataPage && (
        <div className="my-10">
          <FullPagination
            {...dataPage.meta}
            handleGoToPage={(goToPage) => handleLoad(goToPage)}
          />
        </div>
      )}
      {isShowEmpty && (
        <Placeholder
          image={noFollowers}
          alt="Nenhum seguidor encontrado"
          title="Nenhum seguidor encontrado"
          descriptionTop="Ainda não temos nenhum seguidor para essa comunidade."
        />
      )}
    </div>
  );
};
