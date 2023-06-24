import { User } from '@/shared/interfaces/IUser';
import React from 'react';
import ParticipantProfile from '../ParticipantProfile';
import { Button, Modal } from 'antd';
import { previewUsers } from './previewData';

interface ParticipantListBoxProps {
  participants: { user: User }[];
  title: string;
  isPreview?: boolean;
}

export const ParticipantListBox: React.FC<ParticipantListBoxProps> = ({
  title,
  participants = [],
  isPreview = false,
}) => {
  const [isOpenModalAllParticipants, setIsOpenModalAllParticipants] =
    React.useState(false);
  if (isPreview) {
    participants = previewUsers;
  }
  const isMoreThanEight = participants.length > 8;

  const handleCloseModal = () => {
    setIsOpenModalAllParticipants(false);
  };

  const handleOpenModal = () => {
    setIsOpenModalAllParticipants(true);
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-sm font-medium text-gray-900">
        {title} {`(${participants.length})`}
      </h3>
      {!isMoreThanEight && (
        <div className="mt-4 grid flex-1 grid-cols-4 gap-4">
          {participants.map(({ user: participant }) => (
            <div key={participant.uuid}>
              <ParticipantProfile participant={participant} />
            </div>
          ))}
        </div>
      )}

      {isMoreThanEight && (
        <div className="flex flex-1 flex-col">
          <div className="mt-4 grid grid-cols-4 gap-4">
            {participants.slice(0, 8).map(({ user: participant }) => (
              <div key={participant.uuid}>
                <ParticipantProfile participant={participant} />
              </div>
            ))}
          </div>
          <div className="flex justify-end py-4">
            <Button type="text" onClick={handleOpenModal}>
              Ver todos
            </Button>
          </div>
        </div>
      )}
      <Modal
        title={`Todos os ${title} (${participants.length})`}
        open={isOpenModalAllParticipants}
        onCancel={handleCloseModal}
        maskClosable={false}
        footer={[
          <Button key="close" type="text" onClick={handleCloseModal}>
            Fechar
          </Button>,
        ]}
      >
        <div className="mt-4 grid grid-cols-4 gap-4">
          {participants.map(({ user: participant }) => (
            <div key={participant.uuid}>
              <ParticipantProfile participant={participant} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ParticipantListBox;
