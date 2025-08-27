import React from 'react';
import type { Airdrop } from '../../types';

export const NetworkBadge: React.FC<{ network: 'mainnet' | 'testnet' | 'both' }> = ({ network }) => {
  const styles = { mainnet: 'bg-green-400', testnet: 'bg-orange-400', both: 'bg-blue-400' };
  return <span className={`text-black border-2 border-black px-2 py-1 text-xs font-bold uppercase ${styles[network]}`}>{network}</span>;
};

export const StatusBadge: React.FC<{ status: Airdrop['status'] }> = ({ status }) => {
    const styles = { todo: 'bg-gray-300 text-black', 'in-progress': 'bg-pink-500 text-white', completed: 'bg-green-500 text-black', claimed: 'bg-yellow-400 text-black' };
    return <span className={`border-2 border-black px-2.5 py-1 text-xs font-bold uppercase ${styles[status]}`}>{status.replace('-', ' ')}</span>;
};

export const DifficultyBadge: React.FC<{ difficulty: Airdrop['difficulty'] }> = ({ difficulty }) => {
    const styles = { easy: 'bg-green-200 text-green-800', medium: 'bg-yellow-200 text-yellow-800', hard: 'bg-red-200 text-red-800' };
    return <span className={`border-2 border-black px-2.5 py-1 text-xs font-bold uppercase ${styles[difficulty]}`}>{difficulty}</span>;
};