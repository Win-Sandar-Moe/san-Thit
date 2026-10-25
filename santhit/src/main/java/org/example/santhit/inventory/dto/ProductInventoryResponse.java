package org.example.santhit.inventory.dto;

import java.util.UUID;

public record ProductInventoryResponse(
        UUID id,
        Integer quantity,
        UUID productId
){

}
