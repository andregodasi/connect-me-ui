/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

interface PlaceholderProps {
  image: any;
  alt: string;
  width?: number;
  height?: number;
  title?: string;
  descriptionTop?: string;
  descriptionBottom?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  image,
  alt,
  width = 600,
  height = 600,
  title,
  descriptionTop,
  descriptionBottom,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {title && (
        <Title level={3} className="!text-center !font-bold">
          {title}
        </Title>
      )}
      {descriptionTop && (
        <Paragraph className="!max-w-sm !text-center">
          {descriptionTop}
        </Paragraph>
      )}
      <Image src={image} alt={alt} width={width} height={height} unoptimized />
      {descriptionBottom && (
        <Paragraph className="!max-w-sm !text-center">
          {descriptionBottom}
        </Paragraph>
      )}
    </div>
  );
};
