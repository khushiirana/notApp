package com.notshare.dto;

import lombok.Data;

@Data
public class VaultRequest {
    private String vaultName;
    private Long vaultId;
    private String segmentKey;
}
