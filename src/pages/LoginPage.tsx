import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LoginPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn, signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please enter both email and password.');
            return;
        }
        if (!isLoginView && !username) {
            toast.error('Please enter a username.');
            return;
        }
        setLoading(true);
        try {
            if (isLoginView) {
                await signIn(email, password);
                toast.success('Logged in successfully!');
            } else {
                await signUp(email, password, username);
                toast.success('Account created successfully!');
            }
        } catch (error: any) {
            const errorMessage = error.code === 'auth/email-already-in-use'
                ? 'This email is already registered.'
                : error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'
                    ? 'Incorrect email or password.'
                    : 'Authentication failed.';
            toast.error(errorMessage);
            console.error("Authentication error:", error);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = "w-full p-3 border-[3px] border-black text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow";

    return (
        <div className="flex items-center justify-center min-h-screen funky-bg p-4">
             <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500;700&display=swap'); body { font-family: 'Inter', sans-serif; } .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; } .funky-bg { background-color: #f7f7f7; background-image: radial-gradient(#000 0.5px, transparent 0.5px); background-size: 15px 15px; }`}</style>
            <Card className="w-full max-w-md">
                <h1 className="font-space-grotesk text-4xl font-bold text-center mb-2">{isLoginView ? 'Login' : 'Sign Up'}</h1>
                <p className="text-center text-gray-600 mb-8">
                    {isLoginView ? 'Welcome back to your Airdrop Tracker!' : 'Create an account to start tracking airdrops.'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLoginView && (
                        <div>
                            <label htmlFor="username" className="block text-sm font-bold mb-1 font-space-grotesk uppercase">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={inputStyle}
                                placeholder="choose a username"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold mb-1 font-space-grotesk uppercase">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputStyle}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block text-sm font-bold mb-1 font-space-grotesk uppercase">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputStyle}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Processing...' : (isLoginView ? 'Login' : 'Create Account')}
                    </Button>
                </form>
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLoginView(!isLoginView)}
                        className="font-bold text-pink-600 hover:underline"
                    >
                        {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                    </button>
                </div>
            </Card>
        </div>
    );
};
