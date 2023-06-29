import React from 'react';
import { Button, Modal } from 'antd';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

interface ShareLinkButtonProps {
  link: string;
}

export const ShareLinkButton: React.FC<ShareLinkButtonProps> = ({ link }) => {
  const [isOpenModalShare, setIsOpenModalShare] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpenModalShare(true)}
        type="button"
        className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 py-3 px-8 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        Compartilhar
      </button>
      <Modal
        title="Compartilhar link!"
        open={isOpenModalShare}
        maskClosable={false}
        onCancel={() => setIsOpenModalShare(false)}
        footer={[
          <Button
            key="closeBtnShare"
            size="large"
            type="text"
            onClick={() => setIsOpenModalShare(false)}
          >
            Fechar
          </Button>,
        ]}
      >
        <p>Compartilhe para que mais pessoas possam participar!</p>
        <div className="flex gap-4 py-4">
          <LinkedinShareButton url={link}>
            <LinkedinIcon size={42} round />
          </LinkedinShareButton>
          <FacebookShareButton url={link}>
            <FacebookIcon size={42} round />
          </FacebookShareButton>
          <TwitterShareButton url={link}>
            <TwitterIcon size={42} round />
          </TwitterShareButton>
          <WhatsappShareButton url={link}>
            <WhatsappIcon size={42} round />
          </WhatsappShareButton>
          <TelegramShareButton url={link}>
            <TelegramIcon size={42} round />
          </TelegramShareButton>
          <EmailShareButton url={link} subject="Connect me">
            <EmailIcon size={42} round />
          </EmailShareButton>
        </div>
      </Modal>
    </>
  );
};
