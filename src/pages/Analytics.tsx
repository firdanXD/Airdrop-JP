import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import { useAirdrops } from '../context/AirdropContext';
import type { Airdrop } from '../types';
import { Card } from '../components/ui/Card';
import { format, parseISO } from 'date-fns';

export const AnalyticsPage = () => {
    const { airdrops } = useAirdrops();
    const statusData = useMemo(() => Object.entries(airdrops.reduce((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc; }, {} as Record<Airdrop['status'], number>)).map(([name, value]) => ({ name: name.replace('-', ' '), value })), [airdrops]);
    const monthlyCompletions = useMemo(() => { const months = Array.from({ length: 12 }, (_, i) => ({ name: format(new Date(2024, i), 'MMM'), completed: 0 })); airdrops.filter(a => a.status === 'completed' || a.status === 'claimed').forEach(a => { months[(a.dateCompleted ? parseISO(a.dateCompleted) : parseISO(a.dateAdded)).getMonth()].completed++; }); return months; }, [airdrops]);
    const successRate = useMemo(() => { const claimed = airdrops.filter(a => a.status === 'claimed').length; const finished = airdrops.filter(a => a.status === 'completed' || a.status === 'claimed').length; return finished === 0 ? 0 : Math.round((claimed / finished) * 100); }, [airdrops]);
    const COLORS = { 'todo': '#d1d5db', 'in progress': '#ec4899', 'completed': '#22c55e', 'claimed': '#f59e0b' };
    
    return (
        <div className="p-4 md:p-8">
            <h1 className="font-space-grotesk text-5xl font-bold mb-8">Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1"><h2 className="font-space-grotesk text-2xl font-bold mb-4">Status Distribution</h2><div style={{ width: '100%', height: 300 }}><ResponsiveContainer><PieChart><Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>{statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#000'} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div></Card>
                <Card className="lg:col-span-2"><h2 className="font-space-grotesk text-2xl font-bold mb-4">Monthly Completions</h2><div style={{ width: '100%', height: 300 }}><ResponsiveContainer><BarChart data={monthlyCompletions}><CartesianGrid strokeDasharray="3 3" stroke="#000" /><XAxis dataKey="name" stroke="#000" style={{fontFamily: 'Inter', fontWeight: 'bold'}}/><YAxis stroke="#000" style={{fontFamily: 'Inter', fontWeight: 'bold'}}/><Tooltip wrapperStyle={{ border: '2px solid black', backgroundColor: '#fff' }} /><Bar dataKey="completed" fill="#ec4899" stroke="#000" strokeWidth={2} /></BarChart></ResponsiveContainer></div></Card>
                <Card><h2 className="font-space-grotesk text-2xl font-bold mb-2">Success Rate</h2><p className="font-space-grotesk text-6xl font-bold text-green-500">{successRate}%</p><p className="text-gray-500">of finished airdrops were claimed.</p></Card>
            </div>
        </div>
    );
};