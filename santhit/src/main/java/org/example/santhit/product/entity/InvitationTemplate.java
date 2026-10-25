package org.example.santhit.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class InvitationTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String image;

    @OneToMany(mappedBy="invitationTemplate")
    private List<Product> products=new ArrayList<>();
    public void addProduct (Product product){
        product.setInvitationTemplate(this);
        this.products.add(product);
    }
    public InvitationTemplate(String name, String image) {
        this.name = name;
        this.image = image;
    }
}
