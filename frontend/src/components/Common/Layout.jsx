import React from 'react';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-soft-pearl dark:bg-obsidian transition-colors duration-500 relative overflow-hidden text-gray-800 dark:text-gray-100 font-sans">
            {/* Global Theme Toggle positioned absolute top-right */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle />
            </div>
            {children}
        </div>
    );
};

export default Layout;
