import { ImageAvatar } from '@/components/ImageAvatar';
import { User } from '@/shared/interfaces/IUser';
import { formatDayWithHours } from '@/shared/utils/transforms/dates';
import { StarFilled } from '@ant-design/icons';
import { Rate } from 'antd';
import React from 'react';

interface CommentProps {
  user: User;
  text: string;
  starts: number;
  createAt: Date;
}

export const Comment: React.FC<CommentProps> = ({
  user,
  text,
  starts,
  createAt,
}) => {
  return (
    <div className="flex space-x-4 border-t border-gray-200 text-sm text-gray-500">
      <div className="flex-none py-4">
        <ImageAvatar photoUrl={user.photoUrl} name={user.name} size={40} />
      </div>
      <div className="flex-1 py-4">
        <h3 className="font-medium text-gray-900">{user.name}</h3>
        <p>
          <time dateTime={createAt?.toString()}>
            {formatDayWithHours(createAt)}
          </time>
        </p>

        <div className="mt-2 flex items-center">
          <Rate
            className="rate-custom"
            disabled
            character={<StarFilled style={{ fontSize: '14px' }} />}
            defaultValue={starts}
          />
        </div>
        <p className="sr-only">{starts} out of 5 stars</p>

        <div
          className="prose prose-sm mt-2 max-w-none text-gray-500"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};
