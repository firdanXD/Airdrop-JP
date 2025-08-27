import React from 'react';
import { format, parseISO } from 'date-fns';
import type { Airdrop } from '../../types';
import { Card } from '../ui/Card';
import { NetworkBadge, StatusBadge, DifficultyBadge } from '../common/Badges';
import { BlockchainIcon } from '../common/BlockchainIcon';
import { CheckInButton } from './CheckInButton';

export const AirdropCard: React.FC<{ airdrop: Airdrop; onSelect: () => void; onTagClick: (tag: string) => void; }> = ({ airdrop, onSelect, onTagClick }) => {
  const statusBorders: Record<Airdrop['status'], string> = { todo: 'border-l-gray-400', 'in-progress': 'border-l-pink-500', completed: 'border-l-green-500', claimed: 'border-l-yellow-400' };
  
  return (
    <Card className={`flex flex-col justify-between space-y-4 border-l-8 ${statusBorders[airdrop.status]}`}>
      <div onClick={onSelect} className="cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-space-grotesk text-2xl font-bold text-black pr-2">{airdrop.projectName}</h3>
          <NetworkBadge network={airdrop.network} />
        </div>
        <p className="text-gray-600 font-medium mb-4">{airdrop.title}</p>
        <div className="flex flex-wrap gap-2 mb-4 items-center">
            <StatusBadge status={airdrop.status} />
            <DifficultyBadge difficulty={airdrop.difficulty} />
            <div className="flex items-center gap-1 bg-gray-200 text-black border-2 border-black px-2.5 py-1 text-xs font-bold uppercase">
                <BlockchainIcon blockchain={airdrop.blockchain} className="w-4 h-4" />
                <span>{airdrop.blockchain}</span>
            </div>
        </div>
        {airdrop.deadline && <p className="text-sm font-bold text-red-600">Deadline: {format(parseISO(airdrop.deadline), 'dd MMM yyyy')}</p>}
      </div>
      
      <div className="border-t-2 border-dashed border-black pt-4 space-y-4">
        <CheckInButton airdropId={airdrop.id} lastCheckedIn={airdrop.lastCheckedIn} />
        {airdrop.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {airdrop.tags.map(tag => <button key={tag} onClick={(e) => { e.stopPropagation(); onTagClick(tag); }} className="bg-blue-200 text-blue-800 border-2 border-black px-2 py-1 text-xs font-bold hover:bg-blue-300 transition-colors">#{tag}</button>)}
            </div>
        )}
      </div>
    </Card>
  );
};