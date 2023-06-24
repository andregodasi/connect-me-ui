import { MainContainerPreview } from '@/containers/MainContainerPreview';
import { Group } from '@/shared/interfaces/IGroup';
import React from 'react';
import CommunityPage from '../CommunityPage';

interface PreviewCommunityProps {
  group: Group;
  isFollower: boolean;
}

const PreviewCommunity: React.FC<PreviewCommunityProps> = ({ group }) => {
  return (
    <MainContainerPreview>
      <CommunityPage group={group} isPreview={true} />
    </MainContainerPreview>
  );
};

export default PreviewCommunity;
