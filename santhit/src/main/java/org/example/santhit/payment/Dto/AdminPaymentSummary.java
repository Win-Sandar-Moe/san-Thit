package org.example.santhit.payment.Dto;

import java.math.BigDecimal;

public record AdminPaymentSummary(
        BigDecimal totalReceived,
        long totalPayments
) {
}