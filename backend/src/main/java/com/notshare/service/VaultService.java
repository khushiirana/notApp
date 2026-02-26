package com.notshare.service;

import com.notshare.model.PrivateVault;
import com.notshare.model.User;
import com.notshare.model.VaultMember;
import com.notshare.model.VaultMember.VaultMemberId;
import com.notshare.repository.PrivateVaultRepository;
import com.notshare.repository.UserRepository;
import com.notshare.repository.VaultMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VaultService {

    @Autowired
    private PrivateVaultRepository vaultRepository;

    @Autowired
    private VaultMemberRepository memberRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public PrivateVault createVault(String email, String vaultName, String segmentKey) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PrivateVault vault = new PrivateVault();
        vault.setVaultName(vaultName);
        vault.setSegmentKeyHash(passwordEncoder.encode(segmentKey));
        vault.setCreatorId(user.getId());

        PrivateVault savedVault = vaultRepository.save(vault);

        // Add creator as member
        VaultMember member = new VaultMember();
        member.setId(new VaultMemberId(savedVault.getId(), user.getId()));
        memberRepository.save(member);

        return savedVault;
    }

    @Transactional
    public void joinVault(String email, Long vaultId, String segmentKey) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PrivateVault vault = vaultRepository.findById(vaultId)
                .orElseThrow(() -> new RuntimeException("Vault not found"));

        if (!passwordEncoder.matches(segmentKey, vault.getSegmentKeyHash())) {
            throw new RuntimeException("Invalid Segment Key");
        }

        VaultMember member = new VaultMember();
        member.setId(new VaultMemberId(vault.getId(), user.getId()));
        memberRepository.save(member);
    }
}
