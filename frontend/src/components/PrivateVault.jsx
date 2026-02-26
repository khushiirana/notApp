import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, AlertTriangle, ShieldCheck, Plus, Users, Key } from 'lucide-react';
import axios from 'axios';

const PrivateVault = () => {
    const [mode, setMode] = useState('auth'); // 'auth', 'create', 'join', 'view'
    const [vaultId, setVaultId] = useState('');
    const [vaultName, setVaultName] = useState('');
    const [segmentKey, setSegmentKey] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Auth State
    const [currentVault, setCurrentVault] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/vaults/create', {
                vaultName,
                segmentKey
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess(`Vault "${response.data.vaultName}" created! ID: ${response.data.id}`);
            setMode('auth');
        } catch (err) {
            setError('Creation Failed. ' + (err.response?.data || err.message));
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8080/api/vaults/join', {
                vaultId,
                segmentKey
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Successfully joined vault segment.');
            setMode('auth');
        } catch (err) {
            setError('Access Denied. ' + (err.response?.data || err.message));
        }
    };

    // Simplified "View" mode for now - just showing the success state or options
    return (
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/40 backdrop-blur-xl border border-red-500/20 p-8 rounded-2xl w-full max-w-md shadow-2xl relative z-10"
            >
                {/* Header with decorative elements */}
                <div className="text-center mb-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-20 h-1 bg-red-500 shadow-[0_0_10px_#ef4444]"></div>
                    <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white tracking-[0.2em] uppercase">Private Vault</h2>
                    <p className="text-red-400 text-xs mt-2 font-mono">SECURE SEGMENT ACCESS</p>
                </div>

                {/* Mode Selection Tabs */}
                {mode !== 'view' && (
                    <div className="flex gap-2 mb-6 p-1 bg-black/50 rounded-lg">
                        <button
                            onClick={() => setMode('auth')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'auth' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Access
                        </button>
                        <button
                            onClick={() => setMode('create')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'create' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Create
                        </button>
                        <button
                            onClick={() => setMode('join')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'join' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Join
                        </button>
                    </div>
                )}

                {/* Forms */}
                <div className="min-h-[250px]">
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded mb-4 text-center text-sm"
                        >
                            {success}
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-4 text-center text-sm flex items-center justify-center gap-2"
                        >
                            <AlertTriangle size={14} /> {error}
                        </motion.div>
                    )}

                    {mode === 'create' && (
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Vault Name</label>
                                <input
                                    type="text"
                                    value={vaultName}
                                    onChange={(e) => setVaultName(e.target.value)}
                                    className="w-full bg-black/30 border border-gray-700 rounded p-2 text-white focus:border-red-500 focus:outline-none transition-colors"
                                    placeholder="Operation Blackout"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Segment Key (Password)</label>
                                <input
                                    type="password"
                                    value={segmentKey}
                                    onChange={(e) => setSegmentKey(e.target.value)}
                                    className="w-full bg-black/30 border border-gray-700 rounded p-2 text-white focus:border-red-500 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
                                <Plus size={18} /> Initialize Segment
                            </button>
                        </form>
                    )}

                    {mode === 'join' && (
                        <form onSubmit={handleJoin} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Vault ID</label>
                                <input
                                    type="text"
                                    value={vaultId}
                                    onChange={(e) => setVaultId(e.target.value)}
                                    className="w-full bg-black/30 border border-gray-700 rounded p-2 text-white focus:border-red-500 focus:outline-none transition-colors"
                                    placeholder="Enter Vault ID"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Segment Key</label>
                                <input
                                    type="password"
                                    value={segmentKey}
                                    onChange={(e) => setSegmentKey(e.target.value)}
                                    className="w-full bg-black/30 border border-gray-700 rounded p-2 text-white focus:border-red-500 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
                                <Users size={18} /> Join Segment
                            </button>
                        </form>
                    )}

                    {mode === 'auth' && (
                        <div className="text-center space-y-4">
                            <p className="text-gray-400 text-sm">Select an operation to proceed to the secure segment.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border border-gray-800 rounded bg-black/20 hover:border-red-500/50 cursor-pointer transition-all" onClick={() => setMode('create')}>
                                    <Plus className="mx-auto mb-2 text-red-500" />
                                    <span className="text-sm font-bold text-white">New</span>
                                </div>
                                <div className="p-4 border border-gray-800 rounded bg-black/20 hover:border-red-500/50 cursor-pointer transition-all" onClick={() => setMode('join')}>
                                    <Key className="mx-auto mb-2 text-red-500" />
                                    <span className="text-sm font-bold text-white">Join</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </motion.div>
        </div>
    );
};

export default PrivateVault;
