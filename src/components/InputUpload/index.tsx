import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from 'antd';

// Get production API keys from Upload.io
const uploader = Uploader({
  apiKey: 'free',
});

interface InputUploadProps {
  setImage: (file: any) => void;
  imageUrl: string;
  label?: string;
  isSubmitted: boolean;
}

// Render the file upload button:
export const InputUpload = ({
  setImage,
  imageUrl: initImageUrl,
  label = 'Escolha sua imagem!',
  isSubmitted = false,
}: InputUploadProps) => {
  const [imageUrl, setImageUrl] = useState<any>(initImageUrl);

  return (
    <>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Picture of the author"
          width={500}
          height={500}
          style={{ aspectRatio: '16 / 9' }}
          className="mb-3 rounded-md"
        />
      )}
      <UploadButton
        uploader={uploader} // Required.
        options={{
          multi: false,
          maxFileSizeBytes: 2 * 1024 * 1024,
          mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml'],
          editor: {
            images: {
              crop: true, // false disables the image editor / cropper
              cropRatio: 16 / 9,
              cropShape: 'rect', // "rect" | "circ"
            },
          },
        }} // Optional.
        onComplete={(files) => {
          // Optional.
          if (files?.[0]?.fileUrl) {
            setImageUrl(files[0].fileUrl);
            setImage({
              urlImage: files[0].fileUrl,
              nameImage: files[0]?.originalFile?.originalFileName,
            });
          }
        }}
      >
        {({ onClick }) => (
          <Button shape="round" onClick={onClick}>
            {label}
          </Button>
        )}
      </UploadButton>
      {isSubmitted && !imageUrl && (
        <span className="mb-1 block text-sm font-medium text-red-400">
          Campo Obrigatório!
        </span>
      )}
    </>
  );
};
