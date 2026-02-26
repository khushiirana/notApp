import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Menu, X, Home, Lock, Kanban, FileText,
    LogOut, Settings, Plus, LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth(); // Assuming logout function exists

    const menuItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Lock, label: 'Private Vault', path: '/vault' },
        { icon: Kanban, label: 'Kanban Board', path: '/kanban' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[var(--color-obsidian)] overflow-hidden text-gray-100 font-sans">
            {/* Sidebar */}
            <motion.aside
                initial={{ width: isSidebarOpen ? 240 : 80 }}
                animate={{ width: isSidebarOpen ? 240 : 80 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                className="h-full bg-glass border-r border-glass flex flex-col z-50 relative"
            >
                <div className="p-4 flex items-center justify-between border-b border-glass h-16">
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-2xl font-bold tracking-wider text-neon-cyan"
                            >
                                NOT<span className="text-gold">APP</span>
                            </motion.h1>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 rounded-lg hover:bg-glass text-gray-400 hover:text-white transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 py-6 px-2 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${location.pathname === item.path
                                    ? 'bg-glass-heavy border-l-2 border-neon text-neon-cyan shadow-neon'
                                    : 'hover:bg-glass text-gray-400 hover:text-white'
                                }`}
                        >
                            <item.icon size={22} className={`min-w-[22px] ${location.pathname === item.path ? 'text-neon-cyan' : 'group-hover:text-gold'}`} />
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="ml-3 font-medium whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {/* Active Indicator Glow */}
                            {location.pathname === item.path && (
                                <div className="absolute inset-0 bg-neon-cyan opacity-[0.03] z-[-1]" />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-glass">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center px-3 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 text-gray-400 transition-colors ${!isSidebarOpen && 'justify-center'
                            }`}
                    >
                        <LogOut size={22} />
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="ml-3 font-medium"
                                >
                                    Logout
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 relative h-full overflow-y-auto overflow-x-hidden">
                {/* Antigravity Floating Elements Background */}
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-10 left-1/4 w-64 h-64 bg-neon-cyan opacity-[0.02] rounded-full blur-[100px] antigravity-float" style={{ animationDelay: '0s' }} />
                    <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-gold opacity-[0.02] rounded-full blur-[120px] antigravity-float" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/3 right-10 w-48 h-48 bg-purple-500 opacity-[0.02] rounded-full blur-[80px] antigravity-float" style={{ animationDelay: '4s' }} />
                </div>

                <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
