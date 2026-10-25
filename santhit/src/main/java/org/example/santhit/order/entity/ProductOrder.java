package org.example.santhit.order.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.santhit.product.entity.Customer;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProductOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_id")
    private UUID orderId;
    @CreationTimestamp
    private LocalDate createdAt;
    @Column(nullable = false)
    private BigDecimal deposit;
    @Column(nullable = false)
    private BigDecimal totalAmount;
    @Column(nullable = false)
    private BigDecimal balance;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, mappedBy = "productOrder")
    private List<OrderItem> orderItems = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    public void addOrderItem(OrderItem orderItem) {
        orderItem.setProductOrder(this);
        this.orderItems.add(orderItem);
    }

    public void addCustomer(Customer customer) {
        this.customer = customer;
    }

    public enum Status {
        PENDING,
        CONFIRMED
    }
}
