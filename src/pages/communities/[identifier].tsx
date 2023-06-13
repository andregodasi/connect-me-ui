import { Fragment, useContext, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Tab } from '@headlessui/react';
import MainContainer from '@/containers/MainContainer';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@/services/axios';
import { Group } from '@/shared/interfaces/IGroup';
import OrganizerProfile from '@/components/OrganizerProfile';
import ParticipantProfile from '@/components/ParticipantProfile';
import { EventSmallCard } from '@/components/EventSmallCard';
import { useMutation, useQuery } from 'react-query';
import {
  findByIdentifierGroup,
  followGrpup,
  unfollowGroup,
} from '@/services/group';
import { toast } from 'react-toastify';
import { AuthContext } from '@/contexts/AuthContext';
import { getCurrentUser } from '@/shared/utils/token';
import CommunityPage from '@/components/CommunityPage';

interface CommunityDetailProps {
  group: Group;
  isFollower: boolean;
}

const checkIsFollower = (group: Group, currentUserId: string): boolean => {
  return !!group?.users?.find(
    ({ user: follower }) => follower.uuid === currentUserId
  );
};

export default function CommunityDetail({
  group,
  isFollower,
}: CommunityDetailProps) {
  return (
    <MainContainer>
      <CommunityPage group={group} isFollower={isFollower} />
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { identifier } = ctx.query;

  const apiClient = getAPIClient(ctx);

  const { data } = await apiClient.get(`/group/${identifier}`);
  const group: Group = data;
  const currentUser = getCurrentUser(ctx);
  const isFollower = checkIsFollower(group, currentUser?.sub);
  return {
    props: { group, isFollower },
  };
};
