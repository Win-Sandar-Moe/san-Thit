package org.example.santhit.order.service;

import lombok.RequiredArgsConstructor;
import org.example.santhit.order.dao.ProductOrderDao;
import org.example.santhit.order.dto.AdminOrderResponse;
import org.example.santhit.order.dto.CustomerOrderRequest;
import org.example.santhit.order.dto.CustomerOrderResponse;
import org.example.santhit.order.entity.ProductOrder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminOrderService {

    private final ProductOrderDao productOrderDao;

    // ADMIN - GET ALL ORDERS
    public List<AdminOrderResponse> getAllOrders() {
        return productOrderDao.findAll()
                .stream()
                .map(this::toAdminOrderResponse)
                .toList();
    }

    // ADMIN - GET ONE ORDER
    public AdminOrderResponse getOrderById(UUID orderId ) {
        ProductOrder order = productOrderDao.findById(orderId)
                        .orElseThrow(() ->
                                new RuntimeException("Order not found: " + orderId));
        return toAdminOrderResponse(order);
    }

    // ADMIN - UPDATE ORDER STATUS
    @Transactional
    public ProductOrder updateStatus(
            UUID orderId,
            ProductOrder.Status status
    ) {
        ProductOrder order =
                productOrderDao.findById(orderId)
                        .orElseThrow(() ->
                                new RuntimeException("Order not found:"+orderId));
        if (status == null) {
            throw new RuntimeException( "Status cannot be null");
        }
        order.setStatus(status);
        return productOrderDao.save(order);
    }

    // CUSTOMER - GET MY ORDERS
    public List<CustomerOrderResponse> getMyOrders(String username) {
    List<ProductOrder> orders =
                productOrderDao.getProductsByLoggedInUser(username);
        return orders.stream()
                .map(this::toCustomerOrderResponse)
                .toList();
    }
    // ADMIN DTO
    private AdminOrderResponse toAdminOrderResponse(
            ProductOrder order
    ) {
        List<CustomerOrderRequest> products =
                order.getOrderItems()
                        .stream()
                        .map(item ->
                                new CustomerOrderRequest(
                                        item.getProductId(),
                                        item.getCategory(),
                                        item.getImage(),
                                        item.getInvitationTemplate(),
                                        item.getName(),
                                        item.getPrice(),
                                        item.getQuantity(),
                                        item.getSize()
                                )
                        )
                        .toList();
        String customerName = "Unknown";
        if (order.getCustomer() != null) {
            customerName = order.getCustomer().getUsername();
        }
        String status =
                order.getStatus() != null
                        ? order.getStatus().name()
                        : ProductOrder.Status.PENDING.name();
        return new AdminOrderResponse(
                order.getOrderId(),
                order.getCreatedAt(),
                order.getDeposit(),
                order.getTotalAmount(),
                order.getBalance(),
                status,
                customerName,
                products
        );
    }
    // CUSTOMER DTO
    private CustomerOrderResponse toCustomerOrderResponse(
            ProductOrder order
    ) { List<CustomerOrderRequest> products =
                order.getOrderItems()
                        .stream()
                        .map(item ->
                                new CustomerOrderRequest(
                                        item.getProductId(),
                                        item.getCategory(),
                                        item.getImage(),
                                        item.getInvitationTemplate(),
                                        item.getName(),
                                        item.getPrice(),
                                        item.getQuantity(),
                                        item.getSize()
                                )
                        )
                        .toList();
        String status =
                order.getStatus() != null
                        ? order.getStatus().name()
                        : ProductOrder.Status.PENDING.name();
        return new CustomerOrderResponse(
                order.getOrderId(),
                order.getCreatedAt(),
                order.getDeposit(),
                order.getTotalAmount(),
                order.getBalance(),
                status,
                products
        );
    }

    // UPDATE STATUS REQUEST
    public record UpdateOrderStatusRequest(
            ProductOrder.Status status
    ) { }
}