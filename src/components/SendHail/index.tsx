import { sendHail } from '@/services/send-hail';
import {
  FormMessages,
  maxLengthMessage,
} from '@/shared/utils/texts/formMessages';
import { Button, Input, Form, Modal, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const { TextArea } = Input;
const { Paragraph } = Typography;

interface SendHailProps {
  toUserUUID: string;
}

const SendHail: React.FC<SendHailProps> = ({ toUserUUID }) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const [form] = Form.useForm();

  const { mutate: mutateSendHail, isLoading } = useMutation(sendHail, {
    onSuccess: () => {
      toast.success(`Salve enviado com sucesso!`);
      setIsOpenModal(false);
    },
  });

  useEffect(() => {
    if (isOpenModal) {
      form.resetFields();
    }
  });

  const handleSendHail = (data: any) => {
    mutateSendHail({ ...data, toUserUUID });
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Button
        type="link"
        icon={<span style={{ fontSize: '20px' }}>🤘</span>}
        style={{ display: 'flex' }}
        className="flex flex-row-reverse items-center gap-2"
        onClick={() => setIsOpenModal(true)}
      >
        Mandar Salve!
      </Button>
      <Modal
        title="Madar Salve!"
        open={isOpenModal}
        maskClosable={false}
        onOk={form.submit}
        onCancel={handleCloseModal}
        okButtonProps={{
          shape: 'round',
          size: 'large',
          loading: isLoading,
        }}
        cancelButtonProps={{
          size: 'large',
          type: 'text',
          disabled: isLoading,
        }}
        okText="Mandar Salve!"
        cancelText="Fechar"
      >
        <Paragraph>
          Mandar salve! 🤘 É uma forma de enviar um e-mail para alguma pessoa
          que está dentro do Connect me, dessa forma você pode entrar em contato
          com a pessoa que você deseja e aumentar seu network. Possibilitando
          marcar uma convera para compartilhar conhecimento ou uma entrevista ou
          até mesmo só tomar um café ☕ e jogar papo fora.
        </Paragraph>
        <h3 className="sr-only">Mandar salve!</h3>
        <Form
          preserve={false}
          form={form}
          onFinish={handleSendHail}
          layout="vertical"
          className="!mt-4"
        >
          <Form.Item
            label="Mande seu salve! (Não coloque saudações)"
            name="message"
            tooltip="Não coloque saudações, pois o Connect me já coloca automaticamente."
            rules={[
              { required: true, message: FormMessages.REQUIRED_FIELD },
              { max: 1000, message: maxLengthMessage(1000) },
            ]}
          >
            <TextArea
              size="large"
              rows={8}
              placeholder="Exemplo: E aí, tudo bem? Sou viciado em tecnologia e adoro compartilhar conhecimento com pessoas que têm a mesma paixão. Que tal tomar um café juntos e bater um papo sobre as últimas novidades do mundo tech? Tenho certeza de que podemos trocar ideias e aprender muito um com o outro. Topa? Me avise quando você estiver livre!"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SendHail;
