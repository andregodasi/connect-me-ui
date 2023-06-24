import Head from 'next/head';
import Link from 'next/link';
import { AuthLayout } from '@/components/AuthLayout';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { LogoConnectMe } from '@/components/LogoConnectMe';
import { Button, Form, Input } from 'antd';
import {
  FormMessages,
  maxLengthMessage,
} from '@/shared/utils/texts/formMessages';
import emailImage from '@/images/svg/undraw_mail_sent.svg';
import Image from 'next/image';

export default function ForgotPassword() {
  const [isSuccessfullyRecovered, setIsSuccessfullyRecovered] = useState(false);
  const { forgotPassword } = useContext(AuthContext);

  const [form] = Form.useForm();

  async function handleRecoveryPassword(data: { email: string }) {
    await forgotPassword(data.email);
    setIsSuccessfullyRecovered(true);
  }

  return (
    <>
      <Head>
        <title>Connect me | Esqueci minha senha </title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <LogoConnectMe className="h-10 w-auto" />
          </Link>
        </div>
        {isSuccessfullyRecovered ? (
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              E-mail enviado com sucesso!
            </h2>
            <p className="mt-2 mb-10 text-sm text-gray-700">
              Enviamos um e-mail com instruções para recupeção de senha.
              Verifique sua caixa de entrada.
            </p>
            <div className="flex justify-center">
              <Image
                src={emailImage}
                alt="Email enviado com sucesso"
                width={200}
                height={400}
                unoptimized
              />
            </div>
          </div>
        ) : (
          <>
            <div className="mt-20 mb-10">
              <h2 className="text-lg font-semibold text-gray-900">
                Esqueceu sua senha?
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Não se preocupe! Basta digitar seu e-mail abaixo e enviaremos
                instruções para recuperá-la.
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
            <Form
              form={form}
              onFinish={handleRecoveryPassword}
              layout="vertical"
            >
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { type: 'email', message: 'E-mail inválido' },
                  { required: true, message: FormMessages.REQUIRED_FIELD },
                  { max: 256, message: maxLengthMessage(256) },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  shape="round"
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="!w-full"
                >
                  Envial e-mail!
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </AuthLayout>
    </>
  );
}
