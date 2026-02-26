import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Shield, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[var(--color-obsidian)] text-white overflow-hidden relative selection:bg-neon-cyan selection:text-black">

            {/* Background Texture & Floating Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150"></div>
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-neon-cyan opacity-10 rounded-full blur-[120px] animate-pulse-neon" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gold opacity-5 rounded-full blur-[100px] animate-float" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold tracking-tighter"
                >
                    NOT<span className="text-neon-cyan">APP</span>
                </motion.div>
                <div className="space-x-6">
                    {user ? (
                        <Link to="/dashboard" className="px-6 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-white transition-all shadow-neon">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">Login</Link>
                            <Link to="/register" className="px-6 py-2 border border-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all shadow-gold font-bold">
                                Get Access
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-700 bg-glass text-sm font-medium text-gray-400">
                        <span className="text-neon-cyan">v2.0</span> • Anti-gravity Edition
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-black leading-tight mb-8 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Defy</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-500">Gravity.</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed border-l-2 border-gold pl-6">
                        Experience the future of note-taking. Secure, ephemeral, and designed for the void.
                    </p>

                    <div className="flex gap-4">
                        <Link to={user ? "/dashboard" : "/register"} className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2 group-hover:gap-4 transition-all">
                                Launch Workflow <ArrowRight size={20} />
                            </span>
                            <div className="absolute inset-0 bg-neon-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                        <button className="px-8 py-4 rounded-xl border border-gray-700 hover:border-gold hover:text-gold transition-colors font-medium">
                            View Demo
                        </button>
                    </div>
                </motion.div>

                {/* Visual Prompt Realization: 3D Dodecahedron & Notes */}
                <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
                    {/* Central Dodecahedron Representation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-gold/30 rounded-3xl rotate-45 animate-[spin_20s_linear_infinite] shadow-[0_0_100px_rgba(255,215,0,0.1)] backdrop-blur-sm"
                    >
                        <div className="absolute inset-4 border border-neon-cyan/50 rounded-full animate-ping opacity-20"></div>
                    </motion.div>

                    {/* Floating Notes */}
                    <FloatingCard delay={0} x="-30%" y="-20%" icon={<Shield className="text-gold" />} title="Private Vault" desc="AES-256 Encrypted" />
                    <FloatingCard delay={1.5} x="30%" y="-10%" icon={<Zap className="text-neon-cyan" />} title="Self-Destruct" desc="Ephemeral Notes" />
                    <FloatingCard delay={3} x="0%" y="40%" icon={<Box className="text-purple-400" />} title="Kanban" desc="Project Management" />
                </div>
            </main>

        </div>
    );
};

const FloatingCard = ({ delay, x, y, icon, title, desc }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8 }}
        className="absolute p-5 rounded-2xl bg-glass border border-gray-700/50 backdrop-blur-xl w-64 antigravity-float shadow-2xl"
        style={{ top: '50%', left: '50%', x, y, animationDelay: `${delay}s` }}
    >
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-white/5">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-white text-lg">{title}</h3>
                <p className="text-gray-400 text-sm mt-1">{desc}</p>
            </div>
        </div>
    </motion.div>
);

export default LandingPage;
