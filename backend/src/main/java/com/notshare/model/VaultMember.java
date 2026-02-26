package com.notshare.model;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "vault_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaultMember {

    @EmbeddedId
    private VaultMemberId id;

    @Column(name = "joined_at", updatable = false)
    private LocalDateTime joinedAt;

    @PrePersist
    protected void onCreate() {
        joinedAt = LocalDateTime.now();
    }

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VaultMemberId implements Serializable {
        @Column(name = "vault_id")
        private Long vaultId;

        @Column(name = "user_id")
        private Long userId;
    }
}
