package com.notshare.dto;

import com.notshare.model.BroadcastType;

public class NoteEvent {

    private String noteId;
    private String content;
    private BroadcastType type;

    public NoteEvent() {}

    public String getNoteId() {
        return noteId;
    }

    public void setNoteId(String noteId) {
        this.noteId = noteId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public BroadcastType getType() {
        return type;
    }

    public void setType(BroadcastType type) {
        this.type = type;
    }
}