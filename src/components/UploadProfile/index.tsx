import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { AspectRatio } from '@/shared/enums/aspect-ratio.enum';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Image,
  Tooltip,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import styles from '../../styles/components/UploadProfile.module.css';
import useMediaQuery from '@/hooks/useMediaQuery';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface UploadProfileProps {
  initialImage: string;
  handleImageChange: (dataSrc: RcFile | undefined) => void;
  isLoading?: boolean;
}

export const UploadProfile: React.FC<UploadProfileProps> = ({
  initialImage,
  handleImageChange,
  isLoading,
}) => {
  const { isMD } = useMediaQuery();
  const [image, setImage] = useState<string | undefined>(initialImage);
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImage(url);
        handleImageChange(info.file.originFileObj);
      });
    }
  };

  return (
    <div className="relative w-fit p-7">
      {image ? (
        <Image
          className="rounded-full shadow-lg"
          width={isMD ? 240 : 120}
          src={image}
        />
      ) : (
        <Avatar
          className="shadow-lg"
          size={isMD ? 240 : 120}
          icon={<UserOutlined />}
        />
      )}

      <ImgCrop
        rotationSlider
        aspect={AspectRatio.SQUARE}
        showGrid
        maxZoom={10}
        quality={1}
      >
        <Upload
          name="avatar"
          listType="text"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {image ? (
            <div className={styles.btnUploadProfile}>
              <Tooltip title="Enviar foto">
                <Button
                  loading={loading || isLoading}
                  size={isMD ? 'large' : 'middle'}
                  type="primary"
                  shape="circle"
                  icon={<UploadOutlined />}
                />
              </Tooltip>
            </div>
          ) : (
            <div className={styles.btnUploadChangeProfile}>
              <Tooltip title="Enviar foto">
                <Button
                  loading={loading || isLoading}
                  size={isMD ? 'large' : 'middle'}
                  type="primary"
                  shape="circle"
                  icon={<UploadOutlined />}
                />
              </Tooltip>
            </div>
          )}
        </Upload>
      </ImgCrop>
    </div>
  );
};
