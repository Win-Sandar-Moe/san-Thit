package org.example.santhit.order.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record AdminOrderResponse(
        UUID orderId,
        LocalDate createdAt,
        BigDecimal deposit,
        BigDecimal totalAmount,
        BigDecimal balance,
        String status,
        String customer,
        List<CustomerOrderRequest> products
) {}
