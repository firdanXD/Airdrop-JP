import React from 'react';
import { Link } from 'lucide-react';

export const BlockchainIcon: React.FC<{ blockchain: string, className?: string }> = ({ blockchain, className }) => {
    const lowerBlockchain = blockchain.toLowerCase();
    switch (lowerBlockchain) {
        case 'ethereum': return <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22.5L12 15.3M12 22.5L5.25 12L12 15.3M12 22.5L18.75 12L12 15.3M12 1.5L12 9M12 1.5L18.75 12L12 9M12 1.5L5.25 12L12 9M5.25 12L18.75 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
        case 'solana': return <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12.9V11.1C4 9.92988 4.61867 8.85304 5.61834 8.27333L10.6183 5.37333C11.6293 4.78782 12.912 4.78782 13.923 5.37333L18.923 8.27333C19.9227 8.85304 20.5413 9.92988 20.5413 11.1V12.9C20.5413 14.0701 19.9227 15.147 18.923 15.7267L13.923 18.6267C12.912 19.2122 11.6293 19.2122 10.6183 18.6267L5.61834 15.7267C4.61867 15.147 4 14.0701 4 12.9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>;
        case 'base': return <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/></svg>;
        default: return <Link size={16} className={className} />;
    }
};
