import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Button, Card, Image as ImagePreview, Upload, Typography } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { AspectRatio } from '@/shared/enums/aspect-ratio.enum';

const { Text, Paragraph } = Typography;
const { Dragger } = Upload;

interface UploadImageProps {
  image?: RcFile | undefined;
  setImage: (dataSrc: RcFile | undefined) => void;
  initialImage: string;
  setInitialImage: (dataSrc: string) => void;
  label?: string;
  description?: string;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  setImage,
  initialImage,
  setInitialImage,
  label,
  description,
}) => {
  const [preview, setPreview] = useState('');
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imageData: any = new Image();
    imageData.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(imageData.outerHTML);
  };

  const loadImage = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
      setPreview(src);
      setImage(file.originFileObj);
      setInitialImage('');
    }
  };

  const onChangeDrop = (info: any) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      loadImage(info.file);

      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  };

  const onDrop = (e: any) => {
    console.log('Dropped files', e.dataTransfer.files);
  };

  const handleRemoveImage = () => {
    setImage(undefined);
    setPreview('');
    setInitialImage('');
  };

  return (
    <>
      <Text>{label}</Text>
      <Paragraph>{description}</Paragraph>
      {!preview && !initialImage && (
        <ImgCrop
          rotationSlider
          aspect={AspectRatio.WIDE_SCREEN}
          showGrid
          maxZoom={10}
          quality={1}
        >
          <Dragger
            onPreview={onPreview}
            name="file"
            onChange={onChangeDrop}
            onDrop={onDrop}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </ImgCrop>
      )}

      {(preview || initialImage) && (
        <Card
          className="shadow-lg"
          style={{ maxWidth: 320, width: '100%' }}
          cover={
            <ImagePreview
              className="w-full max-w-xs"
              src={preview || initialImage}
            />
          }
          bodyStyle={{ height: 0, padding: 0, margin: 0 }}
          actions={[
            <Button
              key="upload-btn-remove"
              type="primary"
              shape="round"
              size="large"
              danger
              icon={<DeleteOutlined />}
              onClick={handleRemoveImage}
            >
              Remover
            </Button>,
          ]}
        ></Card>
      )}
    </>
  );
};
