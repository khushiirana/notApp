import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Save, X, Eye, Edit3, Trash2, Activity } from 'lucide-react';
import ActivityLog from './ActivityLog';

const NoteEditor = ({ onClose, onDelete }) => {
    const [content, setContent] = useState('# New Note\n\nStart typing here...');
    const [title, setTitle] = useState('');
    const [mode, setMode] = useState('edit'); // 'edit' | 'preview'
    const [showLogs, setShowLogs] = useState(false);

    // Mock Logs
    const [logs, setLogs] = useState([
        { id: 1, userId: 1, actionType: 'CREATED', details: 'Note created', createdAt: new Date().toISOString() },
        { id: 2, userId: 2, actionType: 'EDITED_CONTENT', details: 'Updated requirements section', createdAt: new Date().toISOString() }
    ]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#0B0E14] w-full max-w-5xl h-[85vh] rounded-2xl border border-gray-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-glass">
                    <input
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-transparent text-2xl font-bold text-white placeholder-gray-600 focus:outline-none w-full mr-4"
                    />

                    <div className="flex items-center gap-2">
                        <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800 mr-4">
                            <button
                                onClick={() => setMode('edit')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'edit' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                            >
                                <Edit3 size={14} /> Edit
                            </button>
                            <button
                                onClick={() => setMode('preview')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'preview' ? 'bg-neon-cyan text-black shadow-neon' : 'text-gray-400 hover:text-gray-200'}`}
                            >
                                <Eye size={14} /> Preview
                            </button>
                        </div>

                        <button
                            onClick={() => setShowLogs(!showLogs)}
                            className={`p-2.5 rounded-lg transition-all ${showLogs ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-gray-800 text-gray-400'}`}
                            title="Audit Trail"
                        >
                            <Activity size={20} />
                        </button>

                        <button className="p-2.5 rounded-lg bg-neon-cyan hover:bg-cyan-400 text-black font-bold transition-all shadow-neon flex items-center gap-2">
                            <Save size={18} /> Save
                        </button>
                        <button onClick={onClose} className="p-2.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Editor Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Write Pane */}
                    <div className={`flex-1 h-full bg-[#121212] ${mode === 'preview' ? 'hidden md:block border-r border-gray-800' : ''}`}>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-full bg-transparent p-6 text-gray-300 font-mono resize-none focus:outline-none leading-relaxed selection:bg-neon-cyan selection:text-black"
                            placeholder="Type formatting based on markdown..."
                        />
                    </div>

                    {/* Preview Pane */}
                    <div className={`flex-1 h-full bg-[#0B0E14] overflow-y-auto p-8 prose prose-invert max-w-none prose-headings:text-white prose-a:text-neon-cyan prose-code:text-gold prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 ${mode === 'edit' ? 'hidden md:block' : ''}`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    </div>

                    {/* Activity Log Panel */}
                    {showLogs && <ActivityLog logs={logs} />}
                </div>

                {/* Footer */}
                <div className="h-10 bg-glass border-t border-gray-800 flex items-center px-6 text-xs text-gray-500 justify-between">
                    <span>{content.length} characters</span>
                    <div className="flex gap-4">
                        <div className="flex gap-4">
                            <span
                                className="flex items-center gap-1 hover:text-red-400 cursor-pointer transition-colors"
                                onClick={() => {
                                    if (window.confirm('Delete this note?')) {
                                        if (onDelete) onDelete(); // Call prop if provided
                                        onClose();
                                    }
                                }}
                            >
                                <Trash2 size={12} /> Delete
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
