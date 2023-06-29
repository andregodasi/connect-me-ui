import { PlusSmallIcon as PlusSmIconSolid } from '@heroicons/react/20/solid';
import { Button } from '@/components/Button';
import MainContainer from '@/containers/MainContainer';
import { useQuery } from 'react-query';
import { getMyGroups } from '@/services/group';
import { Group } from '@/shared/interfaces/IGroup';
import { MyGroupCard } from '@/components/MyGroupCard';
import { Role } from '@/shared/enums/role.enum';
import { Placeholder } from '@/components/Placeholder';
import noData from '@/images/svg/no_data.svg';

export default function MyCommunities() {
  const {
    data: groups,
    isLoading,
    isFetching,
  } = useQuery(['MyGroups'], () => getMyGroups(), {
    staleTime: Infinity,
  });

  const isShowList = !isLoading && !!groups?.length;
  const isShowLoading = isLoading || isFetching;
  const isShowEmpty = !isShowLoading && !groups?.length;

  return (
    <MainContainer>
      <div className="container mx-auto py-2 px-4 ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Minhas comunidades
          </h2>
          <Button
            href="my-communities/create"
            type="submit"
            variant="solid"
            color="blue"
            aria-label="Criar comunidade"
          >
            <span className="flex items-center gap-2">
              <span className="hidden md:flex">Criar comunidade</span>
              <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </div>
      <div className="container mx-auto py-2 px-4">
        {isLoading && (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                className="skeleton h-full w-full rounded-lg shadow"
                style={{ height: '316px' }}
                key={index}
              />
            ))}
          </ul>
        )}
        {isShowList && (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {groups?.map(
              ({ uuid, name, description, coverUrl, users }: Group) => (
                <li key={uuid}>
                  <MyGroupCard
                    uuid={uuid}
                    name={name}
                    coverUrl={coverUrl}
                    description={description}
                    isAdmin={!!users?.find?.(({ role }) => role === Role.ADMIN)}
                  />
                </li>
              ),
            )}
          </ul>
        )}
        {isShowEmpty && (
          <Placeholder
            image={noData}
            alt="Não encontramos nenhuma comunidade"
            descriptionTop="Você ainda não criou nenhuma comunidade"
            descriptionBottom='Clique em "Criar comunidade" para começar'
          />
        )}
      </div>
    </MainContainer>
  );
}
