package org.example.santhit.product.dto;

import org.example.santhit.product.entity.Product;

import java.util.UUID;

public record ProductDto(
        UUID id,
        String name,
        String image,
        double price,
        Product.Size size,
        String category,
        String invitationTemplate
) {
}