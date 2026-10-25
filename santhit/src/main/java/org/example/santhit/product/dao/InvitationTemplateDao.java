package org.example.santhit.product.dao;

import org.example.santhit.product.entity.InvitationTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InvitationTemplateDao extends JpaRepository <InvitationTemplate, UUID> {
}
