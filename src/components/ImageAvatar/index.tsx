import { stringToHslColor } from '@/shared/utils/transforms/rgb';
import { getInitials } from '@/shared/utils/transforms/text';
import { Avatar } from 'antd';
import Image from 'next/image';
import React from 'react';

interface ImageAvatarProps {
  photoUrl: string;
  name: string;
  type?: 'square' | 'circle';
  size?: number;
}

export const ImageAvatar: React.FC<ImageAvatarProps> = ({
  photoUrl,
  name,
  type = 'circle',
  size = 24,
}) => {
  if (photoUrl) {
    return (
      <Image
        width={size}
        height={size}
        className={`${
          type === 'circle' ? 'rounded-full' : 'rounded-md'
        } inline-block`}
        src={photoUrl}
        alt={name || ''}
      />
    );
  }

  return (
    <Avatar
      className="shadow"
      size={size}
      shape={type}
      style={{
        backgroundColor: stringToHslColor(name || '', 60, 70),
        color: stringToHslColor(name || '', 60, 95),
        borderColor: stringToHslColor(name || '', 60, 95),
        fontWeight: 600,
      }}
    >
      {getInitials(name)}
    </Avatar>
  );
};
