package org.example.santhit.order.controller;

import lombok.RequiredArgsConstructor;
import org.example.santhit.order.dto.AdminOrderResponse;
import org.example.santhit.order.dto.CustomerOrderResponse;
import org.example.santhit.order.service.AdminOrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class CustomerOrderController {

    private final AdminOrderService adminOrderService;

    @GetMapping("/my-orders")
    public List<CustomerOrderResponse> getMyOrders(
            Principal principal
    ) {
        return adminOrderService.getMyOrders(principal.getName());
    }
}
