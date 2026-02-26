import { useState, useEffect } from 'react';

// Mock data
const MOCK_NOTES = [
    { id: 1, title: "Project Alpha", content: "Launch sequence initiated. Check propulsion systems.", pinned: true, tags: [{ name: "Work" }, { name: "Urgent" }], createdAt: new Date().toISOString() },
    { id: 2, title: "Groceries", content: "Quantum milk, Nebular bread, Dark matter cheese.", pinned: false, tags: [{ name: "Personal" }], createdAt: new Date().toISOString() },
    { id: 3, title: "Idea", content: "App that translates cat meows to Shakespearean English.", pinned: false, tags: [{ name: "Idea" }], createdAt: new Date().toISOString() },
    { id: 4, title: "Meeting Notes", content: "Discussed the new antigravity engine specs.", pinned: true, tags: [{ name: "Work" }], createdAt: new Date().toISOString() },
];

export const useNotes = () => {
    const [notes, setNotes] = useState(MOCK_NOTES);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const togglePin = (id) => {
        setNotes(prevNotes => prevNotes.map(note =>
            note.id === id ? { ...note, pinned: !note.pinned } : note
        ));
    };

    const deleteNote = (id) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    return { notes, loading, error, togglePin, deleteNote };
};
