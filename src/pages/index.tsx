import Head from 'next/head';

/* import { CallToAction } from '@/components/CallToAction'; */
import { Faqs } from '@/components/Faqs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Pricing } from '@/components/Pricing';
import { PrimaryFeatures } from '@/components/PrimaryFeatures';
import { SecondaryFeatures } from '@/components/SecondaryFeatures';
/* import { Testimonials } from '@/components/Testimonials'; */
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Home() {
  return (
    <>
      <Head>
        <title>Connect me </title>
        <meta
          name="Connect me"
          content="Plataforma de comunidades e eventos online e presencial."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        {/* <CallToAction />
        <Testimonials /> */}

        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // eslint-disable-next-line no-useless-computed-key
  const { ['connect.token']: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
