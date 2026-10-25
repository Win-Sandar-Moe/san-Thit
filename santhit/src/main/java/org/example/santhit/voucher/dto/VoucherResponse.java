package org.example.santhit.voucher.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record VoucherResponse(
        String voucherCode,
        UUID orderId,
        String username,
        LocalDate createdAt,
        BigDecimal totalAmount,
        BigDecimal deposit,
        BigDecimal balance,
        List<VoucherItemResponse> items
) {
}