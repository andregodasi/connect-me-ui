import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/Button';
import { TextField } from '@/components/Fields';
import { Logo } from '@/components/Logo';
import Image from 'next/image';
import logo from '@/images/logo/rgb.png';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext, SignInData } from '@/contexts/AuthContext';
import { LogoConnectMe } from '@/components/LogoConnectMe';

export default function Login() {
  const { register, handleSubmit } = useForm<SignInData>();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: SignInData) {
    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Connect me | Entrar </title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <LogoConnectMe className="hidden h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Acesse agora
            </h2>
            <p className="mt-2 text-sm text-gray-700">
             Ainda não tem conta?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Cadastra-se
              </Link>{' '}
              e encontre sua galera.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="mt-10 grid grid-cols-1 gap-y-8"
        >
          <TextField
            register={register}
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            register={register}
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
