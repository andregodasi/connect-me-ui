import { Follower } from '@/shared/interfaces/IFollower';
import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';

interface FollowersTableLineProps {
  follower: Follower;
}
export const FollowersTableLine: React.FC<FollowersTableLineProps> = ({
  follower,
}) => {
  const { uuid, name, title, photoUrl, nickname, companyName, companyRole } =
    follower;

  return (
    <>
      <tr key={uuid}>
        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
          <div className="flex items-center">
            <div className="w-16 flex-shrink-0">
              <img
                className="aspect-square w-12 rounded-full object-cover group-hover:opacity-75"
                src={photoUrl}
                alt={name}
              />
            </div>
            <div className="ml-4">
              <div className="font-medium text-gray-900">{name}</div>
              <div className="mt-1 text-gray-500">{nickname}</div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="font-medium text-gray-900">{title}</div>
              <div className="mt-1 text-gray-500">{companyRole}</div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="font-medium text-gray-900">{companyName}</div>
            </div>
          </div>
        </td>
        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
          <Link
            target="_blank"
            className="text-indigo-600 hover:text-indigo-900"
            href={`/profile/${uuid}`}
          >
            <Button
              type="link"
              icon={<RightOutlined />}
              style={{ display: 'flex' }}
              className="flex flex-row-reverse items-center gap-2"
            >
              Ver mais
            </Button>
            <span className="sr-only">, {name}</span>
          </Link>
        </td>
      </tr>
    </>
  );
};
