import { Group } from '@/shared/interfaces/IGroup';
import { coverImgPlaceholder } from '@/shared/utils/helpers/coverImg';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React from 'react';

const GroupCard: React.FC<Group> = ({
  uuid,
  name,
  description,
  users,
  coverUrl,
  isFollowed,
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
        style={{ backgroundImage: `url(${coverUrl || coverImgPlaceholder})` }}
      ></div>
      <div className="flex w-full flex-col justify-between rounded-b border-r border-b border-l border-gray-400 bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400">
        <div className="mb-8">
          <div className="mb-2 text-xl font-bold text-gray-900">
            {name}
            {isFollowed && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
                <CheckCircleIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                  aria-hidden="true"
                />
                Seguidor
              </span>
            )}
          </div>
          <p
            className="ellipis-3 whitespace-break-spaces break-all text-base text-gray-700"
            title={description}
          >
            {description}
          </p>
        </div>
        <div className="flex items-center">
          <Image
            width={200}
            height={200}
            className="mr-4 h-10 w-10 rounded-full object-cover"
            src={coverUrl || coverImgPlaceholder}
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
