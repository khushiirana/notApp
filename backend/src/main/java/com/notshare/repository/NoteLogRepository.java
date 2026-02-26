package com.notshare.repository;

import com.notshare.model.NoteLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoteLogRepository extends JpaRepository<NoteLog, Long> {
    List<NoteLog> findByNoteIdOrderByCreatedAtDesc(Long noteId);
}
