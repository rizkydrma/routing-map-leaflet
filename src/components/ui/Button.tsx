import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={clsx('p-1 hover:bg-gray-100 transition duration-200 rounded-full hover:animate-pulse', className)}
    >
      {children}
    </button>
  );
};

export default Button;
