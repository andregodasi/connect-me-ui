import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';
import { LogoConnectMe } from '@/components/LogoConnectMe';
import { api } from '@/services/api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';
import emailImage from '@/images/svg/undraw_mail_sent.svg';

interface RegisterData {
  email: string;
  nickname: string;
  name: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterData>();
  const [isSuccessfullyRegistered, setIsSuccessfullyRegistered] =
    useState(false);

  async function handleRegister(data: RegisterData) {
    try {
      await api.post('/user', data);
      setIsSuccessfullyRegistered(true);
    } catch (e) {}
  }

  return (
    <>
      <Head>
        <title>Connect me | Cadastre-se</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <LogoConnectMe className="h-10 w-auto" />
          </Link>
        </div>
        {isSuccessfullyRegistered ? (
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Cadastro realizado com sucesso!
            </h2>
            <p className="mt-2 mb-10 text-sm text-gray-700">
              Enviamos um email de confirmação para você. Confirme seu email
              para acessar a plataforma.
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
            <div className="mt-20">
              <h2 className="text-lg font-semibold text-gray-900">
                Se Cadastre-se agora é gratuito!
              </h2>
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
            <form
              action="#"
              className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
              onSubmit={handleSubmit(handleRegister)}
            >
              <TextField
                label="Nome"
                register={register}
                name="name"
                type="text"
                autoComplete="given-name"
                required
              />
              <TextField
                label="Nome de usuário"
                register={register}
                name="nickname"
                type="text"
                autoComplete="family-name"
                required
              />
              <TextField
                className="col-span-full"
                label="E-mail"
                register={register}
                name="email"
                type="email"
                autoComplete="email"
                required
              />
              <TextField
                className="col-span-full"
                label="Senha"
                register={register}
                name="password"
                type="password"
                autoComplete="new-password"
                required
              />
              <div className="col-span-full">
                <Button
                  type="submit"
                  variant="solid"
                  color="blue"
                  className="w-full"
                >
                  <span>
                    Cadastrar <span aria-hidden="true">&rarr;</span>
                  </span>
                </Button>
              </div>
            </form>
          </>
        )}
      </AuthLayout>
    </>
  );
}
