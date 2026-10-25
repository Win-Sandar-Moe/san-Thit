package org.example.santhit.inventory.dao;

import org.example.santhit.inventory.entity.ProductInventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProductInventoryDao extends JpaRepository<ProductInventory, UUID> {
    Optional<ProductInventory> findByProductId(UUID productId);
    boolean existsByProductId(UUID productId);

}
