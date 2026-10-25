package org.example.santhit.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("Customer")
public class Customer extends User{
 private String phoneNumber;
 private String address;

    public Customer(String username,
                    String password,
                    String email,
                    String phoneNumber,
                    String address) {
        super(username, password, email);
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
