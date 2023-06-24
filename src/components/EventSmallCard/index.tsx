import Image from 'next/image';
import React from 'react';
import { Event } from '@/shared/interfaces/IEvent';
import Link from 'next/link';
import placeholderImageEvent from '@/images/event-placeholder.webp';

export const EventSmallCard: React.FC<{
  event: Event;
}> = ({ event }) => {
  return (
    <div key={event.uuid} className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
        <Image
          width={600}
          height={400}
          src={event.coverUrl || placeholderImageEvent}
          alt={event.name || ''}
          className="!h-full object-cover object-center"
        />
        <div
          className="absolute bottom-0 right-0 left-0 top-0 flex h-full w-full items-end p-4 opacity-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
            Veja mais!
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
        <h3>
          <Link href={`/events/${event.uuid}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {event.name}
          </Link>
        </h3>
      </div>
      <p className="ellipis-2 mt-1 text-sm text-gray-500">
        {event.description}
      </p>
    </div>
  );
};
