package org.example.santhit.order.dto;

import java.util.UUID;

public record ProductOrderRequest(
        UUID productId,
        Integer quantity
) {}
