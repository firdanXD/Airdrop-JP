import React from 'react';
import { format, parseISO } from 'date-fns';
import { Globe, ExternalLink, Droplet, Twitter, Bot, Paperclip } from 'lucide-react';
import type { Airdrop } from '../../types';
import { Button } from '../ui/Button';
import { NetworkBadge, StatusBadge, DifficultyBadge } from '../common/Badges';
import { BlockchainIcon } from '../common/BlockchainIcon';
import { CheckInButton } from './CheckInButton';

export const AirdropDetail: React.FC<{ airdrop: Airdrop; onEdit: () => void; onDelete: () => void; }> = ({ airdrop, onEdit, onDelete }) => {
    const DetailItem: React.FC<{label: string; value: React.ReactNode}> = ({label, value}) => <div className="bg-gray-50 p-3 border-2 border-black"><p className="text-sm text-gray-500 font-bold uppercase">{label}</p><p className="font-bold text-lg">{value}</p></div>;
    const LinkButton: React.FC<{url?: string, label: string, icon: React.ReactNode}> = ({url, label, icon}) => url ? <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white border-2 border-black p-2 font-bold hover:bg-yellow-300 transition-colors shadow-[3px_3px_0px_0px_#000]">{icon} {label}</a> : null;
    
    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-space-grotesk text-xl font-bold border-b-2 border-black pb-2 mb-4">Daily Task</h3>
                <CheckInButton airdropId={airdrop.id} lastCheckedIn={airdrop.lastCheckedIn} />
            </div>
            <div><h3 className="font-space-grotesk text-xl font-bold border-b-2 border-black pb-2 mb-4">Details</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><DetailItem label="Blockchain" value={<div className="flex items-center gap-2"><BlockchainIcon blockchain={airdrop.blockchain} className="w-6 h-6" /><span>{airdrop.blockchain}</span></div>} /><DetailItem label="Network" value={<NetworkBadge network={airdrop.network} />} /><DetailItem label="Difficulty" value={<DifficultyBadge difficulty={airdrop.difficulty} />} /><DetailItem label="Status" value={<StatusBadge status={airdrop.status} />} /><DetailItem label="Estimated Reward" value={airdrop.estimatedReward} />{airdrop.deadline && <DetailItem label="Deadline" value={format(parseISO(airdrop.deadline), 'dd MMM yyyy')} />}</div><div className="mt-4"><DetailItem label="Wallet" value={<span className="font-mono text-sm break-all">{airdrop.walletAddresses.primary || 'N/A'}</span>} /></div></div>
            <div><h3 className="font-space-grotesk text-xl font-bold border-b-2 border-black pb-2 mb-4">Links</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><LinkButton url={airdrop.links.website} label="Website" icon={<Globe size={16} />} /><LinkButton url={airdrop.links.dapp} label="dApp" icon={<ExternalLink size={16} />} /><LinkButton url={airdrop.links.faucet} label="Faucet" icon={<Droplet size={16} />} /><LinkButton url={airdrop.links.twitter} label="Twitter" icon={<Twitter size={16} />} /><LinkButton url={airdrop.links.discord} label="Discord" icon={<Bot size={16} />} /><LinkButton url={airdrop.links.guide} label="Guide" icon={<Paperclip size={16} />} /></div></div>
            <div><h3 className="font-space-grotesk text-xl font-bold border-b-2 border-black pb-2">Notes</h3><p className="mt-4 p-4 bg-yellow-100 border-2 border-black min-h-[50px] whitespace-pre-wrap">{airdrop.notes || 'No notes added.'}</p></div>
            <div className="flex justify-end gap-4 pt-4 border-t-2 border-black mt-6"><Button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="bg-cyan-400 hover:bg-cyan-500">Edit</Button><Button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button></div>
        </div>
    );
};
