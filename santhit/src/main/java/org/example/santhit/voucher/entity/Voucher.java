package org.example.santhit.voucher.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.santhit.order.entity.ProductOrder;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "voucher")
@Getter
@Setter
@NoArgsConstructor
public class Voucher{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String voucherCode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "order_id",
            nullable = false,
            unique = true
    )
    private ProductOrder order;

    @Column(nullable = false, updatable = false)
    private LocalDate createdAt=LocalDate.now();

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private BigDecimal deposit;

    @Column(nullable = false)
    private BigDecimal balance;

    public Voucher(
            String voucherCode,
            ProductOrder order,
            BigDecimal totalAmount,
            BigDecimal deposit,
            BigDecimal balance
    ) {
        this.voucherCode = voucherCode;
        this.order = order;
        this.totalAmount = totalAmount;
        this.deposit = deposit;
        this.balance = balance;
    }
}