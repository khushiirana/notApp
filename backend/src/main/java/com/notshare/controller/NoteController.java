package com.notshare.controller;

import com.notshare.model.Note;
import com.notshare.model.NoteLog;
import com.notshare.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<Note> getAllNotes(Principal principal) {
        return noteService.getAllNotesForUser(principal.getName());
    }

    @PostMapping
    public Note createNote(@RequestBody Note note, Principal principal) {
        return noteService.createNote(principal.getName(), note);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note note, Principal principal) {
        // In real app, principal.getName() would be used for auth check inside service
        return noteService.updateNote(id, note, principal.getName());
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id, Principal principal) {
        noteService.deleteNote(id, principal.getName());
    }

    @GetMapping("/{id}/logs")
    public List<NoteLog> getNoteLogs(@PathVariable Long id) {
        return noteService.getNoteLogs(id);
    }
}
