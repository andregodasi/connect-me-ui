import Image from 'next/image';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import { Container } from '@/components/Container';
import AccessImage from '@/images/svg/access.svg';
import CommunityImage from '@/images/svg/discussion-rafiki.svg';
import ConferenceImage from '@/images/svg/conference-rafiki.svg';

import {
  BoltIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';

const features = [
  {
    name: 'Acesse',
    summary: 'Acesse rápido e fácil, com apenas um clique!',
    description: `Mergulhe em eventos incríveis!
      Participe de comunidades: Conecte-se com pessoas apaixonadas na Connect Me!
      Frequente eventos: Expanda seus horizontes participando dos melhores eventos da Connect Me!`,
    image: AccessImage,
    icon: () => <RocketLaunchIcon className="w-6" color="#fff" />,
  },
  {
    name: 'Participe da comunidade',
    summary:
      'Conheça cultura incríveis, compartilhe conhecimento e faça conexões.',
    description:
      'Junte-se a comunidades ativas na Connect Me, compartilhe interesses comuns e faça conexões significativas com pessoas que compartilham sua paixão por aprendizado e desenvolvimento.',
    image: CommunityImage,
    icon: () => <UserGroupIcon className="w-6" color="#fff" />,
  },
  {
    name: 'Frequente eventos',
    summary: 'Saia da rotida, participe de eventos e conheça novas pessoas.',
    description:
      'Explore uma ampla gama de eventos disponíveis, desde palestras inspiradoras até workshops práticos, e enriqueça seu conhecimento participando ativamente dessas experiências enriquecedoras.',
    image: ConferenceImage,
    icon: () => <BoltIcon className="w-6" color="#fff" />,
  },
];

function Feature({ feature, isActive, className, ...props }: any) {
  return (
    <div
      className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')}
      {...props}
    >
      <div
        className={clsx(
          'flex h-9 w-9 items-center justify-center rounded-lg',
          isActive ? 'bg-blue-600' : 'bg-slate-500',
        )}
      >
        <feature.icon />
      </div>
      <h3
        className={clsx(
          'mt-6 text-sm font-medium',
          isActive ? 'text-blue-600' : 'text-slate-600',
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 font-display text-xl text-slate-900">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-slate-600">{feature.description}</p>
    </div>
  );
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.name}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-[20rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10 md:w-[30rem]">
              <Image
                width={200}
                height={200}
                className="w-full  md:w-[30rem]"
                src={feature.image}
                alt={feature.name}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesDesktop() {
  return (
    <Tab.Group as="div" className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <Tab.List className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.name}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </Tab.List>
          <Tab.Panels className="relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <Tab.Panel
                  static
                  key={feature.name}
                  className={clsx(
                    'px-5 transition duration-500 ease-in-out [&:not(:focus-visible)]:focus:outline-none',
                    featureIndex !== selectedIndex && 'opacity-60',
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="h-full w-[28rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                    <Image
                      width={200}
                      height={200}
                      className="h-full w-full"
                      src={feature.image}
                      alt=""
                    />
                  </div>
                </Tab.Panel>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10" />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  );
}

export function SecondaryFeatures() {
  return (
    <section
      id="plataform"
      aria-label="Features for simplifying everyday business tasks"
      className="pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Sobre nossa plataforma.
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Explore o fluxo da plataforma Connect Me e descubra um mundo de
            oportunidades em eventos. Acesse a plataforma, participe de
            comunidades engajadas e frequente eventos incríveis para expandir
            seus conhecimentos e conexões.
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  );
}
