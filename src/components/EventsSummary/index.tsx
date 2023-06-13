/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          rose: colors.rose,
        },
      },
    },
  }
  ```
*/
import { Fragment } from 'react';
import {
  ChatBubbleLeftEllipsisIcon,
  TagIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';
import { Event } from '@/shared/interfaces/IEvent';
import { formatWeekDateTime } from '@/shared/utils/transforms/dates';
import Link from 'next/link';

interface EventsSummaryProps {
  events: Event[] | undefined;
  isLoading: boolean;
}

export function EventsSummary({ events, isLoading }: EventsSummaryProps) {
  return (
    <div className="w-full rounded-lg border bg-white py-4 shadow-md sm:py-8">
      <div className="mb-4 flex items-center justify-between px-4 sm:px-8">
        <h5 className="text-xl font-bold leading-none text-gray-900 ">
          Seus próximos eventos
        </h5>
        <Link
          href="/my-events"
          className="text-sm font-medium text-blue-600 hover:underline "
        >
          Veja todos
        </Link>
      </div>
      <div className="px-4 sm:px-8">
        <hr />
      </div>
      {isLoading ? (
        <></>
      ) : (
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
                      <img
                        className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-400 ring-8 ring-white"
                        src="https://image.winudf.com/v2/image1/Y29tLmNpbGFicy5jb25mLndlYnN1bW1pdF9zY3JlZW5fMF8xNjM0MTE1ODc3XzA4OQ/screen-0.jpg?fakeurl=1&type=.webp"
                        alt=""
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
                          {formatWeekDateTime(event.initialDate)}
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
