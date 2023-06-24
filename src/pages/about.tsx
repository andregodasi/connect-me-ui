import { CameraIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import creatorGray from '@/images/avatars/andre_goncalves_gray.png';
import { SimpleContainer } from '@/containers/SimpleContainer';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import MainContainer from '@/containers/MainContainer';

interface AboutProps {
  isAuthenticated: boolean;
}

const Content = () => (
  <div className="overflow-hidden bg-white">
    <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="absolute bottom-0 left-3/4 top-0 hidden w-screen bg-gray-50 lg:block" />
      <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
        <div>
          <h2 className="text-lg font-semibold text-blue-600">
            Um pouco sobre nós
          </h2>
          <h3 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Connect Me
          </h3>
        </div>
      </div>
      <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="relative lg:col-start-2 lg:row-start-1">
          <svg
            className="absolute right-0 top-0 -mr-20 -mt-20 hidden lg:block"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
            />
          </svg>
          <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
            <figure>
              <div className="aspect-h-7 aspect-w-12 lg:aspect-none">
                <Image
                  className="rounded-lg object-cover object-center shadow-lg"
                  src={creatorGray}
                  alt="André Gonçalves da Silva"
                  width={1184}
                  height={1376}
                />
              </div>
              <figcaption className="mt-3 flex text-sm text-gray-500">
                <CameraIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-2">André Gonçalves</span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <div className="mx-auto max-w-prose text-base lg:max-w-none">
            <p className="pb-6 indent-8 text-lg text-gray-500">
              Somos uma plataforma de eventos que surge como resultado do
              trabalho de conclusão de curso da Especialização em
              Desenvolvimento Ágil de Software da renomada Universidade Federal
              do Paraná. Desenvolvida pelo programador André Gonçalves, nossa
              plataforma utiliza as poderosas tecnologias ReactJS, Next.js e
              Node.js para oferecer uma experiência excepcional aos seus
              usuários.
            </p>
            <p className="pb-6 indent-8 text-lg text-gray-500">
              Acreditamos que eventos são momentos únicos de aprendizado,
              networking e conexões significativas. Com base nessa premissa, a
              Connect Me foi projetada para reunir pessoas apaixonadas por
              conhecimento e possibilitar a descoberta de eventos relevantes,
              independentemente de sua área de interesse.
            </p>
            <p className="pb-6 indent-8 text-lg text-gray-500">
              Nossa missão é simplificar e aprimorar a maneira como os eventos
              são organizados e vivenciados. E para garantir o acesso amplo e
              democrático, a Connect Me será sempre gratuita para a comunidade.
              Acreditamos que compartilhar conhecimento e cultura é essencial
              para o desenvolvimento coletivo e, por isso, não queremos impor
              barreiras financeiras aos participantes.
            </p>

            <p className="pb-6 indent-8 text-lg text-gray-500">
              Estamos comprometidos em fornecer uma plataforma confiável, segura
              e de fácil utilização. Acreditamos que eventos são oportunidades
              únicas para aprender, crescer e se conectar com outros
              profissionais. Portanto, desenvolvemos a Connect Me com o objetivo
              de simplificar o processo de descoberta de eventos, permitindo que
              você encontre, participe e desfrute de experiências
              enriquecedoras.
            </p>
            <p className="pb-6 indent-8 text-lg text-gray-500">
              Nosso foco principal é compartilhar conhecimento e cultura.
              Queremos proporcionar um espaço onde palestrantes e participantes
              possam se conectar, trocar ideias e contribuir para o
              desenvolvimento da comunidade. Acreditamos que cada evento é uma
              oportunidade de aprendizado e crescimento, tanto para os
              palestrantes quanto para os participantes.
            </p>
            <p className="pb-6 indent-8 text-lg text-gray-500">
              Por meio do uso do ReactJS, uma biblioteca JavaScript de código
              aberto, construímos interfaces modernas e interativas que tornam a
              navegação pela plataforma intuitiva e agradável. O Next.js, um
              framework React de renderização do lado do servidor, garante um
              desempenho excelente e uma experiência de usuário fluida,
              independentemente do dispositivo utilizado. Por fim, o Node.js, um
              ambiente de tempo de execução JavaScript, proporciona uma base
              sólida e escalável para o funcionamento de toda a plataforma.
            </p>
            <p className="pb-6 indent-8 text-lg text-gray-500">
              O Connect Me é o resultado do esforço e dedicação de André
              Gonçalves, um profissional apaixonado pelo desenvolvimento de
              software. Sua expertise e habilidades técnicas avançadas foram
              essenciais para a criação dessa plataforma, que conecta pessoas e
              eventos de maneira eficiente e eficaz.
            </p>
            <p className="pb-6 indent-8 text-lg text-gray-500">
              Convidamos você a explorar a Connect Me, conhecer nossos recursos
              e desfrutar de uma experiência única na descoberta de eventos.
              Junte-se a nós e comece a criar memórias inspiradoras enquanto
              construímos uma comunidade de aprendizado e conexões
              significativas. Estamos entusiasmados para tê-lo a bordo!
            </p>
            <p className="pb-6 text-lg text-gray-500">Equipe Connect Me 🤘</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function About({ isAuthenticated }: AboutProps) {
  if (isAuthenticated) {
    return (
      <MainContainer>
        <Content />
      </MainContainer>
    );
  }
  return (
    <SimpleContainer>
      <Content />
    </SimpleContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['connect.token']: token } = parseCookies(ctx);

  return {
    props: { isAuthenticated: !!token },
  };
};
