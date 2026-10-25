package org.example.santhit.product.dao;

import org.example.santhit.product.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CustomerDao extends JpaRepository<Customer, UUID> {
    Optional<Customer> findByUsername(String username);
}
