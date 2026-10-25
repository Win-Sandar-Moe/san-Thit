package org.example.santhit.order.dao;

import org.example.santhit.order.entity.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductOrderDao extends JpaRepository<ProductOrder, UUID> {

    @Query("""
            select p from ProductOrder p left join p.customer c where c.username = :username
            """)
    List<ProductOrder> getProductsByLoggedInUser(@Param("username") String username);

    @Query("""
            select DISTINCT o 
            from ProductOrder o
            join o.orderItems oi 
            where oi.productId = :productId            
            """)
    List<ProductOrder> findOrdersByProductId(@Param("productId") UUID productId);

    @Query("""
            select DISTINCT p
            from ProductOrder p
            left join fetch p.orderItems
            left join fetch p.customer
            where p.orderId = :orderId
            """)
    Optional<ProductOrder> findOrderForVoucher(@Param("orderId") UUID orderId);
}
