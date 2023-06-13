import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  XCircleIcon,
  MinusIcon,
} from '@heroicons/react/20/solid';
import { classNames } from '@/shared/helpers/styleSheets';
import { LoadingContainer } from '../LoadingContainer';

export enum ToggleStatusEnum {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  DELETE = 'delete',
  LOADING = 'loading',
}
interface Info {
  name: string;
  action: string;
  description: string;
}
export interface ToggleOptions {
  published: Info;
  draft: Info;
  delete: Info;
  loading: Info;
}
interface ToggleStatusProps {
  status: ToggleStatusEnum | undefined;
  toggleOptions: ToggleOptions;
  handleOnChange: (e: ToggleStatusEnum) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

interface InfoStyles {
  icon: React.ReactNode;
  color: string;
  divideColor: string;
  listBtn: string;
}

export interface ToggleStyles {
  published: InfoStyles;
  draft: InfoStyles;
  delete: InfoStyles;
  loading?: InfoStyles;
}

const toggleStyles = {
  published: {
    icon: <CheckIcon className="h-5 w-5" aria-hidden="true" />,
    color: 'blue',
    divideColor: 'divide-blue-600',
    listBtn:
      'inline-flex items-center rounded-r-full bg-blue-500 p-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50',
  },
  draft: {
    icon: <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />,
    color: 'gray',
    divideColor: 'divide-gray-600',
    listBtn:
      'inline-flex items-center rounded-r-full bg-gray-500 p-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50',
  },
  delete: {
    icon: <XCircleIcon className="h-5 w-5" aria-hidden="true" />,
    color: 'red',
    divideColor: 'divide-red-600',
    listBtn:
      'inline-flex items-center rounded-r-full bg-red-500 p-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50',
  },
  loading: {
    icon: <MinusIcon className="h-5 w-5" aria-hidden="true" />,
    color: 'gray',
    divideColor: 'divide-gray-600',
    listBtn:
      'inline-flex items-center rounded-r-full bg-gray-500 p-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50',
  },
};

const toggleOptionsLoading: ToggleOptions = {
  published: {
    name: '',
    action: '',
    description: '',
  },
  draft: {
    name: '',
    action: '',
    description: '',
  },
  delete: {
    name: '',
    action: '',
    description: '',
  },
  loading: {
    name: 'Carregando...',
    action: 'Carregando...',
    description: 'Carregando...',
  },
};

export const ToggleStatus: React.FC<ToggleStatusProps> = ({
  status = ToggleStatusEnum.LOADING,
  toggleOptions = toggleOptionsLoading,
  handleOnChange,
  isLoading,
  disabled,
}) => {
  return (
    <Listbox
      as="div"
      value={status}
      onChange={handleOnChange}
      className="sm:ml-3"
      disabled={isLoading || disabled}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only rounded-full">
            Change published status
          </Listbox.Label>
          <div className="relative">
            <LoadingContainer isLoading={!!isLoading} className="rounded-full">
              <div
                className={`inline-flex divide-x divide-${toggleStyles[status].color}-600 rounded-full shadow-sm`}
              >
                <div
                  className={classNames(
                    `inline-flex items-center rounded-l-full border border-transparent bg-${toggleStyles[status].color}-500 py-2 pl-3 pr-4 text-white shadow-sm`,
                  )}
                >
                  {toggleStyles[status].icon}

                  <p className="ml-2.5 text-sm font-medium">
                    {toggleOptions[status].name}
                  </p>
                </div>
                <Listbox.Button
                  className={classNames(toggleStyles[status].listBtn)}
                >
                  <span className="sr-only">Change published status</span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </LoadingContainer>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute left-0 z-10 mt-2 -mr-1 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                {ToggleStatusEnum.PUBLISHED !== status && (
                  <Listbox.Option
                    key={toggleOptions.draft.action}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-gray-500 text-white' : 'text-gray-900',
                        'cursor-default select-none p-4 text-sm',
                      )
                    }
                    disabled={ToggleStatusEnum.DRAFT === status}
                    value={ToggleStatusEnum.DRAFT}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? 'font-semibold' : 'font-normal'
                            }
                          >
                            {toggleOptions.draft.name}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? 'text-white' : 'text-gray-500'
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={classNames(
                            active ? 'text-gray-200' : 'text-gray-500',
                            'mt-2',
                          )}
                        >
                          {toggleOptions.draft.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                )}

                <Listbox.Option
                  key={toggleOptions.published.name}
                  disabled={ToggleStatusEnum.PUBLISHED === status}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-blue-500 text-white' : 'text-gray-900',
                      'cursor-default select-none p-4 text-sm',
                    )
                  }
                  value={ToggleStatusEnum.PUBLISHED}
                >
                  {({ selected, active }) => (
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <p
                          className={selected ? 'font-semibold' : 'font-normal'}
                        >
                          {toggleOptions.published.action}
                        </p>
                        {selected ? (
                          <span
                            className={active ? 'text-white' : 'text-blue-500'}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={classNames(
                          active ? 'text-blue-200' : 'text-gray-500',
                          'mt-2',
                        )}
                      >
                        {toggleOptions.published.description}
                      </p>
                    </div>
                  )}
                </Listbox.Option>
                <Listbox.Option
                  key={toggleOptions.delete.name}
                  disabled={ToggleStatusEnum.DELETE === status}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-red-500 text-white' : 'text-gray-900',
                      'cursor-default select-none p-4 text-sm',
                    )
                  }
                  value={ToggleStatusEnum.DELETE}
                >
                  {({ selected, active }) => (
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <p
                          className={selected ? 'font-semibold' : 'font-normal'}
                        >
                          {toggleOptions.delete.name}
                        </p>
                        {selected ? (
                          <span
                            className={active ? 'text-white' : 'text-red-500'}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={classNames(
                          active ? 'text-red-200' : 'text-gray-500',
                          'mt-2',
                        )}
                      >
                        {toggleOptions.delete.description}
                      </p>
                    </div>
                  )}
                </Listbox.Option>
                {/*  {publishingOptions.map((option) => (
                  <Listbox.Option
                    key={option.name}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'cursor-default select-none p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? 'font-semibold' : 'font-normal'
                            }
                          >
                            {option.name}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? 'text-white' : 'text-blue-500'
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={classNames(
                            active ? 'text-blue-200' : 'text-gray-500',
                            'mt-2'
                          )}
                        >
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))} */}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
