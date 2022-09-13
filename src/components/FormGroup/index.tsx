import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import { Button } from '@/components/Button';
import MainContainer from '@/containers/MainContainer';
import { useForm } from 'react-hook-form';
import { GroupForm } from '@/shared/interfaces/IGroup';
import { useMutation, useQuery } from 'react-query';
import { findByIdentifierGroup, saveGroup } from '@/services/group';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const FormGroup: React.FC<{ identifier?: string }> = ({
  identifier = '',
}) => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<GroupForm>();
  const {
    isLoading,
    error,
    data: group,
    isFetching,
  } = useQuery(['MyGroup'], () => findByIdentifierGroup(identifier), {
    enabled: !!identifier,
  });

  const { mutate: mutateGroup, isLoading: mutateGroupLoading } = useMutation(
    saveGroup,
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
    }
  }, [group]);

  async function handleSaveGroup(data: GroupForm) {
    mutateGroup(data);
  }

  return (
    <MainContainer>
      <div className="container mx-auto px-4 pt-2 pb-8 ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Criar comunidade
          </h2>
          {/*  <Button
            href="my-communities/create"
            type="submit"
            variant="solid"
            color="blue"
            aria-label="Criar comunidade"
          >
            <span className="flex items-center gap-2">
              <span className="hidden md:flex">Criar comunidade</span>
              <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
            </span>
          </Button> */}
        </div>
      </div>
      <div className="container mx-auto px-4">
        <form
          onSubmit={handleSubmit(handleSaveGroup)}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('name')}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Slug
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      connect-me.com.br/
                    </span>
                    <input
                      {...register('slug')}
                      type="text"
                      name="slug"
                      id="slug"
                      autoComplete="slug"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descrição
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register('description')}
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      defaultValue={''}
                      required
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Fale um pouco sobre os assuntos abordados e os objetivos da
                    sua comunidade
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Capa do banner da comunidade
                  </label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload da foto</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">ou arraste e solte aqui</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
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
                Cancel
              </Button>
              <Button
                type="submit"
                variant="solid"
                color="blue"
                isLoading={mutateGroupLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};
