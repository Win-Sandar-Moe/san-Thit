package org.example.santhit.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String image;
    private double price;
    @Enumerated(EnumType.STRING)
    private Size size;
    public enum Size{
        SMALL,BIG,A4,
        TENINCHES,
        ELEVENINCHES,
        SIZE4INCHES6INCHES
    }
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "invitation_template_id")
    private InvitationTemplate invitationTemplate;

    public Product(UUID id,
                   String name,
                   String image,
                   double price,
                   Size size) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.size = size;
    }
}
