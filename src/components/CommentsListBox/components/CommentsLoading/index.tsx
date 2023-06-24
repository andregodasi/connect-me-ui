import { Skeleton } from 'antd';
import React from 'react';

export const CommentsLoading: React.FC = () => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {[1, 2].map((i: number) => (
        <Skeleton
          key={i}
          active
          avatar={{ size: 48, shape: 'square', className: '!rounded-md' }}
          paragraph={{ rows: 4 }}
        />
      ))}
    </div>
  );
};
