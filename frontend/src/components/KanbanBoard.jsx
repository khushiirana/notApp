import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Plus, MoreVertical } from 'lucide-react';

const KanbanBoard = () => {
    // Mock Data
    const [columns, setColumns] = useState({
        todo: {
            id: 'todo',
            title: 'To Do',
            items: [
                { id: '1', title: 'Research Quantum Entanglement', tag: 'Physics' },
                { id: '2', title: 'Buy Milk', tag: 'Personal' }
            ]
        },
        inProgress: {
            id: 'inProgress',
            title: 'In Progress',
            items: [
                { id: '3', title: 'Build Anti-Gravity Engine', tag: 'Work' }
            ]
        },
        done: {
            id: 'done',
            title: 'Done',
            items: [
                { id: '4', title: 'Submit Patent', tag: 'Legal' }
            ]
        }
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        // Find source and destination containers
        const sourceContainerId = Object.keys(columns).find(key =>
            columns[key].items.find(item => item.id === active.id)
        );
        const destContainerId = Object.keys(columns).find(key =>
            columns[key].items.find(item => item.id === over.id)
        ) || over.id; // Fallback if over a container directly

        if (!sourceContainerId || !destContainerId || sourceContainerId === destContainerId) {
            // Reordering within same column (simplified for now, can implement later)
            return;
        }

        // Move item
        const sourceColumn = columns[sourceContainerId];
        const destColumn = columns[destContainerId];
        const activeItem = sourceColumn.items.find(item => item.id === active.id);

        setColumns({
            ...columns,
            [sourceContainerId]: {
                ...sourceColumn,
                items: sourceColumn.items.filter(item => item.id !== active.id)
            },
            [destContainerId]: {
                ...destColumn,
                items: [...destColumn.items, activeItem]
            }
        });
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex gap-6 overflow-x-auto pb-4 h-full">
                {Object.values(columns).map(col => (
                    <Column key={col.id} column={col} />
                ))}
            </div>
        </DndContext>
    );
};

const Column = ({ column }) => {
    const { setNodeRef } = useSortable({ id: column.id });

    return (
        <div ref={setNodeRef} className="min-w-[300px] bg-black/20 backdrop-blur-md rounded-xl border border-gray-800 p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-300 uppercase tracking-wider text-sm flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${column.id === 'todo' ? 'bg-red-500' : column.id === 'inProgress' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                    {column.title}
                </h3>
                <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded-full">{column.items.length}</span>
            </div>

            <SortableContext items={column.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3 flex-1">
                    {column.items.map(item => (
                        <SortableItem key={item.id} item={item} />
                    ))}
                </div>
            </SortableContext>

            <button className="mt-3 flex items-center justify-center gap-2 w-full py-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors text-sm">
                <Plus size={16} /> Add Card
            </button>
        </div>
    );
};

const SortableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-glass border border-gray-700/50 p-4 rounded-lg shadow-sm hover:shadow-neon hover:border-neon-cyan/50 cursor-grab active:cursor-grabbing group transition-all">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-neon-cyan bg-neon-cyan/5 px-2 py-0.5 rounded border border-neon-cyan/10">{item.tag}</span>
                <button className="text-gray-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={14} />
                </button>
            </div>
            <h4 className="font-medium text-gray-200">{item.title}</h4>
        </div>
    );
};

export default KanbanBoard;
