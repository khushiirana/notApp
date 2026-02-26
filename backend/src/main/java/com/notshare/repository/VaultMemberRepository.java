package com.notshare.repository;

import com.notshare.model.VaultMember;
import com.notshare.model.VaultMember.VaultMemberId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VaultMemberRepository extends JpaRepository<VaultMember, VaultMemberId> {
    List<VaultMember> findByIdUserId(Long userId);

    boolean existsByIdVaultIdAndIdUserId(Long vaultId, Long userId);
}
