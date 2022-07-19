import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm';

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
}

interface TextFieldData {
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
}: TextFieldData) {
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

export function SelectField({ name, label, className = '', ...props }) {
  return (
    <div className={className}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <select name={name} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  );
}
