package org.example.santhit.product.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@DiscriminatorValue("ADMIN")
public class SiteAdmin extends User{
    public SiteAdmin(String username,
                     String password,
                     String email) {
        super(username, password, email);
    }
}
