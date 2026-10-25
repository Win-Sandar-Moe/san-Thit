package org.example.santhit.product.dao;

import org.example.santhit.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryDao extends JpaRepository<Category, UUID> {

}
