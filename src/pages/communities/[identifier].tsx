import { Fragment } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Tab } from '@headlessui/react';
import MainContainer from '@/containers/MainContainer';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@/services/axios';
import { Group } from '@/shared/interfaces/IGroup';
import OrganizerProfile from '@/components/OrganizerProfile';
import ParticipantProfile from '@/components/ParticipantProfile';
import { EventSmallCard } from '@/components/EventSmallCard';

const product = {
  name: 'Application UI Icon Pack',
  version: { name: '1.0', date: 'June 5, 2021', datetime: '2021-06-05' },
  price: '$220',
  description:
    'The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.',
  highlights: [
    '200+ SVG icons in 3 unique styles',
    'Compatible with Figma, Sketch, and Adobe XD',
    'Drawn on 24 x 24 pixel grid',
  ],
  imageSrc:
    'https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg',
  imageAlt:
    'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
};
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: 'July 16, 2021',
      datetime: '2021-07-16',
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: 'July 12, 2021',
      datetime: '2021-07-12',
      author: 'Hector Gibbons',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    // More reviews...
  ],
};
const faqs = [
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
  // More FAQs...
];
const license = {
  href: '#',
  summary:
    'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
  content: `
  <article class="markdown-body entry-content container-lg" itemprop="text"><h1 dir="auto"><a id="user-content-código-de-conduta" class="anchor" aria-hidden="true" href="#código-de-conduta"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Código de Conduta</h1>
  <p dir="auto">Todos os participantes, palestrantes, patrocinadores e voluntários dos encontros precisam concordar com este código de conduta.
  Os organizadores vão reforçar que este código seja seguido durante todos os eventos. Esperamos a cooperação de todos os participantes
  para ajudar a garantir um ambiente seguro para todos.</p>
  <h2 dir="auto"><a id="user-content-precisa-de-ajuda" class="anchor" aria-hidden="true" href="#precisa-de-ajuda"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Precisa de ajuda?</h2>
  <p dir="auto">Caso tenha alguma dúvida ou sugestão, você encontra todos os nossos contatos no site oficial da comunidade <a href="http://devpp.tech" rel="nofollow">http://devpp.tech</a></p>
  <h2 dir="auto"><a id="user-content-versão-rápida" class="anchor" aria-hidden="true" href="#versão-rápida"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Versão rápida</h2>
  <p dir="auto">Todos os encontros da Dev PP são dedicadas a fornecer uma experiência de encontros livres de assédio para
  todos, independentemente do sexo, identidade de gênero e expressão, idade, orientação sexual, deficiência, aparência física,
  tamanho corporal, cor de pele, etnia, religião (ou falta dela) ou escolhas de tecnologias. Nós não toleramos o assédio aos participantes,
  sob qualquer forma.
  Linguagem e imagens sexuais não são apropriadas em nenhum local dos eventos, incluindo palestras, workshops, festas, Twitter,
  Facebook e outras mídias on-line.
  Não é permitido aos participantes, voluntários, palestrantes, patrocinadores e a qualquer pessoa que não seja da organização
  mexer em equipamentos, entrar em salas fechadas, alterar configuração de palco ou assentos e utilizar o microfone sem permissão.</p>
  <p dir="auto">Os participantes que violarem estas regras poderão ser punidos ou expulsos do grupo e impedidos de participar de novos eventos e eventos afiliados
  <em>sem restituição</em>, a critério dos organizadores.</p>
  <h2 dir="auto"><a id="user-content-versão-detalhada" class="anchor" aria-hidden="true" href="#versão-detalhada"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Versão detalhada</h2>
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
  <p dir="auto">Este Código de Conduta foi traduzido e adaptado de: <a href="http://confcodeofconduct.com/" rel="nofollow">confcodeofconduct.com</a><br>
  Esta obra está licenciada sob <a href="http://creativecommons.org/licenses/by/3.0/deed.en_US" rel="nofollow">Creative Commons Attribution 3.0 Unported License</a></p>
  </article>
  `,
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface CommunityDetailProps {
  group: Group;
}

export default function CommunityDetail({ group }: CommunityDetailProps) {
  return (
    <MainContainer>
      <div className="container mx-auto bg-white">
        <div className="mx-auto py-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            {/* Product image */}
            <div className="lg:col-span-4 lg:row-end-1">
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src="https://www.ambevtech.com.br/sites/g/files/wnfebl5782/files/styles/webp/public/Fotos%20Ambev%20Tech%20%26%20Cheers/AMBEV-112.jpg.webp?itok=yofkEeM3"
                  alt={group.name}
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Product details */}
            <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {group.name}
                  </h1>

                  <h2 id="information-heading" className="sr-only">
                    Nome da comunidade.
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Nos encontre assim {group.slug}
                  </p>
                </div>

                <div>
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? 'text-yellow-400'
                            : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                </div>
              </div>

              <p className="mt-6 text-gray-500">{group.description}</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Seguir
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 py-3 px-8 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Compartilhar
                </button>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Organizador
                </h3>
                <div className="prose prose-sm mt-4 text-gray-500">
                  <OrganizerProfile />
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Participantes
                </h3>
                <div className="mt-4 flex flex-wrap gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
                    <div key={key}>
                      <ParticipantProfile />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Compartilhar
                </h3>
                <ul role="list" className="mt-4 flex items-center space-x-6">
                  <li>
                    <a
                      href="#"
                      className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Share on Facebook</span>
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Share on Instagram</span>
                      <svg
                        className="h-6 w-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Share on Twitter</span>
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </li>
                </ul>
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
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                        )
                      }
                    >
                      Mensagens
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                        )
                      }
                    >
                      FAQ
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                        )
                      }
                    >
                      Código
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="-mb-10">
                    <h3 className="sr-only">Customer Reviews</h3>

                    {reviews.featured.map((review, reviewIdx) => (
                      <div
                        key={review.id}
                        className="flex space-x-4 text-sm text-gray-500"
                      >
                        <div className="flex-none py-10">
                          <img
                            src={review.avatarSrc}
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-100"
                          />
                        </div>
                        <div
                          className={classNames(
                            reviewIdx === 0 ? '' : 'border-t border-gray-200',
                            'py-10'
                          )}
                        >
                          <h3 className="font-medium text-gray-900">
                            {review.author}
                          </h3>
                          <p>
                            <time dateTime={review.datetime}>
                              {review.date}
                            </time>
                          </p>

                          <div className="mt-4 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  review.rating > rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300',
                                  'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">
                            {review.rating} out of 5 stars
                          </p>

                          <div
                            className="prose prose-sm mt-4 max-w-none text-gray-500"
                            dangerouslySetInnerHTML={{ __html: review.content }}
                          />
                        </div>
                      </div>
                    ))}
                  </Tab.Panel>

                  <Tab.Panel className="text-sm text-gray-500">
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
                  </Tab.Panel>

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
        {/* Related products */}
        <div className="mx-auto mt-24 max-w-2xl sm:mt-32 lg:max-w-none">
          <div className="flex items-center justify-between space-x-4">
            <h2 className="text-lg font-medium text-gray-900">Evento</h2>
            <a
              href="#"
              className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Veja todos
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {group?.events?.map(({ name, uuid }) => (
              <EventSmallCard name={name} uuid={uuid} />
            ))}
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { identifier } = ctx.query;

  const apiClient = getAPIClient(ctx);

  const { data } = await apiClient.get(`/group/${identifier}`);
  const group: Group = data;
  return {
    props: { group },
  };
};
