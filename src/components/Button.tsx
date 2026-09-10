import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
