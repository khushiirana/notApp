package com.notshare.model;

public enum BroadcastType {
    CONTENT_UPDATE, // Live typing
    EDIT_LOCK, // Jab koi edit kar raha ho
    EDIT_UNLOCK, // Jab editing khatam ho jaye
    LIVE_CURSOR, // Cursor position share karne ke liye
    PIN_TOGGLE, // Real-time pin/unpin
    STATUS_CHANGE, // Kanban drag-and-drop update
    LOG_UPDATE // Real-time activity log
}
