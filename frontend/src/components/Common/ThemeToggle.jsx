import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg transition-all hover:scale-110 active:scale-95 group"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6 overflow-hidden">
                <motion.div
                    initial={false}
                    animate={{ y: theme === 'dark' ? -30 : 0, opacity: theme === 'dark' ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center text-yellow-500"
                >
                    <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{ y: theme === 'dark' ? 0 : 30, opacity: theme === 'dark' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center text-electric-cyan"
                >
                    <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" />
                </motion.div>
            </div>
        </button>
    );
};

export default ThemeToggle;
