package org.example.santhit.voucher.controller;

import lombok.RequiredArgsConstructor;
import org.example.santhit.voucher.dto.VoucherResponse;
import org.example.santhit.voucher.service.VoucherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/vouchers")
@RequiredArgsConstructor
public class VoucherController {

    private final VoucherService voucherService;

    @PostMapping("/{orderId}")
    public ResponseEntity<VoucherResponse> createVoucher(
            @PathVariable UUID orderId ) {
        VoucherResponse response = voucherService.createVoucherByOrderId(orderId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<VoucherResponse> getVoucher(
            @PathVariable UUID orderId) {
        VoucherResponse response = voucherService.getVoucherByOrderId(orderId);
        return ResponseEntity.ok(response);
    }
}