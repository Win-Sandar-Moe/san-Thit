package org.example.santhit.inventory.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.santhit.product.entity.Product;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "product_inventory")
public class ProductInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false)
    private Integer quantity ;
    @OneToOne
    @JoinColumn(
            name = "product_id",
            nullable = false,
            unique = true
    )
    private Product product;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}