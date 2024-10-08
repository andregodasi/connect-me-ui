import MainContainer from '@/containers/MainContainer';
import React from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/helpers/styleSheets';
import {
  socialNetworksBeautifulName,
  socialNetworksIcons,
} from '@/shared/enums/socialNetworkType.enum';
import { Typography } from 'antd';
import { SocialNetwork } from '@/shared/interfaces/ISocialNetwork';
import { transformAnchorURL } from '@/shared/utils/transforms/anchor';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@/services/axios';
import { getProfileSSR } from '@/services/user';
import { User } from '@/shared/interfaces/IUser';
import SendHail from '@/components/SendHail';
import { parseCookies } from 'nookies';

const { Title } = Typography;

function SocialLink({ className, href, children, icon: Icon }: any) {
  return (
    <li className={classNames(className, 'flex')}>
      <a
        href={transformAnchorURL(href)}
        target="_blank"
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-500"
        rel="noreferrer"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-500" />
        <span className="ml-4">{children}</span>
      </a>
    </li>
  );
}

interface profileDetailProps {
  profile: User;
}

const profileDetail: React.FC<profileDetailProps> = ({ profile }) => {
  return (
    <MainContainer>
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 xl:max-w-7xl">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="mx-auto !max-w-xs px-2.5 lg:mx-0 lg:max-w-none">
              <div className="aspect-square !max-w-xs rotate-3 rounded-2xl object-cover shadow-lg">
                <Image
                  width={600}
                  height={200}
                  className="aspect-square !max-w-xs rounded-2xl object-cover"
                  src={profile.photoUrl}
                  alt={profile.name}
                  sizes="(min-width: 1024px) 20rem, 20rem"
                />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 lg:order-first lg:row-span-2">
            <Title
              level={1}
              className="!text-4xl !font-bold !tracking-tight sm:!text-5xl"
            >
              {profile.name}
            </Title>

            {profile.title && (
              <p>
                Eu sou <span className="font-bold">{profile.title}</span>
              </p>
            )}
            {profile.nickname && (
              <p>
                Também pode me chamar por{' '}
                <span className="font-bold">{profile.nickname}</span>
              </p>
            )}
            <div className="mt-6 space-y-7 text-base text-zinc-600 ">
              {profile.aboutMe && (
                <div>
                  <Title level={5} className="!font-bold">
                    Sobre
                  </Title>
                  <p>{profile.aboutMe}</p>
                </div>
              )}

              {profile.companyName && profile.companyRole && (
                <div>
                  <Title level={5} className="!font-bold">
                    Informações profissionais
                  </Title>
                  <p>{`Atuo na ${profile.companyName}${
                    profile.companyRole ? `, como ${profile.companyRole}` : '.'
                  }`}</p>
                </div>
              )}

              {profile.degree && (
                <div>
                  <Title level={5} className="!font-bold">
                    Formação acadêmicas
                  </Title>
                  <p>{profile.degree}</p>
                </div>
              )}

              <div>
                <Title level={5} className="!font-bold">
                  Cursos, licenças e certificados
                </Title>
                <div className="flex flex-col gap-4">
                  {profile.knowledge?.map((knowledge) => (
                    <div key={knowledge.name}>
                      <small>{knowledge.name}</small>
                      <p>{knowledge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              {profile.socialNetworks?.map((socialNetwork: SocialNetwork) => (
                <SocialLink
                  key={socialNetwork.type}
                  href={socialNetwork.link}
                  icon={socialNetworksIcons[socialNetwork.type]}
                >
                  {`Me siga no ${
                    socialNetworksBeautifulName[socialNetwork.type]
                  }`}
                </SocialLink>
              ))}
              <div className="mt-8 border-t border-zinc-100 pt-8">
                <SendHail toUserUUID={profile.uuid} />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const identifier = ctx.params?.identifier || '';

  const { ['connect.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const data = await getProfileSSR(apiClient, identifier.toString());

  return {
    props: { profile: data },
  };
};

export default profileDetail;
