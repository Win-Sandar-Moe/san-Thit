package org.example.santhit.product.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.santhit.product.dao.CategoryDao;
import org.example.santhit.product.dao.InvitationTemplateDao;
import org.example.santhit.product.dao.ProductDao;
import org.example.santhit.product.dto.CategoryDto;
import org.example.santhit.product.dto.InvitationTemplateDto;
import org.example.santhit.product.dto.ProductDto;
import org.example.santhit.product.entity.Category;
import org.example.santhit.product.entity.InvitationTemplate;
import org.example.santhit.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import static org.example.santhit.product.entity.Product.Size.*;
@Service
@RequiredArgsConstructor
public class ProductService {
    private final CategoryDao categoryDao;
    private final InvitationTemplateDao invitationTemplateDao;
    private final ProductDao productDao;

    public ProductDto findProductById(UUID id) {
        return productDao.findProductById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product Not Found"));
    }
    public List<ProductDto> listProductsByInvitationName(String invitationName) {
        return productDao.findProductsByInvitationTemplateName(invitationName);
    }

    public List<ProductDto> listProductsByCategoryName(String categoryName) {
        return productDao.findProductsByCategoryName(categoryName);
    }

    public Page<ProductDto> listAllProductWithPagination(int pageZeroBased, int size) {
        Pageable pageable = PageRequest.of(pageZeroBased, size, Sort.by("name").ascending());
        return productDao.listAllProducts(pageable);
    }
    public List<InvitationTemplateDto> listAllInvitationTemplate() {
        return invitationTemplateDao.findAll()
                .stream()
                .map(this::toInvitationDto)
                .toList();
    }

    public InvitationTemplateDto toInvitationDto(InvitationTemplate invitationTemplate) {
        return new InvitationTemplateDto(
                invitationTemplate.getId(),
                invitationTemplate.getName(),
                invitationTemplate.getImage()
        );
    }

    public List<CategoryDto> listAllCategory() {
        return categoryDao.findAll()
                .stream()
                .map(this::toCategoryDto)
                .toList();
    }

    public CategoryDto toCategoryDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getImage()
        );
    }

    @Transactional
    public void createInit() {
        List<Category> categories = List.of(
                new Category("Invitation Cards", "fatesar.png"),
                new Category("Fan", "YatTaung.png"),
                new Category("Book", "Book.png"),
                new Category("Birthday", "Birthday.png")
        );
        categoryDao.saveAll(categories);
        Map<String, Category> catMap = categories.stream()
                .collect(Collectors.toMap(Category::getName, Function.identity()));
        List<InvitationTemplate> invitationTemplates = List.of(
                new InvitationTemplate("PictureWedding", "picturewedding.png"),
                new InvitationTemplate("Wedding", "wedding.png"),
                new InvitationTemplate("Ahlu", "ahlu.png"),
                new InvitationTemplate("Birthday", "birthday.png"),
                new InvitationTemplate("Ahlu Book", "ahlubook.png"),
                new InvitationTemplate("Wedding Book", "weddingbook.png"),
                new InvitationTemplate("Ahlu YatTaung(thick)", "ahluYatTaung.png"),
                new InvitationTemplate("Ahlu YatTaung(thin)", "ahluYatTaungs.png"),
                new InvitationTemplate("Ahlu YatTaung(fan)", "ahluYatTaungFan.png"),
                new InvitationTemplate("Wedding YatTaung", "weddingYatTaung.png"),
                new InvitationTemplate("Wedding YatTaung(fan)", "weddingYatTaungfan.png")
        );
        invitationTemplateDao.saveAll(invitationTemplates);
        Map<String, InvitationTemplate> invitationTemplateMap = invitationTemplates.stream()
                .collect(Collectors.toMap(InvitationTemplate::getName, Function.identity()));
        List<Product> products = new ArrayList<>();
        var createProduct = new Object() {
            void add(String name,
                     String image,
                     double price,
                     Product.Size size,
                     Category category,
                     InvitationTemplate invitationTemplate
            ) {
                Product p = new Product(null, name, image, price, size);
                category.addProduct(p);
                invitationTemplate.addProduct(p);
                products.add(p);
            }
        };
        createProduct.add("ahlu1", "ahlu1.png", 250, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Ahlu"));
        createProduct.add("ahlu2", "ahlu2.png", 250, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Ahlu"));
        createProduct.add("ahlu3", "ahlu3.png", 350, BIG, catMap.get("Invitation Cards"), invitationTemplateMap.get("Ahlu"));
        createProduct.add("ahlu4", "ahlu4.png", 250, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Ahlu"));
        createProduct.add("ahlu5", "ahlu5.png", 250, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Ahlu"));
        createProduct.add("ahlu6", "ahlu6.png", 350, BIG, catMap.get("Invitation Cards"), invitationTemplateMap.get("Ahlu"));
        createProduct.add("picturewedding1", "picturewedding1.png", 300, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("PictureWedding"));
        createProduct.add("picturewedding2", "picturewedding2.png", 300, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("PictureWedding"));
        createProduct.add("picturewedding3", "picturewedding3.png", 300, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("PictureWedding"));
        createProduct.add("picturewedding4", "picturewedding4.png", 300, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("PictureWedding"));
        createProduct.add("picturewedding5", "picturewedding5.png", 300, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("PictureWedding"));
        createProduct.add("picturewedding6", "picturewedding6.png", 300, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("PictureWedding"));
        createProduct.add("picturewedding7", "picturewedding7.png", 300, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("PictureWedding"));
        createProduct.add("picturewedding8", "picturewedding8.png", 300, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("PictureWedding"));
        createProduct.add("picturewedding9", "picturewedding9.png", 300, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("PictureWedding"));
        createProduct.add("wedding1", "wedding1.png", 350, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Wedding"));
        createProduct.add("wedding2", "wedding2.png", 350, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Wedding"));
        createProduct.add("wedding3", "wedding3.png", 350, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Wedding"));
        createProduct.add("wedding4", "wedding4.png", 350, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Wedding"));
        createProduct.add("wedding5", "wedding5.png", 350, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Wedding"));
        createProduct.add("wedding6", "wedding6.png", 350, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Wedding"));
        createProduct.add("wedding7", "wedding7.png", 350, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Wedding"));
        createProduct.add("wedding8", "wedding8.png", 350, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Wedding"));
        createProduct.add("wedding9", "wedding9.png", 350, SMALL, catMap.get("Invitation Cards"), invitationTemplateMap.get("Wedding"));
        createProduct.add("ahlubook1.png", "ahlubook1.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Ahlu Book"));
        createProduct.add("ahlubook2.png", "ahlubook2.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Ahlu Book"));
        createProduct.add("ahlubook3.png", "ahlubook3.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Ahlu Book"));
        createProduct.add("ahlubook4.png", "ahlubook4.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Ahlu Book"));
        createProduct.add("ahlubook5.png", "ahlubook5.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Ahlu Book"));
        createProduct.add("ahlubook6.png", "ahlubook6.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Ahlu Book"));
        createProduct.add("ahlubook7.png", "ahlubook7.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Ahlu Book"));
        createProduct.add("ahlubook8.png", "ahlubook8.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Ahlu Book"));
        createProduct.add("ahlubook9.png", "ahlubook9.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Ahlu Book"));
        createProduct.add("weddingbook1", "weddingbook1.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Wedding Book"));
        createProduct.add("weddingbook2", "weddingbook2.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Wedding Book"));
        createProduct.add("weddingbook3", "weddingbook3.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Wedding Book"));
        createProduct.add("weddingbook4", "weddingbook4.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Wedding Book"));
        createProduct.add("weddingbook5", "weddingbook5.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Wedding Book"));
        createProduct.add("weddingbook6", "weddingbook6.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Wedding Book"));
        createProduct.add("weddingbook7", "weddingbook7.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Wedding Book"));
        createProduct.add("weddingbook8", "weddingbook8.png", 5000, A4, catMap.get("Book"), invitationTemplateMap.get("Wedding Book"));
        createProduct.add("ahluYatTaung1", "ahluYatTaung1.png", 800, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thick)"));
        createProduct.add("ahluYatTaung2", "ahluYatTaung2.png", 800, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thick)"));
        createProduct.add("ahluYatTaung3", "ahluYatTaung3.png", 800, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thick)"));
        createProduct.add("ahluYatTaung4", "ahluYatTaung4.png", 1500, ELEVENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thick)"));
        createProduct.add("ahluYatTaung5", "ahluYatTaung5.png", 1500, ELEVENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thick)"));
        createProduct.add("ahluYatTaung6", "ahluYatTaung6.png", 1500, ELEVENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thick)"));
        createProduct.add("ahluYatTaung7", "ahluYatTaung7.png", 1500, ELEVENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thick)"));
        createProduct.add("ahluYatTaungs1", "ahluYatTaungs1.png", 600, ELEVENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thin)"));
        createProduct.add("ahluYatTaungs2", "ahluYatTaungs2.png", 600, ELEVENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thin)"));
        createProduct.add("ahluYatTaungs3", "ahluYatTaungs3.png", 600, ELEVENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thin)"));
        createProduct.add("ahluYatTaungs4", "ahluYatTaungs4.png", 600, ELEVENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thin)"));
        createProduct.add("ahluYatTaungs5", "ahluYatTaungs5.png", 600, ELEVENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thin)"));
        createProduct.add("ahluYatTaungs6", "ahluYatTaungs6.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thin)"));
        createProduct.add("ahluYatTaungs7", "ahluYatTaungs7.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thin)"));
        createProduct.add("ahluYatTaungs8", "ahluYatTaungs8.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(thin)"));
        createProduct.add("ahluYatTaungFan1", "ahluYatTaungFan1.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(fan)"));
        createProduct.add("ahluYatTaungFan2", "ahluYatTaungFan2.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(fan)"));
        createProduct.add("ahluYatTaungFan3", "ahluYatTaungFan3.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(fan)"));
        createProduct.add("ahluYatTaungFan4", "ahluYatTaungFan4.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(fan)"));
        createProduct.add("ahluYatTaungFan5", "ahluYatTaungFan5.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(fan)"));
        createProduct.add("ahluYatTaungFan6", "ahluYatTaungFan6.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(fan)"));
        createProduct.add("ahluYatTaungFan7", "ahluYatTaungFan7.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(fan)"));
        createProduct.add("ahluYatTaungFan8", "ahluYatTaungFan8.png", 450, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Ahlu YatTaung(fan)"));
        createProduct.add("weddingYatTaung1", "weddingYatTaung1.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung"));
        createProduct.add("weddingYatTaung2", "weddingYatTaung2.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung"));
        createProduct.add("weddingYatTaung3", "weddingYatTaung3.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung"));
        createProduct.add("weddingYatTaung4", "weddingYatTaung4.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung"));
        createProduct.add("weddingYatTaung5", "weddingYatTaung5.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung"));
        createProduct.add("weddingYatTaung6", "weddingYatTaung6.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung"));
        createProduct.add("weddingYatTaung7", "weddingYatTaung7.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung"));
        createProduct.add("weddingYatTaung8", "weddingYatTaung8.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung"));
        createProduct.add("weddingYatTaungfan1", "weddingYatTaungfan1.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung(fan)"));
        createProduct.add("weddingYatTaungfan2", "weddingYatTaungfan2.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung(fan)"));
        createProduct.add("weddingYatTaungfan3", "weddingYatTaungfan3.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung(fan)"));
        createProduct.add("weddingYatTaungfan4", "weddingYatTaungfan4.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung(fan)"));
        createProduct.add("weddingYatTaungfan5", "weddingYatTaungfan5.png", 500, TENINCHES, catMap.get("Fan"), invitationTemplateMap.get("Wedding YatTaung(fan)"));
        createProduct.add("birthday1", "birthday1.png", 350, SIZE4INCHES6INCHES, catMap.get("Birthday"), invitationTemplateMap.get("Birthday"));
        createProduct.add("birthday2", "birthday2.png", 350, SIZE4INCHES6INCHES, catMap.get("Birthday"), invitationTemplateMap.get("Birthday"));
        createProduct.add("birthday3", "birthday3.png", 350, SIZE4INCHES6INCHES, catMap.get("Birthday"), invitationTemplateMap.get("Birthday"));
        createProduct.add("birthday4", "birthday4.png", 350, SIZE4INCHES6INCHES, catMap.get("Birthday"), invitationTemplateMap.get("Birthday"));
        createProduct.add("birthday5", "birthday5.png", 350, SIZE4INCHES6INCHES, catMap.get("Birthday"), invitationTemplateMap.get("Birthday"));
        createProduct.add("birthday6", "birthday6.png", 350, SIZE4INCHES6INCHES, catMap.get("Birthday"), invitationTemplateMap.get("Birthday"));
        createProduct.add("birthday7", "birthday7.png", 350, SIZE4INCHES6INCHES, catMap.get("Birthday"), invitationTemplateMap.get("Birthday"));
        createProduct.add("birthday8", "birthday8.png", 350, SIZE4INCHES6INCHES, catMap.get("Birthday"), invitationTemplateMap.get("Birthday"));
        createProduct.add("birthday9", "birthday9.png", 350, SIZE4INCHES6INCHES, catMap.get("Birthday"), invitationTemplateMap.get("Birthday"));

        productDao.saveAll(products);
    }
}
