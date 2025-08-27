import React from 'react';
import type { ReactNode } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: ReactNode; size?: 'xl' | '2xl' | '4xl' }> = ({ isOpen, onClose, title, children, size = '2xl' }) => {
    if (!isOpen) return null;
    const sizeClasses = { 'xl': 'max-w-xl', '2xl': 'max-w-2xl', '4xl': 'max-w-4xl' }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className={`bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#FF1493] w-full ${sizeClasses[size]} transform -rotate-1`} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b-[3px] border-black bg-yellow-400">
                    <h2 className="font-space-grotesk text-2xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-black hover:text-pink-500 transition-colors"><X size={28} strokeWidth={3} /></button>
                </div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export const ConfirmationModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; }> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_#ef4444] w-full max-w-md transform rotate-1" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b-[3px] border-black bg-red-500 text-white">
          <h2 className="font-space-grotesk text-2xl font-bold flex items-center gap-2"><AlertTriangle /> {title}</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-300 transition-colors"><X size={28} strokeWidth={3} /></button>
        </div>
        <div className="p-6">
          <p className="text-lg mb-6">{message}</p>
          <div className="flex justify-end gap-4">
            <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400">Cancel</Button>
            <Button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white">Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  );
};