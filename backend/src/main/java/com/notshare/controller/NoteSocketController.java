package com.notshare.controller;

import com.notshare.dto.NoteEvent;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NoteSocketController {

    // Client will send to: /app/note
    // Server will broadcast to: /topic/notes

    @MessageMapping("/note")
    @SendTo("/topic/notes")
    public NoteEvent handleNoteEvent(NoteEvent event) {
        return event; // broadcast same event
    }
}