import React from 'react';
import { Button } from '../Button';
import Image from 'next/future/image';
import placeholderImage from '@/images/screen-0.webp';
interface MyEventCardProps {
  uuid: string;
  name: string;
  description: string;
}

export function MyEventCard({ uuid, name, description }: MyEventCardProps) {
  return (
    <div className="relative flex h-full flex-col justify-between rounded-lg shadow">
      <div className="aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <Image
          src={placeholderImage}
          alt="community"
          className="max-h-[12rem] w-full object-cover group-hover:opacity-75"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <p className="mt-2 block truncate text-sm font-medium text-gray-900">
            {name}
          </p>
          <p
            aria-label={description}
            title={description}
            className="ellipis-3 block text-sm font-medium text-gray-500"
          >
            {description}
          </p>
        </div>
        <div className="mt-4 flex flex-col justify-start gap-4 md:flex-row">
          <Button type="button" variant="solid" color="blue">
            Gerenciar
          </Button>
          <Button
            href={`/my-events/${uuid}`}
            type="button"
            variant="solid"
            color="white"
          >
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}
