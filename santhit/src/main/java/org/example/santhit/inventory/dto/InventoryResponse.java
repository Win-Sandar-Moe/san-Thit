package org.example.santhit.inventory.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record InventoryResponse(
        UUID id,
        UUID productId,
        String productName,
        String productImage,
        Integer quantity,
        String status,
        LocalDateTime updatedAt
) {
}