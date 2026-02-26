package com.notshare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteEvent {
    private String type; // "create", "update", "delete", "pin"
    private Object payload;
}
