import { FormEvent } from '@/components/FormEvent';
import { GetServerSideProps } from 'next';

interface MyEventsCreateProps {
  identifier: string;
}

export default function MyEventsCreate({ identifier }: MyEventsCreateProps) {
  return <FormEvent identifier={identifier + ''} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const identifier = ctx.params?.identifier || '';

  return {
    props: { identifier },
  };
};
