import { Skeleton } from 'antd';
import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="relative w-full max-w-md md:flex md:max-w-full">
      <div className="skeleton h-48 flex-none overflow-hidden rounded-t border border-gray-400 bg-cover bg-center lg:h-auto lg:w-48 lg:rounded-t-none  lg:rounded-l"></div>
      <div className="flex w-full flex-col justify-between  rounded-b border-r border-b border-l border-gray-400 bg-white p-4 leading-normal md:rounded-b-none md:rounded-r md:border-l-0 md:border-t md:border-gray-400">
        <div className="mb-8">
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton.Avatar active size={40} shape={'circle'} />
          <Skeleton active title={false} paragraph={{ rows: 2 }} />
        </div>
      </div>
    </div>
  );
};
