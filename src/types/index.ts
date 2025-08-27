export interface Task {
    id: string;
    title: string;
    description?: string;
    type: 'website' | 'social' | 'transaction' | 'other';
    url?: string;
    isCompleted: boolean;
    completedDate?: string;
    txHash?: string;
    notes?: string;
}

export interface Airdrop {
    id: string;
    title: string;
    projectName: string;
    blockchain: string;
    network: 'mainnet' | 'testnet' | 'both';
    status: 'todo' | 'in-progress' | 'completed' | 'claimed';
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedReward: string;
    deadline?: string;
    requirements: string[];
    links: {
        website?: string;
        dapp?: string;
        twitter?: string;
        discord?: string;
        telegram?: string;
        guide?: string;
        faucet?: string;
    };
    walletAddresses: {
        primary?: string;
    };
    tasks: Task[];
    notes: string;
    dateAdded: string;
    dateCompleted?: string;
    rewardReceived?: string;
    tags: string[];
    lastCheckedIn?: string; // Properti baru untuk check-in harian
}
