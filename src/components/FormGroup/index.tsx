import { PlusSmallIcon as PlusSmIconSolid } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import { Button } from '@/components/Button';
import MainContainer from '@/containers/MainContainer';
import { useForm } from 'react-hook-form';
import { GroupForm } from '@/shared/interfaces/IGroup';
import { useMutation, useQuery } from 'react-query';
import {
  findByIdentifierGroup,
  saveGroup,
  saveGroupWithFile,
} from '@/services/group';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { transformTextToSlug } from '@/shared/utils/transforms/slug';
import { Label, Textarea, TextInput } from 'flowbite-react';
import { ErrorMessages } from '../Fields';
import { InputUploadSample } from '../InputUploadSample';
import { AspectRatio } from '@/shared/enums/aspect-ratio.enum';

const validationSchema = yup.object({
  name: yup.string().required(),
  slug: yup
    .string()
    .required()
    .matches(
      /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
      'Formato inválido. Use apenas letras, numero e traço (-) entre palavras.'
    ),
  description: yup.string().required(),
});

export const FormGroup: React.FC<{ identifier?: string }> = ({
  identifier = '',
}) => {
  const router = useRouter();
  const [coverCommunity, setCoverCommunity] = useState<{
    url: string;
    file: File;
  }>();
  const [initialImage, setInitialImage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitted, errors },
  } = useForm<GroupForm>({ resolver: yupResolver(validationSchema) });
  const {
    isLoading,
    error,
    data: group,
    isFetching,
  } = useQuery(['MyGroup'], () => findByIdentifierGroup(identifier), {
    enabled: !!identifier,
    staleTime: Infinity,
  });

  const { mutate: mutateGroup, isLoading: mutateGroupLoading } = useMutation(
    saveGroupWithFile,
    {
      onError: (error, variables, context: any) => {
        console.log(error);
        console.log(`onError`);
      },
      onSuccess: (data, variables, context) => {
        toast.success('Comunidade criada com sucesso!');
        router.push('/my-communities');
      },
      onSettled: (data, error, variables, context) => {
        // Error or success... doesn't matter!
        console.log(data);
        console.log(`onSettled`);
      },
    }
  );

  useEffect(() => {
    if (group) {
      reset({
        name: group.name,
        slug: group.slug,
        description: group.description,
      });

      setInitialImage(group.coverUrl);
    }
  }, [group]);

  async function handleSaveGroup(data: GroupForm) {
    if (!coverCommunity?.file && !initialImage) {
      return;
    }

    mutateGroup({
      ...data,
      coverImage: coverCommunity?.file,
      coverUrl: initialImage,
      uuid: identifier,
    });
  }

  console.log(errors);
  return (
    <MainContainer>
      <div className="container mx-auto px-4 pt-2 pb-8 ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Criar comunidade
          </h2>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <pre>{}</pre>
        <form
          onSubmit={handleSubmit(handleSaveGroup)}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <Label htmlFor="name" value="Nome" className="mb-1 block" />
                  <TextInput type="text" id="name" {...register('name')} />
                  <ErrorMessages errorMessages={errors['name']} />
                </div>

                <div className="sm:col-span-4">
                  <Label htmlFor="slug" value="Slug" className="label-form" />
                  <TextInput
                    addon="connect-me.com.br/"
                    type="text"
                    id="slug"
                    {...register('slug')}
                    className="input-form"
                    onChange={(e) => {
                      const { value } = e.target;
                      setValue('slug', transformTextToSlug(value), {
                        shouldValidate: true,
                      });
                    }}
                  />
                  <ErrorMessages errorMessages={errors['slug']} />
                </div>

                <div className="sm:col-span-6">
                  <Label
                    htmlFor="description"
                    value="Descrição"
                    className="label-form"
                  />
                  <Textarea
                    id="description"
                    rows={3}
                    {...register('description')}
                    className="input-form"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Fale um pouco sobre os assuntos abordados e os objetivos da
                    sua comunidade
                  </p>
                  <ErrorMessages errorMessages={errors['description']} />
                </div>

                <div className="sm:col-span-6">
                  <Label
                    htmlFor=""
                    value="Capa da comunidade"
                    className="label-form"
                  />
                  <InputUploadSample
                    imageData={coverCommunity}
                    setImageData={setCoverCommunity}
                    aspectRatio={AspectRatio.WIDE_SCREEN}
                    initialImage={initialImage}
                    setInitialImage={setInitialImage}
                  />
                  {!coverCommunity && isSubmitted && (
                    <ErrorMessages
                      errorMessages={{
                        type: '',
                        message: 'Capa da comunidade é obrigatória!',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end gap-8">
              <Button
                type="button"
                variant="solid"
                color="white"
                disabled={mutateGroupLoading}
                onClick={() => {
                  router.back();
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="solid"
                color="blue"
                isLoading={mutateGroupLoading}
              >
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};
