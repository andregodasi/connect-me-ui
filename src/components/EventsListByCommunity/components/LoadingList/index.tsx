import { Skeleton } from 'antd';
import React from 'react';

export const LoadingList: React.FC = () => {
  return (
    <>
      {Array.from({ length: 5 })?.map((_, index) => (
        <tr key={index}>
          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
            <div className="flex items-center">
              <div className="w-16 flex-shrink-0">
                <Skeleton.Avatar active size={40} shape={'square'} />
              </div>
              <div className="ml-4">
                <Skeleton title={false} paragraph={{ rows: 1 }} />
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
            <div className="mt-2 flex flex-col text-sm text-gray-500">
              <Skeleton paragraph={{ rows: 2 }} />
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
            <Skeleton paragraph={{ rows: 1 }} />
          </td>
          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
            <Skeleton paragraph={{ rows: 1 }} />
          </td>
          <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <Skeleton title={false} paragraph={{ rows: 1 }} />
          </td>
        </tr>
      ))}
    </>
  );
};
