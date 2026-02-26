package com.notshare.controller;

import com.notshare.dto.NoteEvent;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*")
public class NoteSocketController {

    @MessageMapping("/note.add")
    @SendTo("/topic/notes")
    public NoteEvent addNote(NoteEvent noteEvent) {
        return noteEvent;
    }

    @MessageMapping("/note.update")
    @SendTo("/topic/notes")
    public NoteEvent updateNote(NoteEvent noteEvent) {
        return noteEvent;
    }

    @MessageMapping("/note.delete")
    @SendTo("/topic/notes")
    public Long deleteNote(Long noteId) {
        return noteId;
    }
}
