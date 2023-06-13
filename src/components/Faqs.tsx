import Image from 'next/future/image';

import { Container } from '@/components/Container';
import backgroundImage from '@/images/background-faqs.jpg';

const faqs = [
  [
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
  ],
  [
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
  ],
  [
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
    },
    {
      question:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      answer:
        'Adipiscing enim eu turpis egestas. Amet massa vitae tortor condimentum. A cras semper auctor neque vitae tempus. Volutpat lacus laoreet non curabitur. Platea dictumst vestibulum rhoncus est pellentesque.',
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
        alt=""
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
            {` Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.`}
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
