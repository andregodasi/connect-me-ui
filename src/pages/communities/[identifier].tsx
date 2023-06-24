import MainContainer from '@/containers/MainContainer';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@/services/axios';
import { Group } from '@/shared/interfaces/IGroup';
import CommunityPage from '@/components/CommunityPage';

interface CommunityDetailProps {
  group: Group;
  isFollower: boolean;
}

export default function CommunityDetail({ group }: CommunityDetailProps) {
  return (
    <MainContainer>
      <CommunityPage group={group} />
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { identifier } = ctx.query;

  const apiClient = getAPIClient(ctx);

  const { data } = await apiClient.get(`/group/${identifier}`);
  const group: Group = data;

  return {
    props: { group },
  };
};
