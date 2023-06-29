import { FormEvent } from '@/components/FormEvent';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

interface MyEventsUpdateProps {
  identifier: string;
  identifierEvent: string;
}

export default function MyEventsUpdate({
  identifier,
  identifierEvent,
}: MyEventsUpdateProps) {
  return (
    <FormEvent
      identifier={identifier + ''}
      identifierEvent={identifierEvent + ''}
    />
  );
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
  const identifierEvent = ctx.params?.identifierEvent || '';
  return {
    props: { identifier, identifierEvent },
  };
};
