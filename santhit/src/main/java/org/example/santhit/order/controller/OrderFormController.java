package org.example.santhit.order.controller;

import lombok.RequiredArgsConstructor;
import org.example.santhit.order.service.OrderFormService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orderForm")

public class OrderFormController {
    private final OrderFormService orderFormService;
    public record OrderFormDto(String description,BigDecimal deposit){}

    @PostMapping
    public ResponseEntity<String> createOrderForm( Principal principal,@RequestBody OrderFormDto orderFormDto){
        orderFormService.createOrderForm(
                principal.getName(),
                orderFormDto.description,
                orderFormDto.deposit
                );
        return ResponseEntity.ok("Successfully createOrderForm");
        }
    }
