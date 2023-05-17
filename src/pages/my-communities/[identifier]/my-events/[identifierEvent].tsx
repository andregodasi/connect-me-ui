import { FormEvent } from '@/components/FormEvent';
import { GetServerSideProps } from 'next';

interface MyEventsUpdateProps {
  identifier: string;
  identifierEvent: string;
}

export default function MyEventsUpdate({
  identifier,
  identifierEvent,
}: MyEventsUpdateProps) {
  console.log(identifier, identifierEvent);
  return (
    <FormEvent
      identifier={identifier + ''}
      identifierEvent={identifierEvent + ''}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const identifier = ctx.params?.identifier || '';
  const identifierEvent = ctx.params?.identifierEvent || '';
  return {
    props: { identifier, identifierEvent },
  };
};
