import { toast } from 'react-toastify';
import MainContainer from '@/containers/MainContainer';
import { GroupForm } from '@/shared/interfaces/IGroup';
import { useMutation, useQuery } from 'react-query';
import { findByIdentifierGroup, saveGroupWithFile } from '@/services/group';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import type { RcFile } from 'antd/es/upload/interface';
import { Button, Form, Input, Spin, Typography } from 'antd';
import { UploadImage } from '../UploadImage';
import { Spinner } from '../Spinner';
import { FormMessages } from '@/shared/utils/texts/formMessages';
import { getWindow } from '@/shared/helpers/dom';

const { TextArea } = Input;
const { Text } = Typography;

export const FormGroup: React.FC<{ identifier?: string }> = ({
  identifier = '',
}) => {
  const router = useRouter();
  const [imageUpload, setImageUpload] = useState<RcFile | undefined>(undefined);
  const [initialImage, setInitialImage] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);

  const [form] = Form.useForm();

  const { isLoading, isFetching } = useQuery(
    ['MyGroup'],
    () => findByIdentifierGroup(identifier),
    {
      enabled: !!identifier,
      staleTime: Infinity,
      onSuccess(data) {
        form.setFieldsValue({
          name: data.name,
          slug: data.slug,
          description: data.description,
        });
        setInitialImage(data.coverUrl);
      },
    },
  );

  const { mutate: mutateGroup, isLoading: isLoadingMutateGroup } = useMutation(
    saveGroupWithFile,
    {
      onError: () => {
        toast.success(
          'Ops! Estamos com algum problema temporário, por favor tente novamente mais tarde.',
        );
      },
      onSuccess: () => {
        toast.success('Comunidade criada com sucesso!');
        router.push('/my-communities');
      },
    },
  );

  async function handleSubmit(data: GroupForm) {
    setIsSubmited(true);
    if (!imageUpload && !initialImage) {
      return;
    }

    mutateGroup({
      ...data,
      coverImage: imageUpload,
      coverUrl: initialImage,
      uuid: identifier,
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
            Criar comunidade
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
              }/communities/minha-comunidade`}
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
            <Form.Item>
              <UploadImage
                image={imageUpload}
                setImage={setImageUpload}
                initialImage={initialImage}
                setInitialImage={setInitialImage}
                label="Capa da comunidade"
                description="Essa imagem será apresentada na busca de comunidades e na página da comunidade "
              />
              {!imageUpload && !initialImage && isSubmited && (
                <Text type="danger">Capa da comunidade é obrigatória!</Text>
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
                  loading={isLoadingMutateGroup}
                >
                  {identifier ? 'Editar' : 'Criar'}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </div>
    </MainContainer>
  );
};
