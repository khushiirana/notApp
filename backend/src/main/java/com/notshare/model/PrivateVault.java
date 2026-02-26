package com.notshare.model;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "private_vaults")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrivateVault {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vault_name", nullable = false, length = 100)
    private String vaultName;

    @Column(name = "segment_key_hash", nullable = false)
    private String segmentKeyHash;

    @Column(name = "creator_id", nullable = false)
    private Long creatorId;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
