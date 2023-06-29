import { FormEvent } from '@/components/FormEvent';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

interface MyEventsCreateProps {
  identifier: string;
}

export default function MyEventsCreate({ identifier }: MyEventsCreateProps) {
  return <FormEvent identifier={identifier + ''} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  return {
    props: { identifier },
  };
};
