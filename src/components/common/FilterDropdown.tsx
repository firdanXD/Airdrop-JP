import React from 'react';
import { ChevronDown } from 'lucide-react';

export const FilterDropdown: React.FC<{ label: string; options: {value: string, label: string}[]; onChange: (value: string) => void; value: string }> = ({ label, options, onChange, value }) => (
    <div className="relative">
        <select
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className="appearance-none w-full bg-white border-[3px] border-black p-3 font-bold text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow"
        >
            <option value="">All {label}</option>
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
);
