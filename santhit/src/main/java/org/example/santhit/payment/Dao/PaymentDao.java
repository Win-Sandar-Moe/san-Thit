package org.example.santhit.payment.Dao;

import org.example.santhit.payment.entity.Payment;
import org.example.santhit.payment.entity.PaymentType;
import org.example.santhit.payment.entity.Payment.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface PaymentDao extends JpaRepository<Payment, UUID> {

    List<Payment> findByOrder_Customer_Id(UUID customerId);

    boolean existsByOrder_OrderIdAndPaymentTypeAndStatusIn(
            UUID orderId,
            PaymentType paymentType,
            Collection<PaymentStatus> statuses
    );

    @Query("""
        SELECT COALESCE(SUM(p.amount), 0)
        FROM Payment p
        WHERE p.order.orderId = :orderId
          AND p.paymentType = :type
          AND p.status = :status
    """)
    java.math.BigDecimal sumPaidAmount(
            @Param("orderId") UUID orderId,
            @Param("type") PaymentType type,
            @Param("status") PaymentStatus status
    );
}