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
import Link from 'next/link';

const activity: any[] = [
  {
    id: 1,
    type: 'comment',
    person: { name: 'Eduardo Benz', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
  {
    id: 2,
    type: 'assignment',
    person: { name: 'Hilary Mahy', href: '#' },
    assigned: { name: 'Kristin Watson', href: '#' },
    date: '2d ago',
  },
  {
    id: 3,
    type: 'tags',
    person: { name: 'Hilary Mahy', href: '#' },
    tags: [
      { name: 'Bug', href: '#', color: 'bg-rose-500' },
      { name: 'Accessibility', href: '#', color: 'bg-indigo-500' },
    ],
    date: '6h ago',
  },
  {
    id: 4,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

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
                          <a href="#" className="font-medium text-gray-900">
                            {event.name}
                          </a>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {`${event.initialDate}`}
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
