package org.example.santhit.payment.Dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.example.santhit.payment.entity.PaymentType;

import java.math.BigDecimal;
import java.util.UUID;

public record PaymentRequest(

        @NotNull(message = "Order ID is required")
        UUID orderId,

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
        BigDecimal amount,

        @NotBlank(message = "Payment method is required")
        @Size(max = 50, message = "Payment method must not exceed 50 characters")
        String paymentMethod,

        @NotNull(message = "Payment type is required")
        PaymentType paymentType

) {}