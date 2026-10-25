package org.example.santhit.order.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record CustomerOrderResponse(
        UUID orderId,
        LocalDate createdAt,
        BigDecimal deposit,
        BigDecimal totalAmount,
        BigDecimal balance,
        String status,
        List<CustomerOrderRequest> products
) {
}