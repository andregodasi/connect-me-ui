import { Group } from '@/shared/interfaces/IGroup';
import Image from 'next/future/image';
import React from 'react';

const GroupCard: React.FC<Group> = ({
  uuid,
  name,
  description,
  users,
  coverUrl,
}) => {
  return (
    <a
      href={`/communities/${uuid}`}
      title="Clique para ver todas as informações!"
      className="w-full max-w-sm transition hover:shadow lg:flex lg:max-w-full "
    >
      <div
        className="h-48 flex-none overflow-hidden rounded-t border border-gray-400 bg-cover bg-center lg:h-auto lg:w-48 lg:rounded-t-none  lg:rounded-l"
        title="Woman holding a mug"
        style={{ backgroundImage: `url(${coverUrl})` }}
      ></div>
      <div className="flex w-full flex-col justify-between rounded-b border-r border-b border-l border-gray-400 bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400">
        <div className="mb-8">
          <div className="mb-2 text-xl font-bold text-gray-900">{name}</div>
          <p
            className="ellipis-3 whitespace-break-spaces break-all text-base text-gray-700"
            title={description}
          >
            {description}
          </p>
        </div>
        <div className="flex items-center">
          <Image
            className="mr-4 h-10 w-10 rounded-full object-cover"
            src={coverUrl}
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="leading-none text-gray-900">
              {users?.[0]?.user?.name}
            </p>
            <p className="text-gray-600">{users?.[0]?.user?.nickname}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default GroupCard;
