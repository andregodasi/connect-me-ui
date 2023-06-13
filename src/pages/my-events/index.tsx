import { Button } from '@/components/Button';
import MainContainer from '@/containers/MainContainer';
import { useQuery } from 'react-query';
import { Pagination } from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { getPaginatedMyEvents } from '@/services/event';
import { Event } from '@/shared/interfaces/IEvent';
import Image from 'next/image';
import placeholderImage from '@/images/screen-0.webp';

const initPageOptions: PageOptions = { page: 1 };

export default function MyEvents() {
  const [eventPage, setEventPage] = useState<Event[]>([]);
  const [pageOptions, setPageOptions] = useState<PageOptions>(initPageOptions);
  const { data: dataPage } = useQuery(
    ['DashboardEvents', pageOptions],
    () => getPaginatedMyEvents(pageOptions.page),
    { staleTime: Infinity },
  );

  useEffect(() => {
    if (dataPage?.data) {
      setEventPage([...dataPage.data]);
    }
  }, [dataPage]);

  const handleLoad = (loadPage: number) => {
    setPageOptions({
      ...pageOptions,
      page: loadPage,
    });
  };
  return (
    <MainContainer>
      <div className="container mx-auto py-2 px-4 ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Meus eventos
          </h2>
        </div>
      </div>
      <div className="container mx-auto py-2 px-4">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {eventPage?.map(({ uuid, name, description }: Event) => (
            <li
              key={uuid}
              className="relative flex flex-col justify-between rounded-lg shadow"
            >
              <div className="aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <Image
                  width={200}
                  height={200}
                  src={placeholderImage}
                  alt="community"
                  className="max-h-[12rem] w-full object-cover group-hover:opacity-75"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-3">
                <div>
                  <p className="mt-2 block truncate text-sm font-medium text-gray-900">
                    {name}
                  </p>
                  <p
                    aria-label={description}
                    title={description}
                    className="ellipis-3 block text-sm font-medium text-gray-500"
                  >
                    {description}
                  </p>
                </div>
                <div className="mt-4 flex flex-col justify-start gap-4 md:flex-row">
                  <Button type="button" variant="solid" color="blue">
                    Gerenciar
                  </Button>
                  <Button
                    href={`/my-communities/${uuid}`}
                    type="button"
                    variant="solid"
                    color="white"
                  >
                    Editar
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {dataPage && (
          <div className="my-10">
            <Pagination
              {...dataPage.meta}
              handlePrevious={() => handleLoad(pageOptions.page - 1)}
              handleNext={() => handleLoad(pageOptions.page + 1)}
            />
          </div>
        )}
      </div>
    </MainContainer>
  );
}
