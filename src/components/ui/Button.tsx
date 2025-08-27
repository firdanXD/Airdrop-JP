import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

// Memperluas props untuk menyertakan semua atribut tombol standar seperti 'disabled'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button 
    {...props} 
    className={`bg-yellow-400 text-black border-[3px] border-black font-bold px-5 py-2.5 transform hover:rotate-1 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:scale-105 active:scale-95 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#000] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:hover:rotate-0 disabled:hover:scale-100 ${className}`}
  >
    {children}
  </button>
);
