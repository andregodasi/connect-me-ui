import { FormGroup } from '@/components/FormGroup';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

interface MyCommunitiesUpdateProps {
  identifier: string;
}

export default function MyCommunitiesUpdate({
  identifier,
}: MyCommunitiesUpdateProps) {
  return <FormGroup identifier={identifier + ''} />;
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
