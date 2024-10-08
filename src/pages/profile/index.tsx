import { toast } from 'react-toastify';
import MainContainer from '@/containers/MainContainer';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import type { RcFile } from 'antd/es/upload/interface';
import { Button, Form, Input, Spin, Typography, Select } from 'antd';
import {
  FormMessages,
  maxLengthMessage,
} from '@/shared/utils/texts/formMessages';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@/services/axios';
import {
  getCurrentProfileSSR,
  saveProfile,
  uploadPhoto,
} from '@/services/user';
import {
  ProfileForm,
  User,
  profileFromToPayload,
  userDataToProfileForm,
} from '@/shared/interfaces/IUser';
import { Spinner } from '@/components/Spinner';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { LinkedInIcon } from '@/images/svg/icons/LinkedInIcon';
import { GitHubIcon } from '@/images/svg/icons/GitHubIcon';
import { TwitterIcon } from '@/images/svg/icons/TwitterIcon';
import { InstagramIcon } from '@/images/svg/icons/InstagramIcon';
import { FacebookIcon } from '@/images/svg/icons/FacebookIcon';
import { degreeArray } from '@/shared/enums/degree.enum';
import { UploadProfile } from '@/components/UploadProfile';
import { AuthContext } from '@/contexts/AuthContext';
import { parseCookies } from 'nookies';

const { TextArea } = Input;
const { Text, Title } = Typography;

export const Profile: React.FC<{
  currentUser: User;
}> = ({ currentUser }) => {
  const { refreshUserInformation } = useContext(AuthContext);
  const router = useRouter();
  const [form] = Form.useForm();

  const { mutate: mutateProfile } = useMutation(saveProfile, {
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      refreshUserInformation();
    },
  });

  const { mutate: mutateUpdatePhoto, isLoading: mutateUpdatePhotoLoading } =
    useMutation(uploadPhoto, {
      onSuccess: () => {
        toast.success('Foto do Perfil atualizada com sucesso!');
        refreshUserInformation();
      },
    });

  async function handleSubmit(data: ProfileForm) {
    const payload = profileFromToPayload(data);
    mutateProfile({
      ...payload,
    });
  }

  const handleImageChange = (dataSrc: RcFile | undefined) => {
    if (dataSrc) {
      mutateUpdatePhoto(dataSrc);
    }
  };

  return (
    <MainContainer>
      <div className="container mx-auto mb-6 border-b border-gray-900/10 px-4 pt-6">
        <Title level={3} className="!font-bold">
          Perfil
        </Title>
        <Text>Cadastre as Informações referente ao seu perfil.</Text>
        <div className="flex justify-center">
          <UploadProfile
            initialImage={currentUser.photoUrl}
            isLoading={mutateUpdatePhotoLoading}
            handleImageChange={handleImageChange}
          />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <Spin indicator={Spinner} spinning={false}>
          <Form
            form={form}
            initialValues={userDataToProfileForm(currentUser)}
            onFinish={handleSubmit}
            layout="vertical"
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mb-6">
                  <Title level={3} className="!font-bold">
                    Informações pessoais
                  </Title>
                  <Text>Queremos saber um pouco mais sobre você.</Text>
                </div>
                <Form.Item
                  label="Nome"
                  name="name"
                  rules={[
                    { required: true, message: FormMessages.REQUIRED_FIELD },
                    { max: 1000, message: FormMessages.MAX_LENGTH_100 },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="E-mail">
                  <Input value={currentUser.email} size="large" disabled />
                </Form.Item>
                <Form.Item
                  label="Como você quer ser chamado?"
                  name="nickname"
                  rules={[
                    { required: true, message: FormMessages.REQUIRED_FIELD },
                    { max: 1000, message: FormMessages.MAX_LENGTH_100 },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  label="Título"
                  name="title"
                  rules={[{ max: 1000, message: FormMessages.MAX_LENGTH_100 }]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  label="Fale um pouco sobre você"
                  name="aboutMe"
                  rules={[{ max: 1000, message: maxLengthMessage(1000) }]}
                >
                  <TextArea
                    placeholder="Sobre mim"
                    size="large"
                    showCount
                    maxLength={1000}
                    style={{ height: 120 }}
                  />
                </Form.Item>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mb-6">
                  <Title level={3} className="!font-bold">
                    Informações profissionais
                  </Title>
                  <Text>
                    Queremos saber um pouco mais sobre sua vida profissional.
                  </Text>
                </div>

                <Form.Item
                  label="Empresa onde trabalha"
                  name="companyName"
                  rules={[{ max: 100, message: FormMessages.MAX_LENGTH_100 }]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  label="Cargo atual"
                  name="companyRole"
                  rules={[{ max: 1000, message: maxLengthMessage(1000) }]}
                >
                  <Input size="large" />
                </Form.Item>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mb-6">
                  <Title level={3} className="font-bold">
                    Redes sociais
                  </Title>
                  <Text>
                    Como andam suas redes, isso é uma parte importante para seu
                    networking
                  </Text>
                </div>
                <Form.Item
                  label="LinkedIn"
                  name="linkedIn"
                  rules={[{ max: 1000, message: maxLengthMessage(1000) }]}
                >
                  <Input
                    size="large"
                    prefix={
                      <Icon
                        className="icon-redes h-6 w-6"
                        component={LinkedInIcon}
                      />
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="GitHub"
                  name="gitHub"
                  rules={[{ max: 1000, message: maxLengthMessage(1000) }]}
                >
                  <Input
                    size="large"
                    prefix={
                      <Icon
                        className="icon-redes h-6 w-6"
                        component={GitHubIcon}
                      />
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Twitter"
                  name="twitter"
                  rules={[{ max: 1000, message: maxLengthMessage(1000) }]}
                >
                  <Input
                    size="large"
                    prefix={
                      <Icon
                        className="icon-redes h-6 w-6"
                        component={TwitterIcon}
                      />
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Instagram"
                  name="instagram"
                  rules={[{ max: 1000, message: maxLengthMessage(1000) }]}
                >
                  <Input
                    size="large"
                    prefix={
                      <Icon
                        className="icon-redes h-6 w-6"
                        component={InstagramIcon}
                      />
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Facebook"
                  name="facebook"
                  rules={[{ max: 1000, message: maxLengthMessage(1000) }]}
                >
                  <Input
                    size="large"
                    prefix={
                      <Icon
                        className="icon-redes h-6 w-6"
                        component={FacebookIcon}
                      />
                    }
                  />
                </Form.Item>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mb-6">
                  <Title level={3} className="font-bold">
                    Informações acadêmicas
                  </Title>
                  <Text>
                    Como foi usa vida acadêmica? Conte um pouco para nós.
                  </Text>
                </div>
                <Form.Item
                  label="Formação"
                  name="degree"
                  rules={[{ max: 1000, message: maxLengthMessage(1000) }]}
                >
                  <Select size={'large'} options={degreeArray} />
                </Form.Item>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mb-6">
                  <Title level={3} className="font-bold">
                    Cursos, licenças e certificados
                  </Title>
                  <Text>
                    Quais foram os ultimos cursos, licenças e certificados que
                    você fez? Conte um pouco para nós.
                  </Text>
                </div>

                <Form.List name="knowledge">
                  {(fields, { add, remove }) => (
                    <>
                      <Form.Item>
                        <Button
                          shape="round"
                          type="dashed"
                          size="large"
                          className="!flex items-center justify-center"
                          onClick={() => add({}, 0)}
                          block
                          icon={<PlusOutlined />}
                        >
                          Adicionar
                        </Button>
                      </Form.Item>
                      <div className="flex flex-col gap-4">
                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            className="rounded-lg p-6"
                            style={{
                              backgroundColor: '#ffffff',
                              borderColor: '#d9d9d9',
                              boxShadow: '0 2px 0 rgba(0, 0, 0, 0.02)',
                              borderStyle: 'dashed',
                              borderWidth: '1px',
                            }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'name']}
                              label="Nome"
                              rules={[
                                {
                                  required: true,
                                  message: FormMessages.REQUIRED_FIELD,
                                },
                                {
                                  max: 1000,
                                  message: maxLengthMessage(1000),
                                },
                              ]}
                            >
                              <Input size="large" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'description']}
                              label="Descrição"
                              rules={[
                                {
                                  required: true,
                                  message: FormMessages.REQUIRED_FIELD,
                                },
                                {
                                  max: 1000,
                                  message: maxLengthMessage(1000),
                                },
                              ]}
                            >
                              <TextArea
                                placeholder="Sobre mim"
                                size="large"
                                style={{ height: 120 }}
                              />
                            </Form.Item>
                            <div className="flex justify-end">
                              <Button
                                danger
                                type="text"
                                shape="round"
                                onClick={() => remove(name)}
                              >
                                Remover
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </Form.List>
              </div>

              <div className="mt-10 flex justify-end gap-2">
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
                    Atualizar
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </Spin>
      </div>
    </MainContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const data = await getCurrentProfileSSR(apiClient);

  const { ['connect.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { currentUser: data },
  };
};

export default Profile;
