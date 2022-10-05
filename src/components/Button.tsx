import Link from 'next/link';
import clsx from 'clsx';
import styles from '../styles/components/Button.module.css';

type ColorType = {
  slate?: string;
  blue?: string;
  white?: string;
};

type BaseStylesType = {
  solid: string;
  outline: string;
};

type VariantStylesType = {
  solid: ColorType;
  outline: ColorType;
};

const baseStyles: BaseStylesType = {
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-25 disabled:cursor-not-allowed relative gap-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed relative gap-2',
};

const variantStyles: VariantStylesType = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    white:
      'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white',
  },
  outline: {
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
  },
};

interface ButtonProps {
  variant: 'solid' | 'outline';
  color: 'slate' | 'blue' | 'white';
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  href?: string;
  onClick?: (event: any) => void;
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export function Button({
  variant = 'solid',
  color = 'slate',
  isLoading = false,
  disabled = false,
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return href ? (
    <Link
      href={!disabled && !isLoading ? href : `#`}
      className={className}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <button className={className} disabled={disabled || isLoading} {...props}>
      <span className={`${isLoading ? styles.opacityOut : styles.opacityIn}`}>
        {children}
      </span>
      <Loading isLoading={isLoading} />
    </button>
  );
}

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={`${styles.absoluteCenter} ${
        isLoading ? styles.opacityIn : styles.opacityOut
      }`}
    >
      <svg
        className={`h-5 w-5 animate-spin text-white`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
