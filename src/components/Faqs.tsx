import Image from 'next/image';

import { Container } from '@/components/Container';
import backgroundImage from '@/images/background-faqs.jpg';

const faqs = [
  [
    {
      question: 'Como faço para me inscrever em um evento?',
      answer:
        'Ao encontrar um evento de seu interesse, clique nele para ver mais detalhes. você encontratá um botão de se inscrever. Clique nele e sua inscrição será realizada.',
    },
    {
      question: 'Existe algum custo para participar de eventos? ',
      answer:
        ' Isso depende do evento específico. Alguns eventos podem ser gratuitos, enquanto outros podem exigir uma taxa de participação. Verifique os detalhes do evento para obter informações sobre os custos envolvidos, se houver.',
    },
    {
      question: 'Como posso cancelar minha inscrição em um evento?',
      answer:
        'Para cancelar sua inscrição em um evento, acesse a página do evento em nosso site e procure o botão de "Não vou". Clique nele e sua inscrição será cancelada.',
    },
    {
      question: 'Existe algum custo para criar uma comunidade?',
      answer:
        'Não, criar uma comunidade é totalmente gratuito. Você pode criar quantas comunidades quiser.',
    },
  ],
  [
    {
      question: 'Existe número máximo de participantes para um evento online?',
      answer: 'Sim, o número máximo é estipulado pelo criador do evento.',
    },
    {
      question: 'Meus dados estão seguros?',
      answer:
        'Sim, seus dados estão seguros. Nós não compartilhamos seus dados com ninguém.',
    },
    {
      question:
        'Meus dados são compartilhados com as empresas que estão contratando?',
      answer:
        'Não, seus dados não são compartilhados com nenhuma empresa. Apenas você pode compartilhar seus dados com as empresas que você deseja.',
    },
  ],
  [
    {
      question: 'Meus dados são usados na plataforma para outros fins?',
      answer:
        'Não, seus dados são usados apenas para a plataforma. Nós não compartilhamos seus dados com ninguém.',
    },
    {
      question: 'Os dados do minha comunidade são publicos? ',
      answer:
        'Sim, os dados da sua comunidade são públicos. Qualquer pessoa pode ver os dados da sua comunidade.',
    },
    {
      question: 'Os dados do meu evento são publicos?',
      answer:
        'Sim, os dados do seu evento são públicos. Qualquer pessoa pode ver os dados do seu evento.',
    },
    {
      question:
        'Quando o plano para emrpesas será lançado? E qual será o valor?',
      answer:
        'O plano para empresas será lançado em breve. O valor ainda não foi definido.',
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt="Seção de perguntas frequentes"
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Encontre as respostas que você precisa! Aqui, reunimos as perguntas
            mais comuns sobre nossa plataforma e eventos para ajudar a
            esclarecer suas dúvidas.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
