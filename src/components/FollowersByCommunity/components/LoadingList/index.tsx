import { Skeleton } from 'antd';
import React from 'react';

export const FollowersTableLine: React.FC = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <tr key={i}>
          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div className="flex items-center">
              <div className="w-16 flex-shrink-0">
                <Skeleton.Avatar active size={40} shape={'circle'} />
              </div>
              <div className="ml-4">
                <Skeleton paragraph={{ rows: 1 }} />
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div className="flex items-center">
              <div className="ml-4">
                <Skeleton paragraph={{ rows: 1 }} />
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div className="flex items-center">
              <div className="ml-4">
                <Skeleton title={false} paragraph={{ rows: 1 }} />
              </div>
            </div>
          </td>
          <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <Skeleton.Button />
          </td>
          <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <Skeleton.Button />
          </td>
        </tr>
      ))}
    </>
  );
};
