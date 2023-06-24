import React from 'react';
import { Comment } from '@/shared/interfaces/IComment';
import { FileTextOutlined, RightOutlined } from '@ant-design/icons';
import {
  Button,
  Descriptions,
  Drawer,
  Form,
  Modal,
  Rate,
  Input,
  Typography,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { deleteComment } from '@/services/comment';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import {
  FormMessages,
  maxLengthMessage,
} from '@/shared/utils/texts/formMessages';

const { TextArea } = Input;
const { Paragraph } = Typography;

interface LineCommentsProps {
  comment: Comment;
  refetchComments: () => void;
  uuidEntity: string;
  type: 'event' | 'group';
}

export const LineComments: React.FC<LineCommentsProps> = ({
  comment,
  refetchComments,
  uuidEntity,
  type,
}) => {
  const [isOpenCompleteComment, setIsOpenCompleteComment] =
    React.useState(false);
  const [isOpenDeleteComment, setIsOpenDelteComment] = React.useState(false);
  const [form] = Form.useForm();

  const {
    uuid,
    text,
    starts,
    reasonDeleted,
    user: { name, photoUrl },
  } = comment;

  const { mutate: mutateDeleteComment, isLoading: isLoadingDeleteComment } =
    useMutation(deleteComment, {
      onSuccess: () => {
        toast.success('Comentário excluído com sucesso!');
        refetchComments();
        setIsOpenDelteComment(false);
        setIsOpenCompleteComment(false);
      },
    });

  const handleDeleteComment = (data: any) => {
    mutateDeleteComment({
      uuidComment: uuid,
      uuidEntity,
      type,
      reasonDeleted: data.reasonDeleted,
    });
  };

  return (
    <>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="w-16 flex-shrink-0">
            <Image
              width={200}
              height={200}
              className="aspect-square w-12 rounded-full object-cover group-hover:opacity-75"
              src={photoUrl}
              alt={name}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{name}</div>
          </div>
        </div>
      </td>
      <td
        style={{ minWidth: '420px' }}
        className="py-5 pl-4 pr-3 text-sm sm:pl-0"
      >
        <div className="flex items-center">
          <div className="ml-4">
            <div className="font-medium text-gray-900">{text}</div>
          </div>
        </div>
      </td>
      <td
        style={{ minWidth: '160px' }}
        className="py-5 pl-4 pr-3 text-sm sm:pl-0"
      >
        <div className="flex items-center">
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              <Rate disabled defaultValue={starts} />
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {reasonDeleted ? (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
            <XCircleIcon
              className="mr-1 h-3 w-3 flex-shrink-0 text-red-400"
              aria-hidden="true"
            />
            Arquivado
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            <CheckCircleIcon
              className="mr-1 h-3 w-3 flex-shrink-0 text-green-400"
              aria-hidden="true"
            />
            Ativo
          </span>
        )}
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Button
          type="link"
          icon={<FileTextOutlined />}
          style={{ display: 'flex' }}
          className="flex flex-row-reverse items-center gap-2"
          onClick={() => setIsOpenCompleteComment(true)}
        >
          Ver comentário
          <span className="sr-only">Ver comentário completo</span>
        </Button>
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Link href={`/profile/${uuid}`}>
          <Button
            type="link"
            icon={<RightOutlined />}
            style={{ display: 'flex' }}
            className="flex flex-row-reverse items-center gap-2"
          >
            Ver perfil
          </Button>
          <span className="sr-only">, {name}</span>
        </Link>
      </td>
      <Drawer
        title="Comentário completo"
        placement="right"
        onClose={() => setIsOpenCompleteComment(false)}
        open={isOpenCompleteComment}
      >
        <Descriptions layout="vertical" column={1}>
          <Descriptions.Item label="Seguidor">{name}</Descriptions.Item>
          <Descriptions.Item label="Avaliação">
            <Rate disabled defaultValue={starts} />
          </Descriptions.Item>
          <Descriptions.Item label="Comentário">{text}</Descriptions.Item>
          {reasonDeleted && (
            <Descriptions.Item label="Motivo do arquivamento">
              {reasonDeleted}
            </Descriptions.Item>
          )}
        </Descriptions>

        {!reasonDeleted && (
          <Paragraph>
            Ao arquivar comentário, ele não será mais visível para os usuários
            da plataforma.
          </Paragraph>
        )}
        {reasonDeleted && (
          <Paragraph>
            Esse comentário foi arquivado, ele não é mais visível para os
            usuários da plataforma.
          </Paragraph>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <Button
            danger
            shape="round"
            disabled={isLoadingDeleteComment}
            onClick={() => setIsOpenCompleteComment(false)}
          >
            Fechar
          </Button>
          {!reasonDeleted && (
            <Button
              danger
              type="primary"
              shape="round"
              disabled={isLoadingDeleteComment}
              onClick={() => setIsOpenDelteComment(true)}
            >
              Arquivar
            </Button>
          )}
        </div>
      </Drawer>
      <Modal
        title="Confirmar arquivamento?"
        open={isOpenDeleteComment}
        maskClosable={false}
        onOk={form.submit}
        onCancel={() => setIsOpenDelteComment(false)}
        okButtonProps={{
          shape: 'round',
          size: 'large',
          danger: true,
          loading: isLoadingDeleteComment,
        }}
        cancelButtonProps={{
          size: 'large',
          type: 'default',
          danger: true,
          shape: 'round',
          disabled: isLoadingDeleteComment,
        }}
        okText="Arquivar"
        cancelText="Fechar"
      >
        <Paragraph>
          {`Ao Arquivar esse comentário não será mais monstrado na página ${
            type === 'event' ? 'do evento' : 'da comunidade'
          }. O dono do comentário receberá um email com o motivo do arquivamento.
          Você tem certeza que deseja arquivar esse comentário?`}
        </Paragraph>
        <h3 className="sr-only">Arquivar comentário</h3>
        <Form
          form={form}
          onFinish={handleDeleteComment}
          layout="vertical"
          className="!mt-4"
        >
          <Form.Item
            label="Motivo do arquivamento do comentário"
            name="reasonDeleted"
            rules={[
              { required: true, message: FormMessages.REQUIRED_FIELD },
              { max: 1000, message: maxLengthMessage(1000) },
            ]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
