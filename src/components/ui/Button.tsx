import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'correct' | 'wrong';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const VARIANTS: Record<string, string> = {
  primary: 'bg-roman-red text-white hover:bg-roman-red-light shadow-md',
  secondary: 'bg-gold text-roman-dark hover:bg-gold-dark shadow-md',
  ghost: 'bg-transparent text-roman-dark hover:bg-cream-dark',
  correct: 'bg-correct text-white',
  wrong: 'bg-wrong text-white',
};

const SIZES: Record<string, string> = {
  sm: 'px-3 py-2 text-sm min-h-[36px]',
  md: 'px-5 py-3 text-base min-h-[48px]',
  lg: 'px-7 py-4 text-lg min-h-[56px]',
};

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
