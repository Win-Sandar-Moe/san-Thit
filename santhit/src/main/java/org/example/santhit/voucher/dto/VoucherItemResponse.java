package org.example.santhit.voucher.dto;

import java.math.BigDecimal;

public record VoucherItemResponse(
        int no,
        String productName,
        Integer quantity,
        BigDecimal price,
        BigDecimal amount
) {
}