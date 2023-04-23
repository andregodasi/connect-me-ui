import clsx from 'clsx';
import { FieldError } from 'react-hook-form';

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm';

function Label({ htmlFor, children }: { htmlFor: string; children: any }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
}

const ErrorMessageEnum: any = {
  required: 'Campo obrigatório!',
};

export function ErrorMessages({
  errorMessages,
}: {
  errorMessages: FieldError | undefined;
}) {
  if (!errorMessages?.type) {
    return null;
  }
  return (
    <span className="mb-1 block text-sm font-medium text-red-400">
      {ErrorMessageEnum?.[errorMessages.type]
        ? ErrorMessageEnum[errorMessages.type]
        : errorMessages.message}
    </span>
  );
}

interface TextFieldProps {
  name: string;
  label: string;
  type: string;
  className?: string;
  autoComplete?: string;
  required?: boolean;
  register?: any;
}
export function TextField({
  name,
  label,
  type = 'text',
  className = '',
  register,
  ...props
}: TextFieldProps) {
  return (
    <div className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <input
        name={name}
        type={type}
        className={formClasses}
        {...props}
        {...register(name)}
      />
    </div>
  );
}

interface SelectFieldProps {
  name: string;
  label: string;
  errorMesage?: string;
  className?: string;
  autoComplete?: string;
  required?: boolean;
  register?: any;
}

export function SelectField({
  name,
  label,
  className = '',
  ...props
}: SelectFieldProps) {
  return (
    <div className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <select name={name} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  );
}
