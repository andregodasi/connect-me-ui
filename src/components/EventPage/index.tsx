import { Fragment, useContext, useState } from 'react';
import {
  CalendarDaysIcon,
  GlobeAltIcon,
  LinkIcon,
  MapIcon,
  MapPinIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import { Tab } from '@headlessui/react';
import { Event } from '@/shared/interfaces/IEvent';
import OrganizerProfile from '@/components/OrganizerProfile';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import {
  createSubscription,
  findByIdentifierEvent,
  unsubscribe,
} from '@/services/event';
import { AuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import placeholderImageEvent from '@/images/event-placeholder.webp';

import { formatWeekDateTime } from '@/shared/utils/transforms/dates';
import { EventType } from '@/shared/enums/event-type.enum';
import ParticipantListBox from '@/components/ParticipantListBox';
import { CommentsListBox } from '@/components/CommentsListBox';
import { ShareLinkButton } from '../ShareLinkButton';
import { useRouter } from 'next/router';
import { getWindow } from '@/shared/helpers/dom';

/* const faqs = [
  {
    question: 'What format are these icons?',
    answer:
      'The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.',
  },
  {
    question: 'Can I use the icons at different sizes?',
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
]; */
const license = {
  href: '#',
  summary:
    'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
  content: `
  <article class="markdown-body entry-content container-lg" itemprop="text"><h1 dir="auto">Código de Conduta</h1>
  <p dir="auto">Todos os participantes, palestrantes, patrocinadores e voluntários dos encontros precisam concordar com este código de conduta.
  Os organizadores vão reforçar que este código seja seguido durante todos os eventos. Esperamos a cooperação de todos os participantes
  para ajudar a garantir um ambiente seguro para todos.</p>
  <h2 dir="auto">Precisa de ajuda?</h2>
  <p dir="auto">Caso tenha alguma dúvida ou sugestão, você encontra todos os nossos contatos no site oficial da comunidade <a href="https://connect-me-dev.vercel.app/" rel="nofollow">https://connect-me-dev.vercel.app/</a></p>
  <h2 dir="auto">Versão rápida</h2>
  <p dir="auto">Todos os encontros da Connect me são dedicadas a fornecer uma experiência de encontros livres de assédio para
  todos, independentemente do sexo, identidade de gênero e expressão, idade, orientação sexual, deficiência, aparência física,
  tamanho corporal, cor de pele, etnia, religião (ou falta dela) ou escolhas de tecnologias. Nós não toleramos o assédio aos participantes,
  sob qualquer forma.
  Linguagem e imagens sexuais não são apropriadas em nenhum local dos eventos, incluindo palestras, workshops, festas, Twitter,
  Facebook e outras mídias on-line.
  Não é permitido aos participantes, voluntários, palestrantes, patrocinadores e a qualquer pessoa que não seja da organização
  mexer em equipamentos, entrar em salas fechadas, alterar configuração de palco ou assentos e utilizar o microfone sem permissão.</p>
  <p dir="auto">Os participantes que violarem estas regras poderão ser punidos ou expulsos do grupo e impedidos de participar de novos eventos e eventos afiliados
  <em>sem restituição</em>, a critério dos organizadores.</p>
  <h2 dir="auto">Versão detalhada</h2>
  <p dir="auto">Assédio inclui comentários verbais ofensivos relacionados ao gênero, identidade de gênero e expressão, idade, orientação
  sexual, deficiência, aparência física, tamanho corporal, cor de pele, etnia, religião, escolhas de tecnologias, imagens
  sexuais em espaços públicos, intimidação deliberada, perseguição, <em>stalking</em>, fotografias ou filmagens constrangedoras,
  contato físico inadequado e atenção sexual indesejada.</p>
  <p dir="auto">Os participantes que receberem uma solicitação para interromper qualquer comportamento de assédio devem fazê-lo imediatamente.</p>
  <p dir="auto">Se um participante se envolve em comportamento de assédio, os organizadores podem tomar todas as medidas que
  considerem adequadas, incluindo avisar o ofensor e expulsá-lo.</p>
  <p dir="auto">Caso seja assediado, perceba que alguém está sendo assediado ou tenha alguma dúvida, entre em contato com um dos organizadores
  do evento imediatamente. Não tome atitudes por conta própria e denuncie a situação de forma discreta, a fim de mantermos a
  segurança de todos, a ordem, e o sigilo.</p>
  <p dir="auto">Caso queira contribuir ou ache necessário mexer em algum equipamento que pertença ao local do evento como computadodores, mesas,
  cadeiras e poltronas, interfone, microfones, cozinha e seus utensílios e qualquer tipo de patrimônio que não lhe pertença deverá ser autorizado
  pela organização do evento, caso contrário será sujeito à cobrança de valores cabíveis a qualquer dano que seja encontrado.</p>
  <p dir="auto">Caso encontre qualquer objeto ou equipamento abandonado, perdido ou aparentemente sem dono a organizaçãpo deverá ser avisado imediatamente
  para anúncio no microfone.</p>
  <p dir="auto">A equipe organizadora estará disposta em todos os eventos a auxiliar os participantes no que for preciso para garantir a segurança de todos,
  Nós valorizamos a sua participação e queremos que aproveite o máximo possível, sinta-se à vontade e em segurança, e acima de tudo,
  respeitado.</p>
  <p dir="auto">Esperamos que os participantes sigam estas regras durante os encontros, além de eventos sociais relacionados, como after-parties,
  happy-hours ou jantares.</p>
  </article>
  `,
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const checkIsSubscribe = (event: Event, currentUserId: string): boolean => {
  return !!event?.users?.find(
    ({ user: subscribed }) => subscribed.uuid === currentUserId,
  );
};

interface EventDetailProps {
  event: Event;
  identifier: string;
  isPreview?: boolean;
}

export default function EventPage({
  event,
  identifier,
  isPreview = false,
}: EventDetailProps) {
  const router = useRouter();
  const [eventState, setEventState] = useState(event);
  const { user } = useContext(AuthContext);
  const [isSubscribeState, setIsSubscribeState] = useState<boolean>(
    !!event.isSubscribed,
  );

  const { refetch: refetchEvent } = useQuery(
    [`event-${identifier}`],
    () => findByIdentifierEvent(identifier),
    {
      staleTime: Infinity,
      enabled: false,
      onSuccess(data) {
        setEventState(data);
        setIsSubscribeState(checkIsSubscribe(data, user?.uuid || ''));
      },
    },
  );

  const { mutate: mutateSubscription } = useMutation(createSubscription, {
    onSuccess: () => {
      refetchEvent();
      toast.success('Inscrição realizada com sucesso!');
    },
  });

  const { mutate: mutateUnsubscribe } = useMutation(unsubscribe, {
    onSuccess: () => {
      refetchEvent();
      toast.success('Inscrição cancelada com sucesso!');
    },
  });

  async function handleSubscribe() {
    mutateSubscription(eventState?.uuid ? eventState.uuid : ``);
  }

  async function handleUnsubscribe() {
    mutateUnsubscribe(eventState?.uuid ? eventState.uuid : ``);
  }

  return (
    <div className="container mx-auto bg-white">
      <div className="mx-auto py-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
              <Image
                width={1200}
                height={1200}
                src={event.coverUrl || placeholderImageEvent}
                alt={event.name || ''}
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {event.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Nome da comunidade.
                </h2>
                {/* <p className="mt-2 text-sm text-gray-500">
                    Nos encontre assim {eventState.limitParticipants}
                  </p> */}
              </div>
            </div>

            <p className="mt-6 text-gray-500">{event.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {isSubscribeState ? (
                <>
                  <ShareLinkButton
                    link={
                      getWindow()?.location.href ||
                      `${router.basePath}/events/${event.slug}`
                    }
                  />
                  <button
                    onClick={() => handleUnsubscribe()}
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-50 py-3 px-8 text-base font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Não vou 😭
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleSubscribe()}
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 py-3 px-8 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Participar
                  </button>
                  <ShareLinkButton
                    link={
                      getWindow()?.location.href ||
                      `${router.basePath}/events/${event.slug}`
                    }
                  />
                </>
              )}
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Organizador</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <OrganizerProfile organizer={event.group?.users?.[0]?.user} />
              </div>
            </div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">
                Informações sobre o evento
              </h3>

              <div className="mt-4 flex flex-col gap-4">
                {event.type && (
                  <div className="mt-2 flex flex-col text-sm text-gray-500">
                    {event.type === EventType.REMOTE ? (
                      <div className="flex">
                        <GlobeAltIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        Online
                      </div>
                    ) : (
                      <div className="flex">
                        <MapPinIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        Presencial
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-2 flex flex-col text-sm text-gray-500">
                  <div className="flex">
                    <CalendarDaysIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    Data
                  </div>
                  <div>
                    Inicio:{' '}
                    <time
                      dateTime={
                        event.initialDate &&
                        formatWeekDateTime(event.initialDate)
                      }
                    >
                      {event.initialDate &&
                        formatWeekDateTime(event.initialDate)}
                    </time>
                  </div>
                  <div>
                    Fim:{' '}
                    <time
                      dateTime={
                        event.finishDate && formatWeekDateTime(event.finishDate)
                      }
                    >
                      {event.finishDate && formatWeekDateTime(event.finishDate)}
                    </time>
                  </div>
                </div>
                {event.address && (
                  <div className="mt-2 flex flex-col text-sm text-gray-500">
                    <div className="flex">
                      <MapIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      Endereço
                    </div>
                    <address className="not-italic">{event.address}</address>
                  </div>
                )}
                {event.link && (
                  <div className="mt-2 flex flex-col text-sm text-gray-500">
                    <div className="flex">
                      <LinkIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      Endereço eletronico do evento
                    </div>
                    <address className="not-italic">{eventState.link}</address>
                  </div>
                )}

                {!!event.users?.length && (
                  <div className="mt-2 flex flex-col text-sm text-gray-500">
                    <div className="flex">
                      <UserGroupIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      Quantidade máxima de inscritos
                    </div>
                    {eventState.limitParticipants}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <ParticipantListBox
                title="Inscritos"
                participants={eventState.users || []}
                isPreview={isPreview}
              />
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                      )
                    }
                  >
                    Mensagens
                  </Tab>
                  {/*  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                      )
                    }
                  >
                    FAQ
                  </Tab> */}
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                      )
                    }
                  >
                    Código de conduta
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="-mb-10">
                  {event.uuid && (
                    <CommentsListBox
                      uuid={event.uuid}
                      type="event"
                      isPreview={isPreview}
                    />
                  )}
                </Tab.Panel>

                {/*  <Tab.Panel className="text-sm text-gray-500">
                  <h3 className="sr-only">Frequently Asked Questions</h3>

                  <dl>
                    {faqs.map((faq) => (
                      <Fragment key={faq.question}>
                        <dt className="mt-10 font-medium text-gray-900">
                          {faq.question}
                        </dt>
                        <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                          <p>{faq.answer}</p>
                        </dd>
                      </Fragment>
                    ))}
                  </dl>
                </Tab.Panel> */}

                <Tab.Panel className="pt-10">
                  <h3 className="sr-only">Código de conduta</h3>

                  <div
                    className="prose prose-sm max-w-none text-gray-500"
                    dangerouslySetInnerHTML={{ __html: license.content }}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
