import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import Layout from '../components/Common/Layout';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/login');
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center relative">
                {/* Background Ambience */}
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-electric-cyan/10 dark:bg-royal-blue/20 rounded-full blur-[120px]" />
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 dark:bg-purple-500/10 rounded-full blur-[120px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-glass relative z-10"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h1>
                        <p className="text-gray-500 dark:text-gray-400">Join the Antigravity Network</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative group">
                            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-royal-blue dark:group-focus-within:text-electric-cyan transition-colors" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-royal-blue dark:focus:border-electric-cyan focus:ring-2 focus:ring-royal-blue/20 dark:focus:ring-electric-cyan/20 outline-none transition-all placeholder-gray-400"
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-royal-blue dark:group-focus-within:text-electric-cyan transition-colors" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-royal-blue dark:focus:border-electric-cyan focus:ring-2 focus:ring-royal-blue/20 dark:focus:ring-electric-cyan/20 outline-none transition-all placeholder-gray-400"
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-royal-blue dark:group-focus-within:text-electric-cyan transition-colors" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-royal-blue dark:focus:border-electric-cyan focus:ring-2 focus:ring-royal-blue/20 dark:focus:ring-electric-cyan/20 outline-none transition-all placeholder-gray-400"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-royal-blue to-purple-600 dark:from-electric-cyan dark:to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
                            type="submit"
                        >
                            <UserPlus className="w-5 h-5" />
                            Register
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-royal-blue dark:text-electric-cyan font-semibold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Register;
