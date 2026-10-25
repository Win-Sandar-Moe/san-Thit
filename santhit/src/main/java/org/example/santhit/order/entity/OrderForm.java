package org.example.santhit.order.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.santhit.product.entity.Customer;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderForm {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String description;
    @Column(nullable = false)
    private BigDecimal deposit;
    @ManyToOne
    private Customer customer;
    public void addCustomer(Customer customer){
        this.customer=customer;
    }
}
