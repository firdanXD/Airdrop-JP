import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => (
    <div className="relative w-full">
        <input
            type="text"
            placeholder="Search by project or wallet..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full p-3 pl-10 border-[3px] border-black text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    </div>
);