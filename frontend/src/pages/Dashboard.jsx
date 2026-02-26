import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Pin, Plus, Search, Tag, Trash2 } from 'lucide-react';
import ThemeToggle from '../components/Common/ThemeToggle';
import { useNotes } from '../hooks/useNotes';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
import Layout from '../components/Layout';
import NoteEditor from '../components/NoteEditor';

// Mock data (fallback)
const MOCK_NOTES = [
    { id: 1, title: "Project Alpha", content: "Launch sequence initiated.", pinned: true, tags: [{ name: "Work" }], createdAt: new Date() },
    { id: 2, title: "Groceries", content: "Quantum milk, Nebular bread.", pinned: false, tags: [{ name: "Personal" }], createdAt: new Date() }
];

const Dashboard = () => {
    const { notes: initialNotes, togglePin, deleteNote } = useNotes() || { notes: MOCK_NOTES, togglePin: () => { }, deleteNote: () => { } };
    const [notes, setNotes] = useState(initialNotes || MOCK_NOTES);
    const [filterTag, setFilterTag] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    // const stompClientRef = useRef(null);

    // Sync state with hook
    useEffect(() => {
        if (initialNotes) setNotes(initialNotes);
    }, [initialNotes]);

    // WebSocket (Simplified for brevity - kept largely same as before)
    /*
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                client.subscribe('/topic/notes', (message) => {
                    const event = JSON.parse(message.body);
                    if (event.type === 'create') setNotes(prev => [event.payload, ...prev]);
                    // Handle delete/update events here too in real app
                });
            },
        });
        client.activate();
        stompClientRef.current = client;
        return () => client.deactivate();
    }, []);
    */

    const filteredNotes = notes.filter(note => {
        const matchesTag = filterTag ? note.tags?.some(tag => tag.name === filterTag) : true;
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTag && matchesSearch;
    });

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (a.pinned === b.pinned) return new Date(b.createdAt) - new Date(a.createdAt);
        return a.pinned ? -1 : 1;
    });

    const allTags = Array.from(new Set(notes.flatMap(n => n.tags ? n.tags.map(t => t.name) : [])));

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this note into the void?")) {
            // Update local state for immediate feedback
            setNotes(prev => prev.filter(n => n.id !== id));
            // Call hook/API
            if (deleteNote) deleteNote(id);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col h-[calc(100vh-100px)]">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                        <p className="text-gray-400 text-sm">Manage your missions.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Search sector..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-glass border border-white/10 focus:border-neon-cyan/50 focus:shadow-neon focus:outline-none text-gray-200 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        </div>
                        <button
                            onClick={() => setIsEditorOpen(true)}
                            className="bg-neon-cyan hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-xl shadow-neon flex items-center gap-2 transition-transform hover:scale-105"
                        >
                            <Plus size={18} /> New
                        </button>
                    </div>
                </div>

                {/* Filters */}
                {allTags.length > 0 && (
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        <button
                            onClick={() => setFilterTag(null)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!filterTag ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setFilterTag(tag === filterTag ? null : tag)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterTag === tag ? 'bg-neon-cyan text-black shadow-neon' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                )}

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-10 pr-2">
                    {sortedNotes.map((note) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className={`
                                group relative p-5 rounded-2xl backdrop-blur-xl border shadow-glass cursor-pointer flex flex-col h-[220px] transition-all
                                ${note.pinned
                                    ? 'bg-gradient-to-br from-white/10 to-neon-cyan/5 border-neon-cyan/30 shadow-[0_0_15px_rgba(0,243,255,0.1)]'
                                    : 'bg-white/5 border-white/10 hover:border-gold/30 hover:shadow-gold'
                                }
                            `}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-white line-clamp-1 pr-8">{note.title}</h3>
                                <div className="flex gap-1">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); togglePin(note.id); }}
                                        className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${note.pinned ? 'text-neon-cyan' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        <Pin size={14} className={note.pinned ? "fill-current" : ""} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                                        className="p-1.5 rounded-full hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 flex-1">
                                {note.content}
                            </p>

                            <div className="flex gap-2 mt-4 flex-wrap">
                                {note.tags && note.tags.map((tag, i) => (
                                    <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                                        {tag.name}
                                    </span>
                                ))}
                                <span className="text-[10px] text-gray-600 ml-auto pt-1">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </motion.div>
                    ))}

                    <button
                        onClick={() => setIsEditorOpen(true)}
                        className="border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-600 hover:text-neon-cyan hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all h-[220px] group"
                    >
                        <div className="p-4 rounded-full bg-gray-900 group-hover:scale-110 transition-transform mb-3">
                            <Plus size={24} />
                        </div>
                        <span className="font-bold tracking-wide">CREATE NOTE</span>
                    </button>
                </div>
            </div>

            {/* Editor Modal */}
            {isEditorOpen && (
                <NoteEditor onClose={() => setIsEditorOpen(false)} />
            )}
        </Layout>
    );
};

export default Dashboard;
