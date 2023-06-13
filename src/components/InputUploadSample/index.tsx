import React, { ChangeEvent, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { UploadAvatar } from './UploadAvatar';
import Modal from '../Modal';
import { Button } from '../Button';
import { AspectRatio } from '@/shared/enums/aspect-ratio.enum';
import Image from 'next/future/image';

export const InputUploadSample: React.FC<{
  imageData?: any;
  setImageData: (imageData?: { url: string; file: File }) => void;
  aspectRatio?: AspectRatio;
  initialImage?: string;
  setInitialImage?: (str: string) => void;
}> = ({
  imageData,
  setImageData,
  aspectRatio = AspectRatio.WIDE_SCREEN,
  initialImage,
  setInitialImage,
}) => {
  const [editMode, setEditMode] = useState(false);
  const getNewAvatarUrl = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageData({
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    }
  };

  const isShowPreview = imageData?.url || initialImage;

  return (
    <>
      {isShowPreview && (
        <>
          <Image
            alt="Capa da comunidade"
            className="max-w-120 max-h-80 rounded object-cover shadow-md"
            src={imageData?.url || initialImage}
          />

          <div className="flex gap-8 py-3">
            <Button
              type="button"
              variant="solid"
              color="white"
              onClick={() => {
                setImageData();
                setInitialImage && setInitialImage('');
              }}
            >
              Remover
            </Button>
            <Button
              type="button"
              variant="solid"
              color="blue"
              onClick={() => setEditMode(true)}
            >
              Crop
            </Button>
          </div>
        </>
      )}
      {!isShowPreview && (
        <div className="col-span-full">
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                >
                  <span>Clique aqui para escolher uma imagem</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={getNewAvatarUrl}
                  />
                </label>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                Escolha uma imagem até 2MB
              </p>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={editMode} handleClose={() => setEditMode(false)}>
        <UploadAvatar
          cancelEdit={() => setEditMode(false)}
          setImageData={setImageData}
          imageData={imageData}
          aspectRatio={aspectRatio}
          initialImage={initialImage}
        />
      </Modal>
    </>
  );
};
