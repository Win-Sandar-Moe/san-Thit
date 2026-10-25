package org.example.santhit.product.dao;

import org.example.santhit.product.entity.SiteAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SiteAdminDao extends JpaRepository<SiteAdmin, UUID> {
}
