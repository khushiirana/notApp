import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, FileEdit, Pin, Activity } from 'lucide-react';

const ActivityLog = ({ logs }) => {
    const scrollRef = useRef(null);

    // Auto-scroll to top on new log
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [logs]);

    const getIcon = (actionType) => {
        switch (actionType) {
            case 'CREATED': return <Plus size={14} className="text-green-400" />;
            case 'EDITED_CONTENT': return <FileEdit size={14} className="text-blue-400" />;
            case 'PINNED': return <Pin size={14} className="text-yellow-400" />;
            case 'STATUS_CHANGED': return <Activity size={14} className="text-purple-400" />;
            default: return <Clock size={14} className="text-gray-400" />;
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-full flex flex-col bg-black/20 border-l border-gray-800 backdrop-blur-md w-80">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="font-bold text-gray-200 text-sm uppercase tracking-wider flex items-center gap-2">
                    <Activity size={16} className="text-neon-cyan" />
                    Audit Trail
                </h3>
                <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-400">{logs.length}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: 20, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: 'auto' }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="relative pl-6 pb-2"
                        >
                            {/* Timeline Line */}
                            <div className="absolute left-[11px] top-6 bottom-[-16px] w-[2px] bg-gray-800 last:bottom-auto last:h-full"></div>

                            {/* Dot */}
                            <div className="absolute left-[4px] top-1.5 w-4 h-4 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center z-10">
                                {getIcon(log.actionType)}
                            </div>

                            <div className="bg-glass border border-white/5 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold text-gray-300">
                                        User {log.userId}
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-mono">
                                        {formatTime(log.createdAt)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                    {log.details}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {logs.length === 0 && (
                    <div className="text-center text-gray-600 text-xs py-10 italic">
                        No recent activity recorded.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLog;
