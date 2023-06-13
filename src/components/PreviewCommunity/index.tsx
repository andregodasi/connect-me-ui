import { MainContainerPreview } from '@/containers/MainContainerPreview';
import { Group } from '@/shared/interfaces/IGroup';
import React from 'react';
import CommunityPage from '../CommunityPage';

interface PreviewCommunityProps {
  group: Group;
  isFollower: boolean;
}

const PreviewCommunity: React.FC<PreviewCommunityProps> = ({
  group,
  isFollower,
}) => {
  return (
    <MainContainerPreview>
      <CommunityPage group={group} isFollower={isFollower} />
    </MainContainerPreview>
  );
};

export default PreviewCommunity;
