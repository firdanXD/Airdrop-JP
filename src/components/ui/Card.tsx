import React from 'react';
import type { ReactNode } from 'react';

export const Card: React.FC<{ children: ReactNode; className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white border-[3px] border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_#000] transform hover:rotate-[-2deg] hover:scale-[1.02] hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}>
    {children}
  </div>
);
