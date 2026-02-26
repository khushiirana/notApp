package com.notshare.model;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.io.Serializable;

@Entity
@Table(name = "note_permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotePermission {

    @EmbeddedId
    private NotePermissionId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("noteId")
    @JoinColumn(name = "note_id")
    private Note note;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "access_level", length = 10, nullable = false)
    private AccessLevel accessLevel = AccessLevel.READ;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NotePermissionId implements Serializable {
        @Column(name = "note_id")
        private Long noteId;

        @Column(name = "user_id")
        private Long userId;
    }
}
