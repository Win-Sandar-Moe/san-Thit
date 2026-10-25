package org.example.santhit.voucher.service;

import lombok.RequiredArgsConstructor;
import org.example.santhit.order.dao.ProductOrderDao;
import org.example.santhit.order.entity.OrderItem;
import org.example.santhit.order.entity.ProductOrder;
import org.example.santhit.voucher.dao.VoucherDao;
import org.example.santhit.voucher.dto.VoucherItemResponse;
import org.example.santhit.voucher.dto.VoucherResponse;
import org.example.santhit.voucher.entity.Voucher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VoucherService {

    private final VoucherDao voucherDao;
    private final ProductOrderDao productOrderDao;

    // CREATE VOUCHER
    @Transactional
    public VoucherResponse createVoucherByOrderId(UUID orderId) {
        // 1. Find Order
        ProductOrder order =
                productOrderDao.findById(orderId)
                        .orElseThrow(() ->
                                new RuntimeException("Order not found: " + orderId));

        // 2. Check Voucher Already Exists
        if (voucherDao.existsByOrderOrderId(orderId)) {
            throw new RuntimeException( "Voucher already exists for order: " + orderId
            );
        }
        // 3. Generate Voucher Code
        String voucherCode = generateVoucherCode();
        // 4. Create Voucher
        Voucher voucher = new Voucher(
                        voucherCode,
                        order,
                        order.getTotalAmount(),
                        order.getDeposit(),
                        order.getBalance()
                );
        Voucher savedVoucher = voucherDao.save(voucher);
        // 6. Response
        return toResponse(savedVoucher);
    }
    // GET VOUCHER
    @Transactional(readOnly = true)
    public VoucherResponse getVoucherByOrderId(UUID orderId) {
        Voucher voucher =
                voucherDao.findByOrderOrderId(orderId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Voucher not found for order: "+ orderId)
                                );
        return toResponse(voucher);
    }
    // GENERATE VOUCHER CODE
    private String generateVoucherCode() {
        String code;
        do {
            code ="VCH-"
                            + LocalDate.now()
                            .toString()
                            .replace("-", "")
                            + "-"
                            + UUID.randomUUID()
                            .toString()
                            .substring(0, 6)
                            .toUpperCase();
        } while (
                voucherDao
                        .findByVoucherCode(code)
                        .isPresent()
        );
        return code;
    }
    // ENTITY -> DTO
    private VoucherResponse toResponse(Voucher voucher) {
        ProductOrder order = voucher.getOrder();
        List<VoucherItemResponse> items = new ArrayList<>();
        int no = 1;
        if (order != null && order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                BigDecimal price = BigDecimal.valueOf(item.getPrice());
                BigDecimal amount =
                        price.multiply(
                                BigDecimal.valueOf(item.getQuantity())
                        );
                items.add(new VoucherItemResponse(
                                no++,
                                item.getName(),
                                item.getQuantity(),
                                price,
                                amount
                        )
                );
            }
        }

        String username = null;
        if (order != null && order.getCustomer() != null) {
            username = order.getCustomer().getUsername();
        }

        return new VoucherResponse(
                voucher.getVoucherCode(),
                order.getOrderId(),
                username,
                voucher.getCreatedAt(),
                voucher.getTotalAmount(),
                voucher.getDeposit(),
                voucher.getBalance(),
                items
        );
    }
}
