package org.example.santhit.order.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productId;
    private String category;
    private String image;
    private String invitationTemplate;
    private String name;
    private double price;
    @Column(nullable=false)
    private Integer quantity;
    private String size;

    public OrderItem(UUID productId,
                     String category,
                     String image,
                     String invitationTemplate,
                     String name,
                     double price,
                     Integer quantity,
                     String size) {
        this.productId = productId;
        this.category = category;
        this.image = image;
        this.invitationTemplate = invitationTemplate;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.size = size;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private ProductOrder productOrder;
}

