package org.example.santhit.payment.Dto;

import org.example.santhit.payment.entity.Payment;
import org.example.santhit.payment.entity.PaymentType;
import org.example.santhit.payment.entity.Payment.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record PaymentResponse(
        UUID id,
        UUID orderId,
        BigDecimal amount,
        String paymentMethod,
        PaymentType paymentType,
        PaymentStatus status,
        LocalDate paymentDate
) {
}