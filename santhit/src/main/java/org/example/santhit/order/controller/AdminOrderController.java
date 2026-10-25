package org.example.santhit.order.controller;

import lombok.RequiredArgsConstructor;
import org.example.santhit.order.dto.AdminOrderResponse;
import org.example.santhit.order.entity.ProductOrder;
import org.example.santhit.order.service.AdminOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor

public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<ProductOrder> updateStatus(
        @PathVariable UUID orderId,
        @RequestBody AdminOrderService.UpdateOrderStatusRequest request){
        ProductOrder order= adminOrderService.updateStatus(
                orderId,
                request.status()
        );
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public List<AdminOrderResponse> getAllOrders() {
        return adminOrderService.getAllOrders();
    }

    @GetMapping("/{orderId}")
    public AdminOrderResponse getOrderById(@PathVariable UUID orderId ) {
        return adminOrderService.getOrderById(orderId);
    }
}