import MainContainer from '@/containers/MainContainer';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@/services/axios';
import { Event } from '@/shared/interfaces/IEvent';
import EventPage from '@/components/EventPage';
import { parseCookies } from 'nookies';

interface EventDetailProps {
  event: Event;
  identifier: string;
}

export default function EventDetail({ event, identifier }: EventDetailProps) {
  return (
    <MainContainer>
      <EventPage event={event} identifier={identifier} />
    </MainContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { identifier } = ctx.query;

  const { ['connect.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const apiClient = getAPIClient(ctx);

  const { data } = await apiClient.get(`/event/${identifier}`);
  const event: Event = data;
  return {
    props: { event, identifier },
  };
};
