package org.example.santhit.inventory.dto;

import java.util.UUID;

public record ProductInventoryRequest(
        Integer quantity,
        UUID productId
) {
}
