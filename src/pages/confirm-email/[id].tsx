/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { Button, Typography } from 'antd';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import bugFix from '@/images/svg/bug_fixing.svg';

import { SimpleContainer } from '@/containers/SimpleContainer';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAPIClient } from '@/services/axios';
import { confirmEmailSSR } from '@/services/user';

const { Title, Paragraph } = Typography;

interface ConfirmEmailProps {
  isConfirmedEmail: boolean;
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({
  isConfirmedEmail = false,
}) => {
  const router = useRouter();

  if (isConfirmedEmail) {
    return (
      <SimpleContainer>
        <div className="overflow-hidden bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Yes! Email Confirmado!
                </h2>
                <p className="mt-6 text-xl leading-8 text-gray-600">
                  Seu email foi confirmado e agora você está oficialmente
                  dentro! Aqui no Connect me, estamos anciosos para te receber!
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Agora é hora de aproveitar todas as vantagens que oferecemos.
                  Conecte-se, faça amigos e expanda seus horizontes. Aqui você
                  poderá fazer networking com pessoas incríveis, participar de
                  vãrios eventos e mergulhar em novas culturas!
                </p>
                <div className="mt-10 flex">
                  <Link href="/login">
                    <Button
                      shape="round"
                      size="large"
                      type="primary"
                      htmlType="submit"
                    >
                      Entrar na plataforma{' '}
                      <span aria-hidden="true" className="ml-2">
                        &rarr;
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <img
                    src="https://s3-dev-connect-me.s3.sa-east-1.amazonaws.com/assets/placeholder-event-13-small.jpg"
                    alt=""
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <img
                      src="https://s3-dev-connect-me.s3.sa-east-1.amazonaws.com/assets/placeholder-event-3-small.jpg"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      src="https://s3-dev-connect-me.s3.sa-east-1.amazonaws.com/assets/placeholder-event-1-small.jpg"
                      alt=""
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      src="https://s3-dev-connect-me.s3.sa-east-1.amazonaws.com/assets/placeholder-event-7-small.jpg"
                      alt=""
                      className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SimpleContainer>
    );
  }
  return (
    <SimpleContainer>
      <div className="bg-white">
        <div className="px-6 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Title level={2}>Não conseguimos confirmar seu email</Title>
            <div className="flex justify-center">
              <Image
                src={bugFix}
                alt="error"
                width={400}
                height={600}
                unoptimized
              />
            </div>

            <Paragraph className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Houve um erro inesperado ao tentar confirmar seu email. Por favor,
              tente novamente mais tarde.
            </Paragraph>
            <div className="mt-10 flex justify-center gap-2">
              <Button
                shape="round"
                size="large"
                type="text"
                onClick={() => router.back()}
              >
                Voltar
              </Button>
              <Link href="/">
                <Button
                  shape="round"
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SimpleContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id || '';
  if (!id) {
    return {
      props: { isConfirmedEmail: false },
    };
  }
  const apiClient = getAPIClient();
  try {
    await confirmEmailSSR(apiClient, id.toString());
    return {
      props: { isConfirmedEmail: true },
    };
  } catch {
    return {
      props: { isConfirmedEmail: false },
    };
  }
};

export default ConfirmEmail;
