package com.notshare.controller;

import com.notshare.dto.VaultRequest;
import com.notshare.model.PrivateVault;
import com.notshare.service.VaultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/vaults")
public class VaultController {

    @Autowired
    private VaultService vaultService;

    @PostMapping("/create")
    public ResponseEntity<?> createVault(@RequestBody VaultRequest request, Principal principal) {
        try {
            PrivateVault vault = vaultService.createVault(principal.getName(), request.getVaultName(),
                    request.getSegmentKey());
            return ResponseEntity.ok(vault);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinVault(@RequestBody VaultRequest request, Principal principal) {
        try {
            vaultService.joinVault(principal.getName(), request.getVaultId(), request.getSegmentKey());
            return ResponseEntity.ok("Successfully joined the vault segment.");
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
