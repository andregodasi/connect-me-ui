import React, { useState } from 'react';
import { toast } from 'react-toastify';
import MainContainer from '@/containers/MainContainer';
import dayjs from 'dayjs';
import { EventForm } from '@/shared/interfaces/IEvent';
import { useMutation, useQuery } from 'react-query';
import { findByIdentifierEvent, saveEvent } from '@/services/event';
import { useRouter } from 'next/router';
import type { RcFile } from 'antd/es/upload/interface';
import {
  Button,
  Form,
  Input,
  DatePicker,
  Spin,
  Typography,
  InputNumber,
} from 'antd';
import { UploadImage } from '../UploadImage';
import { Spinner } from '../Spinner';
import { FormMessages } from '@/shared/utils/texts/formMessages';
import { getWindow } from '@/shared/helpers/dom';

const { TextArea } = Input;
const { Text } = Typography;
const { RangePicker } = DatePicker;

export const FormEvent: React.FC<{
  identifier: string;
  identifierEvent?: string;
}> = ({ identifier, identifierEvent = '' }) => {
  const router = useRouter();
  const [imageUpload, setImageUpload] = useState<RcFile | undefined>(undefined);
  const [initialImage, setInitialImage] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);
  const [form] = Form.useForm();

  const { isLoading, isFetching } = useQuery(
    ['MyEvent'],
    () => findByIdentifierEvent(identifierEvent),
    {
      enabled: !!identifierEvent,
      staleTime: Infinity,
      onSuccess(data) {
        form.setFieldsValue({
          name: data.name,
          slug: data.slug,
          description: data.description,
          address: data.address,
          limitParticipants: data.limitParticipants,
          eventDate: [dayjs(data.initialDate), dayjs(data.finishDate)],
        });
        setInitialImage(data.coverUrl);
      },
    },
  );

  const { mutate: mutateEvent, isLoading: isLoadingMutateEvent } = useMutation(
    saveEvent,
    {
      onSuccess: () => {
        toast.success('Evento criado com sucesso!');
        router.push(`/my-communities/management/${identifier}`);
      },
    },
  );

  async function handleSubmit(data: EventForm) {
    setIsSubmited(true);
    if (!imageUpload && !initialImage) {
      return;
    }
    mutateEvent({
      ...data,
      uuidGroup: identifier,
      uuid: identifierEvent,
      initialDate: data?.eventDate?.[0].toDate(),
      finishDate: data?.eventDate?.[1].toDate(),
      limitParticipants: Number(data.limitParticipants),
      coverImage: imageUpload,
      coverUrl: initialImage,
    });
  }

  const handleFinishFailed = () => {
    setIsSubmited(true);
  };

  return (
    <MainContainer>
      <div className="container mx-auto px-4 pt-2 pb-8 ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {identifierEvent ? 'Editar' : 'Criar'} Evento
          </h2>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <Spin indicator={Spinner} spinning={isLoading || isFetching}>
          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={handleFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Nome"
              name="name"
              rules={[
                { required: true, message: FormMessages.REQUIRED_FIELD },
                { max: 100, message: FormMessages.MAX_LENGTH_100 },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Slug"
              name="slug"
              tooltip={`Slug é a parte de uma URL que pode ser legível tanto para humanos quanto para mecanismos de busca. Personalize sua url. Ex: ${
                getWindow()?.location?.origin
              }/communities/${identifierEvent}/meu-evento`}
              rules={[
                { required: true, message: FormMessages.REQUIRED_FIELD },
                { max: 100, message: FormMessages.MAX_LENGTH_1000 },
                {
                  pattern: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
                  message:
                    'Formato inválido. Use apenas letras, numero e traço (-) entre palavras.',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Descrição"
              name="description"
              rules={[
                { required: true, message: FormMessages.REQUIRED_FIELD },
                { max: 1000, message: FormMessages.MAX_LENGTH_1000 },
              ]}
            >
              <TextArea
                size="large"
                showCount
                maxLength={1000}
                style={{ height: 120 }}
              />
            </Form.Item>
            <Text>
              Fale um pouco sobre os assuntos abordados e os objetivos da sua
              comunidade
            </Text>
            <Form.Item
              label="Endereço"
              name="address"
              rules={[
                { required: true, message: FormMessages.REQUIRED_FIELD },
                { max: 100, message: FormMessages.MAX_LENGTH_100 },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Data do evento"
              name="eventDate"
              rules={[{ required: true, message: FormMessages.REQUIRED_FIELD }]}
            >
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="DD/MM/YYYY   HH:mm"
                placement="bottomRight"
              />
            </Form.Item>
            <Form.Item
              label="Limite de participantes"
              name="limitParticipants"
              rules={[{ required: true, message: FormMessages.REQUIRED_FIELD }]}
            >
              <InputNumber min={1} max={1000} defaultValue={0} />
            </Form.Item>
            <Form.Item>
              <UploadImage
                image={imageUpload}
                setImage={setImageUpload}
                initialImage={initialImage}
                setInitialImage={setInitialImage}
                label="Capa do evento"
                description="Essa imagem será apresentada na busca de eventos e na página do evento "
              />
              {!imageUpload && !initialImage && isSubmited && (
                <Text type="danger">Capa do evento é obrigatória!</Text>
              )}
            </Form.Item>
            <div className="flex justify-end gap-2">
              <Form.Item>
                <Button
                  shape="round"
                  size="large"
                  type="text"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  shape="round"
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={isLoadingMutateEvent}
                >
                  {identifierEvent ? 'Editar' : 'Criar'}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </div>
    </MainContainer>
  );
};
