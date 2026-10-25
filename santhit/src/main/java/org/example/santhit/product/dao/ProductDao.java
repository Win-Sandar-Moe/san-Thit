
package org.example.santhit.product.dao;

import org.example.santhit.product.dto.ProductDto;
import org.example.santhit.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductDao extends JpaRepository<Product, UUID> {

    @Query("""
        select new org.example.santhit.product.dto.ProductDto(
            p.id,
            p.name,
            p.image,
            p.price,
            p.size,
            c.name,
            i.name
        )
        from Product p
        left join p.category c
        left join p.invitationTemplate i
        where p.id = :id
    """)
    Optional<ProductDto> findProductById(@Param("id") UUID id);

    // Find products by invitation template
    @Query("""
        select new org.example.santhit.product.dto.ProductDto(
            p.id,
            p.name,
            p.image,
            p.price,
            p.size,
            c.name,
            i.name
        )
        from Product p
        left join p.category c
        left join p.invitationTemplate i
        where i.name = :invitationName
    """)
    List<ProductDto> findProductsByInvitationTemplateName(
            @Param("invitationName") String invitationName
    );

    // Find products by category
    @Query("""
        select new org.example.santhit.product.dto.ProductDto(
            p.id,
            p.name,
            p.image,
            p.price,
            p.size,
            c.name,
            i.name
        )
        from Product p
        left join p.category c
        left join p.invitationTemplate i
        where c.name = :categoryName
    """)
    List<ProductDto> findProductsByCategoryName(
            @Param("categoryName") String categoryName
    );

    // Find all products with pagination
    @Query("""
        select new org.example.santhit.product.dto.ProductDto(
            p.id,
            p.name,
            p.image,
            p.price,
            p.size,
            c.name,
            i.name
        )
        from Product p
        left join p.category c
        left join p.invitationTemplate i
    """)
    Page<ProductDto> listAllProducts(Pageable pageable);
}

