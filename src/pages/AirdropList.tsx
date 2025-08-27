import React, { useEffect, useState } from 'react';
import { Plus, Download, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAirdrops } from '../context/AirdropContext';
import type { Airdrop } from '../types';
import { AirdropCard } from '../components/airdrop/AirdropCard';
import { AirdropForm } from '../components/airdrop/AirdropForm';
import { AirdropDetail } from '../components/airdrop/AirdropDetail';
import { SearchBar } from '../components/common/SearchBar';
import { FilterDropdown } from '../components/common/FilterDropdown';
import { Modal, ConfirmationModal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

declare const XLSX: any;

export const AirdropListPage = () => {
    const { airdrops, deleteAirdrop, addAirdrop, updateAirdrop, loading } = useAirdrops();
    const [filteredAirdrops, setFilteredAirdrops] = useState<Airdrop[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [networkFilter, setNetworkFilter] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [tagFilter, setTagFilter] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState('dateAdded-desc');
    const [modalState, setModalState] = useState<{type: 'form' | 'detail' | 'delete' | null, airdrop?: Airdrop}>({type: null});

    useEffect(() => {
        let result = [...airdrops].sort((a, b) => {
            const [key, direction] = sortOrder.split('-');
            const dir = direction === 'asc' ? 1 : -1;
            if (key === 'deadline') { if (!a.deadline) return 1 * dir; if (!b.deadline) return -1 * dir; return (new Date(a.deadline).getTime() - new Date(b.deadline).getTime()) * dir; }
            if (key === 'projectName') return a.projectName.localeCompare(b.projectName) * dir;
            return (new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()) * dir;
        });
        if (searchQuery) result = result.filter(a => a.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || Object.values(a.walletAddresses).some(w => w?.toLowerCase().includes(searchQuery.toLowerCase())));
        if (statusFilter) result = result.filter(a => a.status === statusFilter);
        if (networkFilter) result = result.filter(a => a.network === networkFilter);
        if (difficultyFilter) result = result.filter(a => a.difficulty === difficultyFilter);
        if (tagFilter) result = result.filter(a => a.tags.includes(tagFilter));
        setFilteredAirdrops(result);
    }, [airdrops, searchQuery, statusFilter, networkFilter, difficultyFilter, tagFilter, sortOrder]);
    
    const handleCloseModal = () => setModalState({type: null});
    const handleSaveAirdrop = (data: any) => { (modalState.airdrop ? updateAirdrop(modalState.airdrop.id, data) : addAirdrop(data)); handleCloseModal(); };
    const handleDelete = () => { if (modalState.airdrop) { deleteAirdrop(modalState.airdrop.id); handleCloseModal(); } };
    const handleExport = () => {
        const dataToExport = airdrops.map(a => ({ ProjectName: a.projectName, Title: a.title, Blockchain: a.blockchain, Network: a.network, Status: a.status, Difficulty: a.difficulty, EstimatedReward: a.estimatedReward, Deadline: a.deadline, WalletAddress: a.walletAddresses.primary, Website: a.links.website, DApp: a.links.dapp, Twitter: a.links.twitter, Discord: a.links.discord, Guide: a.links.guide, Faucet: a.links.faucet, Notes: a.notes, Tags: a.tags.join(', '), DateAdded: a.dateAdded, }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Airdrops");
        XLSX.writeFile(workbook, `airdrops_backup_${new Date().toISOString().split('T')[0]}.xlsx`);
        toast.success('Data exported to Excel file!');
    };

    return (
        <div className="py-4 md:py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"><h1 className="font-space-grotesk text-4xl md:text-5xl font-bold text-center md:text-left">Airdrop List</h1><div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"><Button onClick={handleExport} className="bg-green-400 hover:bg-green-500 w-full"><span className="flex items-center justify-center gap-2"><Download size={16}/> Export XLSX</span></Button><Button onClick={() => setModalState({type: 'form'})} className="w-full"><span className="flex items-center justify-center gap-2"><Plus /> Add New</span></Button></div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"><SearchBar onSearch={setSearchQuery} /><FilterDropdown label="Status" value={statusFilter} onChange={setStatusFilter} options={[{ value: 'todo', label: 'Todo' }, { value: 'in-progress', label: 'In Progress' }, { value: 'completed', label: 'Completed' }, { value: 'claimed', label: 'Claimed' }]} /><FilterDropdown label="Network" value={networkFilter} onChange={setNetworkFilter} options={[{ value: 'mainnet', label: 'Mainnet' }, { value: 'testnet', label: 'Testnet' }, { value: 'both', label: 'Both' }]} /><FilterDropdown label="Difficulty" value={difficultyFilter} onChange={setDifficultyFilter} options={[{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }]} /><FilterDropdown label="Sort By" value={sortOrder} onChange={setSortOrder} options={[{ value: 'dateAdded-desc', label: 'Newest' }, { value: 'dateAdded-asc', label: 'Oldest' }, { value: 'deadline-asc', label: 'Deadline Soon' }, { value: 'projectName-asc', label: 'Project A-Z' }]} /></div>
            {tagFilter && <div className="mb-8 flex items-center justify-center"><div className="bg-blue-200 text-blue-800 border-2 border-black font-bold p-2 flex items-center gap-2"><span>Filtering by tag: #{tagFilter}</span><button onClick={() => setTagFilter(null)} className="bg-blue-400 text-white rounded-full p-0.5 hover:bg-blue-600"><X size={16} /></button></div></div>}
            {loading ? <p>Loading airdrops...</p> : (<>{filteredAirdrops.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{filteredAirdrops.map(airdrop => <AirdropCard key={airdrop.id} airdrop={airdrop} onSelect={() => setModalState({type: 'detail', airdrop})} onTagClick={setTagFilter} />)}</div> : <div className="text-center py-16"><p className="text-2xl font-bold font-space-grotesk">No airdrops found.</p><p className="text-gray-500 mt-2">Try adjusting your filters or add a new airdrop!</p></div>}</>)}
            {modalState.type === 'form' && <Modal isOpen={true} onClose={handleCloseModal} title={modalState.airdrop ? 'Edit Airdrop' : 'Add New Airdrop'}><AirdropForm airdrop={modalState.airdrop} onSave={handleSaveAirdrop} onCancel={handleCloseModal} /></Modal>}
            {modalState.type === 'detail' && modalState.airdrop && <Modal isOpen={true} onClose={handleCloseModal} title={modalState.airdrop.projectName} size="4xl"><AirdropDetail airdrop={modalState.airdrop} onEdit={() => setModalState({type: 'form', airdrop: modalState.airdrop})} onDelete={() => setModalState({type: 'delete', airdrop: modalState.airdrop})} /></Modal>}
            {modalState.type === 'delete' && modalState.airdrop && <ConfirmationModal isOpen={true} onClose={handleCloseModal} onConfirm={handleDelete} title="Confirm Deletion" message={`Are you sure you want to delete the "${modalState.airdrop.projectName}" airdrop? This action cannot be undone.`} />}
        </div>
    );
};