package org.example.santhit.product.controller;

import lombok.RequiredArgsConstructor;
import org.example.santhit.product.dto.CategoryDto;
import org.example.santhit.product.dto.InvitationTemplateDto;
import org.example.santhit.product.dto.ProductDto;
import org.example.santhit.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{id}")
    public ProductDto findProductById(@PathVariable UUID id){
        return productService.findProductById(id);
    }

    @GetMapping("/invitationName/{invitationName}")
    public List<ProductDto> listProductsByInvitationName(@PathVariable String invitationName){
        return productService.listProductsByInvitationName(invitationName);

    }
    @GetMapping("/category/{categoryName}")
    public List<ProductDto> listProductByCategoryName(@PathVariable String categoryName){
        return productService.listProductsByCategoryName(categoryName);
    }
    @GetMapping("/all")
    public ResponseEntity<Page<ProductDto>> listAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size){
        Page<ProductDto> product= productService.listAllProductWithPagination(page,size);
        return ResponseEntity.ok(product);
    }
    @GetMapping("/categorys")
    public List<CategoryDto> listAllCategory(){
        return productService.listAllCategory();
    }

    @GetMapping("/invitationTemplate")
    public List<InvitationTemplateDto>listAllInvitation(){
        return productService.listAllInvitationTemplate();
    }
}
