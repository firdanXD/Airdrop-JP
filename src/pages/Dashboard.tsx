import React, { useMemo } from 'react';
import { format, parseISO, isWithinInterval, subDays } from 'date-fns';
import { Clock, List, CheckCircle, Zap } from 'lucide-react';
import { useAirdrops } from '../context/AirdropContext';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/common/Badges';

export const DashboardPage = () => {
    const { airdrops, loading } = useAirdrops();
    const stats = useMemo(() => loading ? { todo: 0, inProgress: 0, completed: 0, claimed: 0 } : { todo: airdrops.filter(a => a.status === 'todo').length, inProgress: airdrops.filter(a => a.status === 'in-progress').length, completed: airdrops.filter(a => a.status === 'completed').length, claimed: airdrops.filter(a => a.status === 'claimed').length }, [airdrops, loading]);
    const upcomingDeadlines = useMemo(() => airdrops.filter(a => a.deadline && isWithinInterval(parseISO(a.deadline), { start: new Date(), end: subDays(new Date(), -7) })).sort((a, b) => parseISO(a.deadline!).getTime() - parseISO(b.deadline!).getTime()), [airdrops]);
    
    const StatCard = ({ title, value, icon, color, shadowColor }: { title: string, value: number, icon: React.ReactNode, color: string, shadowColor: string }) => (
        <Card className={`!shadow-[6px_6px_0px_0px_${shadowColor}] border-[${shadowColor}] border-l-8`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 uppercase font-bold">{title}</p>
                    <p className="text-4xl font-bold font-space-grotesk">{value}</p>
                </div>
                <div style={{color: color}}>{icon}</div>
            </div>
        </Card>
    );

    if (loading) return <p className="p-8">Loading dashboard...</p>;

    return (
        <div className="p-4 md:p-8">
            <h1 className="font-space-grotesk text-5xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="In Progress" value={stats.inProgress} icon={<Clock size={40} />} color="#FF1493" shadowColor="#FF1493" />
                <StatCard title="To Do" value={stats.todo} icon={<List size={40} />} color="#808080" shadowColor="#000" />
                <StatCard title="Completed" value={stats.completed} icon={<CheckCircle size={40} />} color="#22c55e" shadowColor="#22c55e" />
                <StatCard title="Claimed" value={stats.claimed} icon={<Zap size={40} />} color="#eab308" shadowColor="#eab308" />
            </div>
            {upcomingDeadlines.length > 0 && (
                <div className="mb-8">
                    <h2 className="font-space-grotesk text-3xl font-bold mb-4">Urgent Deadlines (Next 7 Days)</h2>
                    <Card className="!shadow-[6px_6px_0px_0px_#ef4444] border-red-500">
                        <ul className="space-y-3">
                            {upcomingDeadlines.map(a => (
                                <li key={a.id} className="flex justify-between items-center font-bold border-b-2 border-dashed border-gray-300 pb-2 last:border-b-0 last:pb-0">
                                    <span>{a.projectName}</span>
                                    <span className="text-red-600">{format(parseISO(a.deadline!), 'dd MMM, yyyy')}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            )}
            <div>
                <h2 className="font-space-grotesk text-3xl font-bold mb-4">Recent Activity</h2>
                <Card>
                    {airdrops.slice(0, 5).map(airdrop => (
                        <div key={airdrop.id} className="flex items-center justify-between p-3 border-b-2 border-black last:border-b-0">
                            <div>
                                <p className="font-bold">{airdrop.projectName}</p>
                                <p className="text-sm text-gray-500">Added on: {format(parseISO(airdrop.dateAdded), 'dd MMM yyyy')}</p>
                            </div>
                            <StatusBadge status={airdrop.status} />
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
};
