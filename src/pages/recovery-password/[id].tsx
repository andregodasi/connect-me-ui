import Head from 'next/head';
import Link from 'next/link';
import { AuthLayout } from '@/components/AuthLayout';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { LogoConnectMe } from '@/components/LogoConnectMe';
import { Button, Form, Input } from 'antd';
import {
  FormMessages,
  maxLengthMessage,
} from '@/shared/utils/texts/formMessages';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface RecoveryPasswordProps {
  id: string;
}

export default function RecoveryPassword({ id }: RecoveryPasswordProps) {
  const { recoveryPassword } = useContext(AuthContext);
  const router = useRouter();

  const [form] = Form.useForm();

  async function handleRecoveryPassword(data: { password: string }) {
    await recoveryPassword(id, data.password);
    toast.success('Senha alterada com sucesso!');
    router.push('/login');
  }

  return (
    <>
      <Head>
        <title>Connect me | Recuperar senha </title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <LogoConnectMe className="h-10 w-auto" />
          </Link>
        </div>

        <>
          <div className="mt-20 mb-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Altere sua senha
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Digite sua nova senha nos campos abaixo.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Já é cadastrado?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Acesse
              </Link>{' '}
              sua conta.
            </p>
          </div>
          <Form form={form} onFinish={handleRecoveryPassword} layout="vertical">
            <Form.Item
              label="Nova senha"
              name="password"
              tooltip="A senha deve conter no mínimo 4 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais."
              rules={[
                { required: true, message: FormMessages.REQUIRED_FIELD },
                {
                  min: 4,
                  message: 'A senha deve conter no mínimo 8 caracteres.',
                },
                { max: 20, message: maxLengthMessage(20) },
                {
                  pattern: /^(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z]).*$/,
                  message:
                    'Formato inválido. Deve conter letras maiúsculas, minúsculas, números e caracteres especiais.',
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
            <Form.Item
              label="Confirme a nova senha"
              name="confirmPassword"
              tooltip="Os campos Senha e Confirme a nova senha devem conter o mesmo valor."
              rules={[
                { required: true, message: FormMessages.REQUIRED_FIELD },
                {
                  min: 4,
                  message: 'A senha deve conter no mínimo 8 caracteres.',
                },
                { max: 20, message: maxLengthMessage(20) },
                {
                  validator: (_rule, value, callback) => {
                    if (value !== form.getFieldValue('password')) {
                      callback('As senhas não conferem.');
                      return;
                    }
                    callback();
                  },
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                shape="round"
                size="large"
                type="primary"
                htmlType="submit"
                className="!w-full"
              >
                Alterar senha!
              </Button>
            </Form.Item>
          </Form>
        </>
      </AuthLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id || '';

  return {
    props: { id },
  };
};
