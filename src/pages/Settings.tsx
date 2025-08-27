import React, { useState } from 'react';
import { useAirdrops } from '../context/AirdropContext';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ConfirmationModal } from '../components/ui/Modal';
import { LogOut } from 'lucide-react';

export const SettingsPage = () => {
    const { resetAirdrops } = useAirdrops();
    const { logOut, user } = useAuth();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleReset = () => {
        resetAirdrops();
        setIsConfirmOpen(false);
    };

    return (
        <div className="p-4 md:p-8">
            <h1 className="font-space-grotesk text-5xl font-bold mb-8">Settings</h1>

            <Card className="mb-8">
                <h2 className="font-space-grotesk text-2xl font-bold mb-4">Account</h2>
                <p className="mb-4">You are currently logged in as: <strong className="font-mono bg-gray-200 p-1">{user?.displayName || user?.email}</strong></p>
                <Button onClick={logOut} className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2">
                    <LogOut size={16} />
                    Logout
                </Button>
            </Card>

            <Card className="border-red-500 !shadow-[8px_8px_0px_0px_#ef4444]">
                <h2 className="font-space-grotesk text-2xl font-bold text-red-600 mb-4">Danger Zone</h2>
                <p className="mb-4">This action is irreversible. All your current airdrop data will be deleted and replaced with the initial sample data.</p>
                <Button onClick={() => setIsConfirmOpen(true)} className="bg-red-500 hover:bg-red-600 text-white">Reset All Data</Button>
            </Card>

            <ConfirmationModal 
                isOpen={isConfirmOpen} 
                onClose={() => setIsConfirmOpen(false)} 
                onConfirm={handleReset} 
                title="Confirm Reset" 
                message="Are you sure you want to reset all data? This cannot be undone." 
            />
        </div>
    );
};