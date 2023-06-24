import { createComment, getPaginatedPublicComments } from '@/services/comment';
import { PageOptions } from '@/shared/interfaces/IPageOptions';
import { Button, Form, Input, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Comment } from './components/Comment';
import { Comment as IComment } from '@/shared/interfaces/IComment';
import { CommentsLoading } from './components/CommentsLoading';
import { Placeholder } from '../Placeholder';
import commentsEmpty from '@/images/svg/answer_comments.svg';
import {
  FormMessages,
  maxLengthMessage,
} from '@/shared/utils/texts/formMessages';
import { toast } from 'react-toastify';
import { tooltipsRate } from '@/shared/utils/helpers/rate';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { previewData } from './previewData';

const { TextArea } = Input;

interface CommentsListBoxProps {
  uuid: string;
  type: 'event' | 'group';
  isPreview?: boolean;
}

const initPageOptions: PageOptions = { page: 1 };

export const CommentsListBox: React.FC<CommentsListBoxProps> = ({
  uuid,
  type,
  isPreview = false,
}) => {
  const [commentsState, setCommentsState] = useState<any>(
    isPreview ? previewData : [],
  );
  const [pageOptions, setPageOptions] = useState<PageOptions>({
    ...initPageOptions,
  });
  const [form] = Form.useForm();

  const {
    refetch: refetchComments,
    data: dataComments,
    isLoading,
    isFetching,
  } = useQuery(
    [`comments-public-${type}-${uuid}`, pageOptions],
    () => getPaginatedPublicComments(type, uuid, pageOptions),
    {
      enabled: !isPreview,
      cacheTime: 0,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  );

  const { mutate: mutateComment, isLoading: isLoadingCreateComment } =
    useMutation(createComment, {
      onSuccess: () => {
        toast.success('Comentário inserido com sucesso!');
        resetComments();
        form.resetFields();
      },
    });

  useEffect(() => {
    if (dataComments?.data && dataComments?.meta?.page === 1) {
      setCommentsState([...dataComments.data]);
    } else if (dataComments?.data) {
      setCommentsState([...commentsState, ...dataComments.data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataComments]);

  const resetComments = () => {
    setPageOptions({ ...initPageOptions });
    refetchComments();
  };

  const handleLoadMore = () => {
    setPageOptions({
      ...pageOptions,
      page: pageOptions.page ? pageOptions.page + 1 : 1,
    });
  };

  async function handleAddComent(data: any) {
    mutateComment({ type, uuid, comment: data });
  }

  const isShowLoading = (isLoading || isFetching) && commentsState.length === 0;
  const isShowPlaceholder =
    !isLoading && !isFetching && commentsState.length === 0;

  return (
    <>
      <h3 className="sr-only">Comentários</h3>
      <Form
        form={form}
        onFinish={handleAddComent}
        layout="vertical"
        className="!mt-4"
      >
        <Form.Item
          name="text"
          rules={[
            { required: true, message: FormMessages.REQUIRED_FIELD },
            { max: 1000, message: maxLengthMessage(1000) },
          ]}
        >
          <TextArea placeholder="Escreva seu comentário" />
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item
            name="starts"
            rules={[{ required: true, message: FormMessages.REQUIRED_FIELD }]}
          >
            <Rate tooltips={tooltipsRate} />
          </Form.Item>

          <Form.Item>
            <Button
              title="Enviar comentário"
              shape="circle"
              type="primary"
              htmlType="submit"
              className="!flex !items-center !justify-center"
              loading={isLoadingCreateComment}
              icon={
                <PaperAirplaneIcon className="h-4 w-4" aria-hidden="true" />
              }
            ></Button>
          </Form.Item>
        </div>
      </Form>

      {commentsState.map((comment: IComment) => (
        <Comment
          key={comment.uuid}
          user={comment.user}
          text={comment.text}
          starts={comment.starts}
          createAt={comment.createAt}
        />
      ))}
      {dataComments?.meta?.hasNextPage && (
        <div className="my-6 flex justify-center">
          <Button
            loading={isLoading || isFetching}
            type="primary"
            shape="round"
            className="mt-6"
            onClick={() => handleLoadMore()}
          >
            Carregar mais
          </Button>
        </div>
      )}
      {isShowLoading && <CommentsLoading />}
      {isShowPlaceholder && (
        <Placeholder
          descriptionTop="Não encontramos nenhum comentário"
          descriptionBottom="Seja o primeiro a comentar!"
          image={commentsEmpty}
          alt="Não encontramos nenhum comentário"
        />
      )}
    </>
  );
};
