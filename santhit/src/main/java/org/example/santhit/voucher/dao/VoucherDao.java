package org.example.santhit.voucher.dao;

import org.example.santhit.voucher.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface VoucherDao extends JpaRepository<Voucher, UUID> {
    Optional<Voucher> findByOrderOrderId(UUID orderId);
    boolean existsByOrderOrderId(UUID orderId);
    Optional<Voucher> findByVoucherCode(String voucherCode);
}