import { PlusSmallIcon as PlusSmIconSolid } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import { Button } from '@/components/Button';
import MainContainer from '@/containers/MainContainer';
import { useForm } from 'react-hook-form';
import { EventForm } from '@/shared/interfaces/IEvent';
import { useMutation, useQuery } from 'react-query';
import { findByIdentifierEvent, saveEvent } from '@/services/event';
import { useRouter } from 'next/router';
import { Label, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { ErrorMessages } from '../Fields';
import { InputUploadSample } from '../InputUploadSample';
import { AspectRatio } from '@/shared/enums/aspect-ratio.enum';

export const FormEvent: React.FC<{
  identifier: string;
  identifierEvent?: string;
}> = ({ identifier, identifierEvent = '' }) => {
  const router = useRouter();
  const [coverEvent, setCoverEvent] = useState<{
    url: string;
    file: File;
  }>();
  const [initialImage, setInitialImage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted, errors },
  } = useForm<EventForm>();
  const {
    isLoading,
    error,
    data: event,
    isFetching,
  } = useQuery(['MyEvent'], () => findByIdentifierEvent(identifier), {
    enabled: !!identifierEvent,
    staleTime: Infinity,
  });

  const { mutate: mutateEvent, isLoading: mutateEventLoading } = useMutation(
    saveEvent,
    {
      onError: (error, variables, context: any) => {
        console.log(error);
        console.log(`onError`);
      },
      onSuccess: (data, variables, context) => {
        toast.success('Evento criado com sucesso!');
        router.push(`/my-communities/management/${identifier}`);
      },
      onSettled: (data, error, variables, context) => {
        // Error or success... doesn't matter!
        console.log(data);
        console.log(`onSettled`);
      },
    }
  );

  useEffect(() => {
    if (event) {
      reset({
        name: event.name,
        description: event.description,
        slug: event.slug,
        address: event.address,
        initialDate: new Date(event.initialDate),
        finishDate: new Date(event.finishDate),
        limitParticipants: event.limitParticipants,
      });
      setInitialImage(event.coverUrl);
    }
  }, [event]);

  async function handleSaveEvent(data: EventForm) {
    mutateEvent({
      ...data,
      uuidGroup: identifier,
      uuid: identifierEvent,
      initialDate: new Date(data.initialDate),
      finishDate: new Date(data.finishDate),
      limitParticipants: Number(data.limitParticipants),
      coverImage: coverEvent?.file,
      coverUrl: initialImage,
    });
  }

  return (
    <MainContainer>
      <div className="container mx-auto px-4 pt-2 pb-8 ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Criar Evento
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
          onSubmit={handleSubmit(handleSaveEvent)}
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
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      connect-me.com.br/event/
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

                <div className="sm:col-span-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Endereço
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('address')}
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="given-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="initialDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data inicial
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('initialDate')}
                      type="date"
                      name="initialDate"
                      id="initialDate"
                      autoComplete="given-initialDate"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="finishDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data final
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('finishDate')}
                      type="date"
                      name="finishDate"
                      id="finishDate"
                      autoComplete="given-finishDate"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="limitParticipants"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Limite de participantes
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('limitParticipants')}
                      type="number"
                      name="limitParticipants"
                      id="limitParticipants"
                      autoComplete="given-limitParticipants"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <Label
                    htmlFor=""
                    value="Capa do evento"
                    className="label-form"
                  />
                  <InputUploadSample
                    imageData={coverEvent}
                    setImageData={setCoverEvent}
                    aspectRatio={AspectRatio.WIDE_SCREEN}
                    initialImage={initialImage}
                    setInitialImage={setInitialImage}
                  />
                  {!coverEvent && isSubmitted && (
                    <ErrorMessages
                      errorMessages={{
                        type: '',
                        message: 'Capa do evento é obrigatória!',
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
                disabled={mutateEventLoading}
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
                isLoading={mutateEventLoading}
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
