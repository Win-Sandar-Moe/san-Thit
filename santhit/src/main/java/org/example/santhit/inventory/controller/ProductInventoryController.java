package org.example.santhit.inventory.controller;

import lombok.RequiredArgsConstructor;
import org.example.santhit.inventory.dto.InventoryResponse;
import org.example.santhit.inventory.dto.ProductInventoryResponse;
import org.example.santhit.inventory.dto.ProductInventoryRequest;
import org.example.santhit.inventory.service.ProductInventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static org.example.santhit.inventory.service.ProductInventoryService.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inventory")
public class ProductInventoryController {
    private final ProductInventoryService productInventoryService;
    @PostMapping
    public ProductInventoryResponse createInventory(@RequestBody ProductInventoryRequest request){
        return productInventoryService.createInventory(request);
    }
    @GetMapping("/all")
    public List<InventoryResponse> getAllInventory(){
        return productInventoryService.getAllInventory();
    }

    @PatchMapping("/{productId}/deduct")
    public ResponseEntity<Void> deductStock(@PathVariable UUID productId,@RequestParam Integer quantity) {
        productInventoryService.deductStock(productId,quantity);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteInventory( @PathVariable  UUID productId){
        productInventoryService.deleteInventory(productId);
        return ResponseEntity.ok().build();
    }
    @PatchMapping("/{productId}/addStock")
    public InventoryResponse addStock(@PathVariable UUID productId, @RequestParam Integer quantity){
       return  productInventoryService.addStock(productId,quantity);
    }
    @GetMapping("/{productId}")
    public InventoryResponse getInventory(@PathVariable UUID productId){
        return productInventoryService.getInventory(productId);
    }
    @PatchMapping("/{productId}")
    public InventoryResponse updateInventory(@PathVariable UUID productId, @RequestBody ProductInventoryRequestQuantity request){
        return productInventoryService.updateInventory(productId,request);
    }
}
