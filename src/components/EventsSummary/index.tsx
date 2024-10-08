import { Event } from '@/shared/interfaces/IEvent';
import { formatWeekDateTime } from '@/shared/utils/transforms/dates';
import Image from 'next/image';
import Link from 'next/link';
import placeholderImage from '@/images/screen-0.webp';
import { Skeleton } from 'antd';
import { Placeholder } from '../Placeholder';
import lazyEvent from '@/images/svg/lazy_event.svg';
interface EventsSummaryProps {
  events: Event[] | undefined;
  isLoading: boolean;
}

export function EventsSummary({ events, isLoading }: EventsSummaryProps) {
  const isShowEmpty = !isLoading && (!events || events.length === 0);
  const isShowList = !isLoading && events && events.length > 0;

  return (
    <div className="w-full rounded-lg border bg-white py-4 shadow-md sm:py-8">
      <div className="mb-4 flex items-center justify-between px-4 sm:px-8">
        <h5 className="text-xl font-bold leading-none text-gray-900 ">
          Seus próximos eventos
        </h5>
        {isShowList && (
          <Link
            href="/dashboard?isSubscribed=true"
            className="text-sm font-medium text-blue-600 hover:underline "
          >
            Veja todos
          </Link>
        )}
      </div>
      <div className="px-4 sm:px-8">
        <hr />
      </div>

      {isLoading && (
        <ul role="list" className="-mb-8">
          <li className="block px-4 pt-8 pb-4 hover:bg-gray-50 sm:px-8">
            <Skeleton
              active
              paragraph={{ rows: 3 }}
              avatar={{ size: 40, shape: 'square', className: '!rounded-md' }}
            />
          </li>
        </ul>
      )}

      {isShowEmpty && (
        <Placeholder
          image={lazyEvent}
          alt="Você não esta inscrito em nenhum evento."
          width={260}
          height={200}
          descriptionTop="Você não esta inscrito em nenhum evento."
          descriptionBottom="Deixe a preguiça de lado e inscreva-se em um evento!"
        />
      )}

      {isShowList && (
        <ul role="list" className="-mb-8">
          {events?.map((event, activityItemIdx) => (
            <li key={event.uuid}>
              <Link
                href={`/events/${event.uuid}`}
                className="block px-4 pt-8 pb-4 hover:bg-gray-50 sm:px-8"
              >
                <div className="relative pb-8">
                  {activityItemIdx !== events.length - 1 ? (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <Image
                        width={200}
                        height={200}
                        className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-400 object-cover ring-8 ring-white"
                        src={event.coverUrl || placeholderImage}
                        alt={event.name || ''}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {event.name}
                          </div>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {event.initialDate &&
                            formatWeekDateTime(event.initialDate)}
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p className="ellipis-3">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
