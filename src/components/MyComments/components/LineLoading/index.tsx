import { Skeleton } from 'antd';
import React from 'react';

export const LineLoading: React.FC = () => {
  return (
    <>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="w-16 flex-shrink-0">
            <Skeleton.Avatar active size={40} shape={'circle'} />
          </div>
          <div className="ml-4">
            <Skeleton paragraph={{ rows: 0 }} />
          </div>
        </div>
      </td>
      <td
        style={{ minWidth: '420px' }}
        className="py-5 pl-4 pr-3 text-sm sm:pl-0"
      >
        <div className="flex items-center">
          <div className="ml-4">
            <Skeleton paragraph={{ rows: 3 }} title={false} />
          </div>
        </div>
      </td>
      <td
        style={{ minWidth: '160px' }}
        className="py-5 pl-4 pr-3 text-sm sm:pl-0"
      >
        <div className="flex items-center">
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              <Skeleton paragraph={{ rows: 0 }} />
            </div>
          </div>
        </div>
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Skeleton.Button />
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Skeleton.Button />
      </td>
    </>
  );
};
