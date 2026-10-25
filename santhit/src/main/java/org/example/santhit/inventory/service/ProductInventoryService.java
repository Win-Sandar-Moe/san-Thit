package org.example.santhit.inventory.service;

import lombok.RequiredArgsConstructor;
import org.example.santhit.inventory.dao.ProductInventoryDao;
import org.example.santhit.inventory.dto.InventoryResponse;
import org.example.santhit.inventory.dto.ProductInventoryRequest;
import org.example.santhit.inventory.dto.ProductInventoryResponse;
import org.example.santhit.inventory.entity.ProductInventory;
import org.example.santhit.product.dao.ProductDao;
import org.example.santhit.product.entity.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductInventoryService {

    private final ProductInventoryDao productInventoryDao;
    private final ProductDao productDao;

    // ENTITY -> DTO
    public ProductInventoryResponse toInventoryDto(
            ProductInventory inventory
    ) {
        return new ProductInventoryResponse(
                inventory.getId(),
                inventory.getQuantity(),
                inventory.getProduct() != null
                        ? inventory.getProduct().getId()
                        : null
        );
    }
    // CREATE INVENTORY
    @Transactional
    public ProductInventoryResponse createInventory(
            ProductInventoryRequest request
    ) {
        if (request.productId() == null) {
            throw new RuntimeException("Product ID cannot be null");}

        if (request.quantity() == null || request.quantity() < 0) {
            throw new RuntimeException("Quantity cannot be negative");}

        Product product =
                productDao.findById(
                        request.productId()
                ).orElseThrow(() ->
                        new RuntimeException( "Product not found: " + request.productId()));

        ProductInventory inventory =
                productInventoryDao
                        .findByProductId(request.productId())
                        .orElse(null);
        if (inventory != null) {
            throw new RuntimeException(
                    "Inventory already exists for this product");
        }

        inventory = new ProductInventory();
        inventory.setProduct(product);
        inventory.setQuantity(request.quantity());
        ProductInventory saved = productInventoryDao.save(inventory);
        return toInventoryDto(saved);
    }
    // GET ALL INVENTORY
    public List<InventoryResponse> getAllInventory() {
        return productInventoryDao.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }
    // GET ONE INVENTORY
    public InventoryResponse getInventory(UUID productId) {
            ProductInventory inventory =
                productInventoryDao
                        .findByProductId(productId)
                        .orElseThrow(() ->
                                new RuntimeException( "Inventory not found"));
        return toResponse(inventory);
    }

    // UPDATE STOCK
    public record ProductInventoryRequestQuantity(Integer quantity) {
    }
    @Transactional
    public InventoryResponse updateInventory(
            UUID productId,
            ProductInventoryRequestQuantity request
    ) {
        if (request == null || request.quantity() == null) {
            throw new RuntimeException("Quantity cannot be null");
        }
        if (request.quantity() < 0) {
            throw new RuntimeException(
                    "Quantity cannot be negative"
            );
        }
        ProductInventory inventory =
                productInventoryDao
                        .findByProductId(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found"));
                inventory.setQuantity(request.quantity());
               ProductInventory saved = productInventoryDao.save(inventory);
        return toResponse(saved);
    }
    // ADD STOCK
    @Transactional
    public InventoryResponse addStock(UUID productId, int quantity) {
        if (quantity <= 0) {
            throw new RuntimeException(
                    "Stock quantity must be greater than 0"
            );
        }
        ProductInventory inventory =
                productInventoryDao
                        .findByProductId(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found" ));
        int newQuantity = inventory.getQuantity() + quantity;
        inventory.setQuantity(newQuantity);
        return toResponse(productInventoryDao.save(inventory)
        );
    }
    // DEDUCT STOCK

    @Transactional
    public void deductStock(
            UUID productId,
            Integer quantity
    ) {
        if (productId == null) {
            throw new RuntimeException(
                    "Product ID cannot be null" );
        }
        if (quantity == null || quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }
        ProductInventory inventory =
                productInventoryDao
                        .findByProductId(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Inventory not found for product: "+ productId));
        int currentStock = inventory.getQuantity();
        // STOCK SHORTAGE
        if (currentStock < quantity) {
            throw new RuntimeException(
                    "Not enough stock. Available: "
                            + currentStock
                            + ", Requested: "
                            + quantity
            );
        }
        // DEDUCT
        inventory.setQuantity(currentStock - quantity);
        productInventoryDao.save(inventory);
    }
     // DELETE INVENTORY
    @Transactional
    public void deleteInventory(UUID productId) {
            ProductInventory inventory =
                productInventoryDao
                        .findByProductId(productId)
                        .orElseThrow(() ->
                                new RuntimeException("Inventory not found"));
            productInventoryDao.delete(inventory);
    }
    // ENTITY -> INVENTORY RESPONSE
    private InventoryResponse toResponse(ProductInventory inventory) {
        int quantity = inventory.getQuantity();
        String status;
        if (quantity == 0) {
            status = "OUT_OF_STOCK";
        } else {
            status = "IN_STOCK";
        }
        return new InventoryResponse(
                inventory.getId(),
                inventory.getProduct().getId(),
                inventory.getProduct().getName(),
                inventory.getProduct().getImage(),
                quantity,
                status,
                inventory.getUpdatedAt()
        );
    }
}