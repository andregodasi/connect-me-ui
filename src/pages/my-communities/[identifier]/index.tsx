import { FormGroup } from '@/components/FormGroup';
import { GetServerSideProps } from 'next';

interface MyCommunitiesUpdateProps {
  identifier: string;
}

export default function MyCommunitiesUpdate({
  identifier,
}: MyCommunitiesUpdateProps) {
  console.log(identifier);
  return <FormGroup identifier={identifier + ''} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const identifier = ctx.params?.identifier || '';
  return {
    props: { identifier },
  };
};
