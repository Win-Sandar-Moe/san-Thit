package org.example.santhit.order.service;

import lombok.RequiredArgsConstructor;
import org.example.santhit.inventory.service.ProductInventoryService;
import org.example.santhit.order.controller.ProductOrderController;
import org.example.santhit.order.dao.ProductOrderDao;
import org.example.santhit.order.dto.CustomerOrderRequest;
import org.example.santhit.order.dto.CustomerOrderResponse;
import org.example.santhit.order.entity.OrderItem;
import org.example.santhit.order.entity.ProductOrder;
import org.example.santhit.product.dao.CustomerDao;
import org.example.santhit.product.entity.Customer;
import org.example.santhit.voucher.service.VoucherService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductOrderService {

    private final ProductOrderDao productOrderDao;
    private final CustomerDao customerDao;
    private final ProductInventoryService productInventoryService;
    private final VoucherService voucherService;

    // PurchaseItem -> OrderItem
    public OrderItem toOrderItem(ProductOrderController.PurchaseItem item) {
        return new OrderItem(
                null,
                item.category(),
                item.image(),
                item.invitationTemplate(),
                item.name(),
                item.price(),
                item.quantity(),
                item.size()
        );
    }

    // CUSTOMER CREATE PRODUCT ORDER
    @Transactional
    public String saveProductOrder(
            String username,
            List<ProductOrderController.PurchaseItem> orderItems,
            BigDecimal deposit
    ) {
        if (orderItems == null || orderItems.isEmpty()) {
            throw new RuntimeException("Order items cannot be empty");
        }
        Customer customer = customerDao
                .findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // 3. CHECK + DEDUCT INVENTORY
        for (ProductOrderController.PurchaseItem item : orderItems) {
            if (item.productId() == null) {
                throw new RuntimeException("Product ID cannot be null");
            }
            if (item.quantity() == null ||
                    item.quantity() <= 0) {
                throw new RuntimeException("Quantity must be greater than 0");
            }
            productInventoryService.deductStock(
                    item.productId(),
                    item.quantity()
            );
        }

        // 4. CREATE PRODUCT ORDER
        ProductOrder productOrder = new ProductOrder();
        productOrder.addCustomer(customer);
        productOrder.setStatus(ProductOrder.Status.PENDING);

        for (ProductOrderController.PurchaseItem item : orderItems) {
            productOrder.addOrderItem(toOrderItem(item));
        }

        // 6. CALCULATE TOTAL AMOUNT
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (ProductOrderController.PurchaseItem item : orderItems) {
            BigDecimal price = BigDecimal.valueOf(item.price());
            BigDecimal quantity = BigDecimal.valueOf(item.quantity());
            BigDecimal itemTotal = price.multiply(quantity);
            totalAmount = totalAmount.add(itemTotal);
        }

        // 7. DEPOSIT
        if (deposit == null) {
            deposit = BigDecimal.ZERO;
        }
        if (deposit.compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException("Deposit cannot be negative");
        }
        if (deposit.compareTo(totalAmount) > 0) {
            throw new RuntimeException("Deposit cannot be greater than total amount");
        }

        BigDecimal balance = totalAmount.subtract(deposit);

        // 9. SET ORDER VALUES
        productOrder.setTotalAmount(totalAmount);
        productOrder.setDeposit(deposit);
        productOrder.setBalance(balance);
        ProductOrder savedOrder = productOrderDao.save(productOrder);

        //  CREATE VOUCHER
        voucherService.createVoucherByOrderId(savedOrder.getOrderId());
        return "ProductOrder saved successfully";
    }

    // SIMPLE SAVE ORDER
    @Transactional
    public ProductOrder saveOrder(UUID productId, Integer quantity) {
        productInventoryService.deductStock(
                productId,
                quantity
        );
        ProductOrder order = new ProductOrder();
        return productOrderDao.save(order);
    }

    // CUSTOMER ORDER LIST
    public List<CustomerOrderResponse> getProductsByUser(String username) {
        return getProductsByLoggedInUser(username);
    }

    // GET CUSTOMER ORDERS
    private List<CustomerOrderResponse> getProductsByLoggedInUser(String username) {
        List<CustomerOrderResponse> orders = new ArrayList<>();

        List<ProductOrder> productOrders =
                productOrderDao
                        .getProductsByLoggedInUser(username);
        for (ProductOrder productOrder : productOrders) {
            List<CustomerOrderRequest> products = new ArrayList<>();

            // ORDER ITEMS
            for (OrderItem orderItem : productOrder.getOrderItems()) {
                products.add(toProductDto(orderItem));
            }

            // ORDER RESPONSE
            CustomerOrderResponse response =
                    new CustomerOrderResponse(
                            productOrder.getOrderId(),
                            productOrder.getCreatedAt(),
                            productOrder.getDeposit(),
                            productOrder.getTotalAmount(),
                            productOrder.getBalance(),
                            productOrder.getStatus().name(),
                            products
                    );
            orders.add(response);
        }
        return orders;
    }

    // GET ORDER BY ID
    @Transactional(readOnly = true)
    public CustomerOrderResponse getOrderById(UUID orderId) {

        ProductOrder productOrder = productOrderDao.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found: " + orderId)
                );
        List<CustomerOrderRequest> products = new ArrayList<>();

        for (OrderItem orderItem : productOrder.getOrderItems()) {
            products.add(toProductDto(orderItem));
        }

        return new CustomerOrderResponse(
                productOrder.getOrderId(),
                productOrder.getCreatedAt(),
                productOrder.getDeposit(),
                productOrder.getTotalAmount(),
                productOrder.getBalance(),
                productOrder.getStatus().name(),
                products
        );
    }

    // ORDER ITEM -> DTO
    private CustomerOrderRequest toProductDto(OrderItem orderItem) {
        return new CustomerOrderRequest(
                orderItem.getProductId(),
                orderItem.getCategory(),
                orderItem.getImage(),
                orderItem.getInvitationTemplate(),
                orderItem.getName(),
                orderItem.getPrice(),
                orderItem.getQuantity(),
                orderItem.getSize()
        );
    }
}