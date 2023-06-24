import Link from 'next/link';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { formatWeekDateTime } from '@/shared/utils/transforms/dates';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

const EventCard: React.FC = ({
  uuid,
  name,
  description,
  initialDate,
  group,
  coverUrl,
  isSubscribed,
}: any) => {
  return (
    <div className="relative w-full max-w-md md:flex md:max-w-full">
      <Link
        href={`/events/${uuid}`}
        className="absolute top-0 right-0 left-0 bottom-0"
      />
      <div
        className="h-48 flex-none overflow-hidden rounded-t border border-gray-400 bg-cover bg-center md:h-auto md:w-48 md:rounded-t-none md:rounded-l"
        title={name}
        style={{ backgroundImage: `url(${coverUrl})` }}
      ></div>
      <div className="flex w-full flex-col justify-between rounded-b border-r border-b border-l border-gray-400 bg-white p-4 leading-normal md:rounded-b-none md:rounded-r md:border-l-0 md:border-t md:border-gray-400">
        <div className="mb-8">
          <div className="flex justify-between">
            <p className="flex items-center text-sm text-gray-600">
              <CalendarDaysIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />

              {formatWeekDateTime(initialDate)}
            </p>
            {isSubscribed && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
                <CheckCircleIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                  aria-hidden="true"
                />
                Inscrito
              </span>
            )}
          </div>
          <div className="mb-2 text-xl font-bold text-gray-900">{name}</div>
          <p className="ellipis-3 text-base text-gray-700" title={description}>
            {description}
          </p>
        </div>
        <div className="flex items-center">
          <Image
            width={200}
            height={200}
            sizes="auto"
            className="mr-4 h-10 w-10 rounded-full border border-gray-400 object-cover"
            src={group?.coverUrl}
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="leading-none text-gray-900">Comunidade</p>
            <p className="text-gray-600">{group?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
