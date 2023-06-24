import React, { useEffect, useState } from 'react';
import { FlagIcon, RocketLaunchIcon } from '@heroicons/react/20/solid';
import { FullPagination } from '@/components/FullPagination';
import { useQuery } from 'react-query';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { Comment } from '@/shared/interfaces/IComment';
import { LineComments } from './components/LineComments';
import { FileTextOutlined, StarOutlined } from '@ant-design/icons';
import { Placeholder } from '../Placeholder';
import commentsEmpty from '@/images/svg/answer_comments.svg';
import { LineLoading } from './components/LineLoading';
import { getPaginatedMyComments } from '@/services/comment';

const initPageOptions: PageOptions = { page: 1 };

interface MyCommentsProps {
  type: 'event' | 'group';
  uuidEntity: string;
}

export const MyComments: React.FC<MyCommentsProps> = ({ type, uuidEntity }) => {
  const [commentsPage, setCommentsPage] = useState<Comment[]>([]);
  const [pageOptions, setPageOptions] = useState<PageOptions>(initPageOptions);
  const {
    data: dataPage,
    refetch: refetchPage,
    isLoading,
    isFetching,
  } = useQuery(
    [`comments-${type}-${uuidEntity}`, pageOptions],
    () => getPaginatedMyComments(pageOptions.page, uuidEntity, type),
    { staleTime: Infinity },
  );

  useEffect(() => {
    if (dataPage?.data) {
      const comments: Comment[] = [...dataPage.data] as unknown as Comment[];
      setCommentsPage(comments);
    }
  }, [dataPage]);

  const handleLoad = (loadPage: number) => {
    setPageOptions({
      ...pageOptions,
      page: loadPage,
    });
  };

  const refetchComments = () => {
    setPageOptions({ ...initPageOptions });
    refetchPage();
  };

  const isShowLoading = isLoading || isFetching;
  const isShowList = !isLoading && !!commentsPage?.length;
  const isShowEmpty = !isLoading && !commentsPage?.length;

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
                          {type === 'event' ? 'Inscrito' : 'Seguidor'}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <div className="flex">
                          <FileTextOutlined
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          Comentário
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <div className="flex">
                          <StarOutlined
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          Comentário
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
                          Status
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Ver comentário completo</span>
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
                  {isShowList
                    ? commentsPage?.map((comment: Comment) => (
                        <tr key={comment.uuid}>
                          <LineComments
                            comment={comment}
                            refetchComments={refetchComments}
                            type={type}
                            uuidEntity={uuidEntity}
                          />
                        </tr>
                      ))
                    : null}
                  {isShowLoading
                    ? Array.from({ length: 5 })?.map((_, i) => (
                        <tr key={i}>
                          <LineLoading />
                        </tr>
                      ))
                    : null}
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

      {isShowEmpty ? (
        <Placeholder
          image={commentsEmpty}
          title="Não encontramos nenhum comentário"
          alt="Não encontramos nenhum comentário"
          descriptionTop={`${
            type === 'event' ? 'Seu Evento' : 'Sua comunidade'
          } ainda não recebeu nenhum comentário.`}
        />
      ) : null}
    </div>
  );
};
