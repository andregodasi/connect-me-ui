import React from 'react';
import MainContainer from '../MainContainer';
import { toast } from 'react-toastify';

// import { Container } from './styles';

interface MainContainerPreviewProps {
  children: React.ReactNode;
  classNameMain?: string;
}

export const MainContainerPreview: React.FC<MainContainerPreviewProps> = ({
  children,
}) => {
  const handleOnClickBlock = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toast.warn(
      'Essa é uma prévia de conteúdo, não é possível interagir com ela.',
    );
  };
  return (
    <div className="relative shadow-lg">
      <div
        className="absolute h-full w-full"
        style={{ zIndex: 1000 }}
        onClick={handleOnClickBlock}
      ></div>
      <MainContainer>{children}</MainContainer>
    </div>
  );
};
