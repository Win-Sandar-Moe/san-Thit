package org.example.santhit.payment.service;

import lombok.RequiredArgsConstructor;
import org.example.santhit.exception.PaymentException;
import org.example.santhit.exception.ResourceNotFoundException;
import org.example.santhit.order.dao.ProductOrderDao;
import org.example.santhit.order.entity.ProductOrder;
import org.example.santhit.payment.Dao.PaymentDao;
import org.example.santhit.payment.Dto.PaymentRequest;
import org.example.santhit.payment.Dto.PaymentResponse;
import org.example.santhit.payment.entity.Payment;
import org.example.santhit.payment.entity.Payment.PaymentStatus;
import org.example.santhit.payment.entity.PaymentType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentDao paymentDao;
    private final ProductOrderDao productOrderDao;

    // CUSTOMER: Create Payment
    @Transactional
    public PaymentResponse createPayment(PaymentRequest request) {

        ProductOrder order = productOrderDao.findById(request.orderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found: " + request.orderId()
                        )
                );

        PaymentType type = request.paymentType();

        boolean alreadyExists =
                paymentDao.existsByOrder_OrderIdAndPaymentTypeAndStatusIn(
                        request.orderId(),
                        type,
                        List.of(
                                PaymentStatus.PAID,
                                PaymentStatus.PENDING
                        )
                );
        if (alreadyExists) {
            throw new PaymentException(
                    type + " payment has already been paid or is pending."
            );
        }

        BigDecimal requiredAmount;
        if (type == PaymentType.DEPOSIT) {
            requiredAmount = order.getDeposit();
        } else if (type == PaymentType.BALANCE) {
            // Deposit must be PAID before balance payment
            boolean depositPaid =
                    paymentDao.existsByOrder_OrderIdAndPaymentTypeAndStatusIn(
                            request.orderId(),
                            PaymentType.DEPOSIT,
                            List.of(PaymentStatus.PAID)
                    );
            if (!depositPaid) {
                throw new PaymentException(
                        "Please complete the deposit payment first."
                );
            }
            requiredAmount = order.getBalance();
        } else {
            throw new PaymentException("Invalid payment type.");
            }

        // Check outstanding amount
        if (requiredAmount == null
                || requiredAmount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new PaymentException(
                    "There is no outstanding amount for this payment."
            );
        }

        // Check payment amount
        if (request.amount() == null
                || request.amount().compareTo(requiredAmount) != 0) {
            throw new PaymentException(
                    "Invalid payment amount. Required amount is "
                            + requiredAmount
            );
        }

        // Create Payment
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(request.amount());
        payment.setPaymentMethod(request.paymentMethod());
        payment.setPaymentType(type);
        payment.setStatus(PaymentStatus.PENDING);
        Payment savedPayment = paymentDao.save(payment);
        return from(savedPayment);
    }

    // Get Payment By ID
    @Transactional(readOnly = true)
    public PaymentResponse getPayment(UUID id) {
        Payment payment = paymentDao.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found: " + id
                        )
                );
        return from(payment);
    }
    // CUSTOMER: Get My Payments
    @Transactional(readOnly = true)
    public List<PaymentResponse> getMyPayments() {
        UUID customerId = getCurrentCustomerId();
        return paymentDao.findByOrder_Customer_Id(customerId)
                .stream()
                .map(PaymentService::from)
                .toList();
    }
    // ADMIN: Get All Payments
    @Transactional(readOnly = true)
    public List<PaymentResponse> getAllPayments() {

        return paymentDao.findAll()
                .stream()
                .map(PaymentService::from)
                .toList();
    }
    // ADMIN: Confirm Payment
    @Transactional
    public PaymentResponse confirmPayment(UUID paymentId) {

        Payment payment = paymentDao.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found: " + paymentId
                        )
                );

        if (payment.getStatus() != PaymentStatus.PENDING) {
            throw new PaymentException(
                    "Only pending payments can be confirmed."
            );
        }
        payment.setStatus(PaymentStatus.PAID);
        Payment savedPayment = paymentDao.save(payment);
        return from(savedPayment);
    }
    // ADMIN: Reject Payment
    @Transactional
    public PaymentResponse rejectPayment(UUID paymentId) {

        Payment payment = paymentDao.findById(paymentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found: " + paymentId
                        )
                );

        if (payment.getStatus() != PaymentStatus.PENDING) {
            throw new PaymentException(
                    "Only pending payments can be rejected."
            );
        }

        payment.setStatus(PaymentStatus.REJECTED);
        Payment savedPayment = paymentDao.save(payment);
        return from(savedPayment);
    }
    // ADMIN: Payment Summary
    @Transactional(readOnly = true)
    public Map<String, Object> getAdminPaymentSummary() {

        List<Payment> payments = paymentDao.findAll();
        BigDecimal totalReceived = payments.stream()
                .filter(p -> p.getStatus() == PaymentStatus.PAID)
                .map(Payment::getAmount)
                .filter(amount -> amount != null)
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add
                );

        long totalPayments = payments.size();
        return Map.of(
                "totalReceived", totalReceived,
                "totalPayments", totalPayments
        );
    }
    // Get logged-in Customer ID
    private UUID getCurrentCustomerId() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();
        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new PaymentException(
                    "Please login first."
            );
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof Jwt jwt) {
            String customerId =
                    jwt.getClaimAsString("customerId");

            if (customerId == null
                    || customerId.isBlank()) {

                throw new PaymentException(
                        "Customer ID not found in JWT."
                );
            }
            try {
                return UUID.fromString(customerId);

            } catch (IllegalArgumentException e) {

                throw new PaymentException(
                        "Invalid Customer ID in JWT."
                );
            }
        }
        throw new PaymentException(
                "Cannot get Customer ID from authentication principal. "
                        + "Principal type: "
                        + principal.getClass().getSimpleName()
        );
    }
    // Payment Entity -> PaymentResponse DTO
    private static PaymentResponse from(Payment payment) {

        return new PaymentResponse(
                payment.getId(),
                payment.getOrder().getOrderId(),
                payment.getAmount(),
                payment.getPaymentMethod(),
                payment.getPaymentType(),
                payment.getStatus(),
                payment.getPaymentDate()
        );
    }
}