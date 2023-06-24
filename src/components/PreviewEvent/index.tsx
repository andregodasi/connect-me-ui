import { MainContainerPreview } from '@/containers/MainContainerPreview';
import React from 'react';
import EventPage from '../EventPage';
import { Event } from '@/shared/interfaces/IEvent';

interface PreviewEventProps {
  event: Event;
}

const PreviewEvent: React.FC<PreviewEventProps> = ({ event }) => {
  return (
    <MainContainerPreview>
      <EventPage event={event} identifier={event.uuid || ''} isPreview={true} />
    </MainContainerPreview>
  );
};

export default PreviewEvent;
