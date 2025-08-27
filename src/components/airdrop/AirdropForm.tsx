import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-hot-toast';
import type { Airdrop } from '../../types';
import { Button } from '../ui/Button';

export const AirdropForm: React.FC<{ airdrop?: Airdrop; onSave: (data: any) => void; onCancel: () => void }> = ({ airdrop, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        projectName: airdrop?.projectName || '', title: airdrop?.title || '', blockchain: airdrop?.blockchain || 'Ethereum', network: airdrop?.network || 'mainnet', status: airdrop?.status || 'todo', difficulty: airdrop?.difficulty || 'easy', estimatedReward: airdrop?.estimatedReward || '', deadline: airdrop?.deadline ? format(parseISO(airdrop.deadline), 'yyyy-MM-dd') : '', notes: airdrop?.notes || '', tags: airdrop?.tags?.join(', ') || '', walletAddress: airdrop?.walletAddresses?.primary || '', website: airdrop?.links?.website || '', dapp: airdrop?.links?.dapp || '', twitter: airdrop?.links?.twitter || '', discord: airdrop?.links?.discord || '', guide: airdrop?.links?.guide || '', faucet: airdrop?.links?.faucet || '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.projectName || !formData.title) { toast.error('Project Name and Title are required!'); return; }
        const { walletAddress, website, dapp, twitter, discord, guide, faucet, ...rest } = formData;
        onSave({ ...rest, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean), walletAddresses: { primary: walletAddress }, links: { website, dapp, twitter, discord, guide, faucet }, requirements: airdrop?.requirements || [], tasks: airdrop?.tasks || [] });
    };
    const inputStyle = "w-full p-2 border-[3px] border-black focus:outline-none focus:ring-2 focus:ring-pink-500 focus:shadow-[4px_4px_0px_0px_#FF1493] transition-all duration-200";
    const renderInput = (name: keyof typeof formData, label: string, type = 'text', required = false) => <div><label htmlFor={name} className="block text-sm font-bold mb-1 font-space-grotesk uppercase">{label}</label><input type={type} id={name} name={name} value={formData[name]} onChange={handleChange} className={inputStyle} required={required} /></div>;
    const renderSelect = (name: keyof typeof formData, label: string, options: string[]) => <div><label htmlFor={name} className="block text-sm font-bold mb-1 font-space-grotesk uppercase">{label}</label><select id={name} name={name} value={formData[name]} onChange={handleChange} className={`${inputStyle} bg-white`}>{options.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}</select></div>;
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div><h3 className="text-lg font-bold mb-2 font-space-grotesk uppercase border-b-2 border-black pb-1">Main Info</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{renderInput('projectName', 'Project Name', 'text', true)}{renderInput('title', 'Title', 'text', true)}{renderSelect('blockchain', 'Blockchain', ['Ethereum', 'Solana', 'Base', 'Arbitrum', 'Optimism', 'ZkSync', 'Polygon'])}{renderSelect('network', 'Network', ['mainnet', 'testnet', 'both'])}{renderSelect('status', 'Status', ['todo', 'in-progress', 'completed', 'claimed'])}{renderSelect('difficulty', 'Difficulty', ['easy', 'medium', 'hard'])}{renderInput('estimatedReward', 'Estimated Reward')}{renderInput('deadline', 'Deadline', 'date')}</div></div>
            {renderInput('walletAddress', 'Wallet Address')}
            <div><h3 className="text-lg font-bold mb-2 font-space-grotesk uppercase border-b-2 border-black pb-1">Project Links</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{renderInput('website', 'Website URL')}{renderInput('dapp', 'dApp / Ecosystem URL')}{renderInput('faucet', 'Faucet URL')}{renderInput('twitter', 'Twitter URL')}{renderInput('discord', 'Discord URL')}{renderInput('guide', 'Guide URL')}</div></div>
            <div><label htmlFor="notes" className="block text-sm font-bold mb-1 font-space-grotesk uppercase">Notes</label><textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4} className={inputStyle} /></div>
            {renderInput('tags', 'Tags (comma separated)')}
            <div className="flex justify-end gap-4 pt-4"><Button onClick={(e) => {e.stopPropagation(); onCancel();}}>Cancel</Button><Button type="submit">Save Airdrop</Button></div>
        </form>
    );
};
