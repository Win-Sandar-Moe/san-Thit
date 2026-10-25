package org.example.santhit.order.controller;

import lombok.RequiredArgsConstructor;
import org.example.santhit.order.dto.CustomerOrderResponse;
import org.example.santhit.order.service.AdminOrderService;
import org.example.santhit.order.service.ProductOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class ProductOrderController {

    private final ProductOrderService productOrderService;
    private final AdminOrderService adminOrderService;

    // PURCHASE ITEM
    public record PurchaseItem(
            UUID productId,
            String category,
            String image,
            String invitationTemplate,
            String name,
            double price,
            Integer quantity,
            String size
    ) { }

    // CREATE ORDER REQUEST
    public record CreateOrderRequest(
            List<PurchaseItem> items,
            BigDecimal deposit
    ) { }

    // CREATE ORDER
    @PostMapping
    public ResponseEntity<String> saveProductOrder(
            @RequestBody CreateOrderRequest request,
            Principal principal
    ) {
        productOrderService.saveProductOrder(
                principal.getName(),
                request.items(),
                request.deposit()
        );

        String message = "%s's Order saved successfully"
                        .formatted(principal.getName());
        return ResponseEntity.ok(message);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<CustomerOrderResponse> getOrderById(
            @PathVariable UUID orderId) {

        return ResponseEntity.ok(
                productOrderService.getOrderById(orderId)
        );
    }

    // CUSTOMER - MY ORDERS
    @GetMapping
    public List<CustomerOrderResponse> getBooksByLoggedInUser(
            Principal principal
    ) {
        return productOrderService.getProductsByUser(principal.getName());
    }
}