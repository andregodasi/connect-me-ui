import React, { ChangeEvent, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button } from '../Button';
import { AspectRatio } from '@/shared/enums/aspect-ratio.enum';

export const UploadAvatar: React.FC<Props> = ({
  imageData,
  setImageData,
  cancelEdit,
  aspectRatio = AspectRatio.WIDE_SCREEN,
  initialImage,
}) => {
  const [cropper, setCropper] = useState<any>();

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], 'newAvatar.png', { type: 'image/png' });
        });

      if (file) {
        setCropper(file);
        setImageData({
          url: cropper.getCroppedCanvas().toDataURL(),
          file: file,
        });
        cancelEdit();
      }
    }
  };

  const getImage = async () => {
    if (imageData?.url) {
      return imageData.url;
    }

    if (initialImage) {
      const fileTemp = await fetch(initialImage)
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], 'newAvatar.png', { type: 'image/png' });
        });

      return URL.createObjectURL(fileTemp);
    }

    return '';
  };

  return (
    <div>
      <Cropper
        src={imageData?.url || initialImage}
        style={{ height: 400, width: 400 }}
        aspectRatio={aspectRatio}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        guides={false}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      <div className="flex justify-between gap-8 py-3">
        <Button
          type="button"
          variant="solid"
          color="white"
          onClick={() => {
            cancelEdit();
          }}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="solid"
          color="blue"
          onClick={getCropData}
        >
          FInalizar
        </Button>
      </div>
    </div>
  );
};

type Props = {
  imageData: { url: string; file: File };
  setImageData: (infoImage: { url: string; file: File }) => void;
  cancelEdit: () => void;
  aspectRatio?: AspectRatio;
  initialImage?: string;
};
