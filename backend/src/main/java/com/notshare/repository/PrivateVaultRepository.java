package com.notshare.repository;

import com.notshare.model.PrivateVault;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateVaultRepository extends JpaRepository<PrivateVault, Long> {
}
