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

  const { mutate: mutateEvent } = useMutation(saveEvent, {
    onError: (error) => {
      console.log(error);
      console.log(`onError`);
    },
    onSuccess: () => {
      toast.success('Evento criado com sucesso!');
      router.push(`/my-communities/management/${identifier}`);
    },
    onSettled: (data) => {
      // Error or success... doesn't matter!
      console.log(data);
      console.log(`onSettled`);
    },
  });

  async function handleSubmit(data: EventForm) {
    console.log(data);
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
              <Input placeholder="input placeholder" size="large" />
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
              <Input placeholder="input placeholder" size="large" />
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
                placeholder="input placeholder"
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
              <Input placeholder="input placeholder" size="large" />
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
                >
                  {identifierEvent ? 'Editar' : 'Criar'}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </div>
      {/*  <div className="container mx-auto px-4">
        <form
          onSubmit={handleSubmit(handleSaveEvent)}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('name')}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Slug
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      connect-me.com.br/event/
                    </span>
                    <input
                      {...register('slug')}
                      type="text"
                      name="slug"
                      id="slug"
                      autoComplete="slug"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descrição
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register('description')}
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      defaultValue={''}
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Fale um pouco sobre os assuntos abordados e os objetivos da
                    sua comunidade
                  </p>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Endereço
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('address')}
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="given-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="initialDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data inicial
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('initialDate')}
                      type="date"
                      name="initialDate"
                      id="initialDate"
                      autoComplete="given-initialDate"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="finishDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data final
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('finishDate')}
                      type="date"
                      name="finishDate"
                      id="finishDate"
                      autoComplete="given-finishDate"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="limitParticipants"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Limite de participantes
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('limitParticipants')}
                      type="number"
                      name="limitParticipants"
                      id="limitParticipants"
                      autoComplete="given-limitParticipants"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <Label
                    htmlFor=""
                    value="Capa do evento"
                    className="label-form"
                  />
                  <InputUploadSample
                    imageData={coverEvent}
                    setImageData={setCoverEvent}
                    aspectRatio={AspectRatio.WIDE_SCREEN}
                    initialImage={initialImage}
                    setInitialImage={setInitialImage}
                  />
                  {!coverEvent && isSubmitted && (
                    <ErrorMessages
                      errorMessages={{
                        type: '',
                        message: 'Capa do evento é obrigatória!',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end gap-8">
              <Button
                type="button"
                variant="solid"
                color="white"
                disabled={mutateEventLoading}
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="solid"
                color="blue"
                isLoading={mutateEventLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div> */}
    </MainContainer>
  );
};
