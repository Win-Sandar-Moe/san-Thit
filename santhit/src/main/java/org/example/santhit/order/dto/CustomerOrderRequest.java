package org.example.santhit.order.dto;

import java.util.UUID;

public record CustomerOrderRequest(
        UUID productId,
        String category,
        String image,
        String invitationTemplate,
        String name,
        double price,
        Integer quantity,
        String size
) {}
