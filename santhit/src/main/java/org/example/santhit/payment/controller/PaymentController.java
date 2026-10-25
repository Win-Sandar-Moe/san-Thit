
package org.example.santhit.payment.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.santhit.payment.Dto.PaymentRequest;
import org.example.santhit.payment.Dto.PaymentResponse;
import org.example.santhit.payment.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentResponse> createPayment(
            @Valid @RequestBody PaymentRequest request) {

        PaymentResponse response = paymentService.createPayment(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponse> getPayment(
            @PathVariable UUID id) {
        return ResponseEntity.ok(paymentService.getPayment(id));
    }

    @GetMapping("/my-payments")
    public ResponseEntity<List<PaymentResponse>> getMyPayments() {
        return ResponseEntity.ok(
                paymentService.getMyPayments()
        );
    }

    @GetMapping("/admin")
    public ResponseEntity<List<PaymentResponse>> getAllPayments() {
        return ResponseEntity.ok(
                paymentService.getAllPayments()
        );
    }

    @PatchMapping("/admin/{id}/confirm")
    public ResponseEntity<PaymentResponse> confirmPayment(
            @PathVariable UUID id) {

        return ResponseEntity.ok(
                paymentService.confirmPayment(id)
        );
    }

    @PatchMapping("/admin/{id}/reject")
    public ResponseEntity<PaymentResponse> rejectPayment(
            @PathVariable UUID id) {

        return ResponseEntity.ok(
                paymentService.rejectPayment(id)
        );
    }

    @GetMapping("/admin/summary")
    public ResponseEntity<Map<String, Object>> getAdminPaymentSummary() {

        return ResponseEntity.ok(
                paymentService.getAdminPaymentSummary()
        );
    }
}
