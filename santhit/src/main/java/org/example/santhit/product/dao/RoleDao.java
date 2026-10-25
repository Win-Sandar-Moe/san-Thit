package org.example.santhit.product.dao;

import org.example.santhit.product.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleDao extends JpaRepository<Role, UUID> {
    Optional<Role> findByRoleName(String roleName);
}
