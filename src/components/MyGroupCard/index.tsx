import React from 'react';
import { Button } from '../Button';

interface MyGroupCardProps {
  uuid: string;
  name: string;
  description: string;
  coverUrl: string;
  isAdmin: boolean;
}

export function MyGroupCard({
  uuid,
  name,
  description,
  coverUrl,
}: MyGroupCardProps) {
  return (
    <div className="relative flex h-full flex-col justify-between rounded-lg shadow">
      <a
        className="absolute top-0 right-0 left-0 bottom-0"
        href={`/communities/${uuid}`}
      ></a>
      <div className="aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <img
          src={coverUrl}
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
          <Button
            href={`/my-communities/management/${uuid}`}
            type="button"
            variant="solid"
            color="blue"
          >
            Gerenciar
          </Button>

          <Button
            href={`/my-communities/${uuid}`}
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
