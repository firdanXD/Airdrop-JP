import type { Airdrop } from '../types';

export const sampleAirdrops: Omit<Airdrop, 'id'>[] = [
  {
    title: 'LayerZero Mainnet Farming',
    projectName: 'LayerZero',
    blockchain: 'Ethereum',
    network: 'mainnet',
    status: 'in-progress',
    difficulty: 'medium',
    estimatedReward: '500-2000 ZRO',
    deadline: '2025-12-31',
    requirements: [
      'Bridge minimal $100 antar chain',
      'Minimal 10 transaksi',
      'Hold balance minimal 1 bulan'
    ],
    links: {
      website: 'https://layerzero.network',
      dapp: 'https://stargate.finance',
      twitter: 'https://twitter.com/layerzero_labs',
      guide: 'https://example.com/guide'
    },
    walletAddresses: {
      primary: '0x123...abc',
    },
    tasks: [
      { id: 't1', title: 'Connect Wallet ke Stargate', type: 'website', url: 'https://stargate.finance', isCompleted: true, completedDate: '2025-01-16' },
      { id: 't2', title: 'Bridge ETH ke Arbitrum', type: 'transaction', isCompleted: true, txHash: '0x789...xyz', completedDate: '2025-01-17' },
      { id: 't3', title: 'Follow Twitter @LayerZero_Labs', type: 'social', url: 'https://twitter.com/layerzero_labs', isCompleted: false },
      { id: 't4', title: 'Bridge USDC ke Polygon', type: 'transaction', isCompleted: false, notes: 'Tunggu gas fee turun' }
    ],
    notes: 'Target 10 bridge, sudah 3x. Focus ke volume > $100 per tx',
    dateAdded: '2025-01-15',
    tags: ['defi', 'bridge', 'high-reward']
  },
  {
    title: 'Base Ecosystem Testnet',
    projectName: 'Base Network',
    blockchain: 'Base',
    network: 'testnet',
    status: 'todo',
    difficulty: 'easy',
    estimatedReward: 'Unknown',
    deadline: '2025-08-30',
    requirements: [
      'Deploy contract di Base testnet',
      'Minimal 5 transaksi',
      'Interact dengan dApps'
    ],
    links: {
      website: 'https://base.org',
      faucet: 'https://faucet.quicknode.com/base',
      guide: 'https://docs.base.org'
    },
    walletAddresses: {
      primary: '0xabc...123'
    },
    tasks: [
      { id: 't5', title: 'Get Base Sepolia ETH dari faucet', type: 'website', url: 'https://faucet.quicknode.com/base', isCompleted: false },
      { id: 't6', title: 'Deploy simple contract', type: 'transaction', isCompleted: false },
      { id: 't7', title: 'Swap di Uniswap Base', type: 'website', url: 'https://app.uniswap.org', isCompleted: false }
    ],
    notes: 'Testnet airdrop, low risk tapi worth trying',
    dateAdded: '2025-01-20',
    tags: ['testnet', 'easy', 'base']
  },
];
