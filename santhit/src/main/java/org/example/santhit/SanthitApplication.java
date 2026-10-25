package org.example.santhit;

import lombok.RequiredArgsConstructor;
import org.example.santhit.security.AuthService;
import org.example.santhit.product.service.ProductService;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@RequiredArgsConstructor
public class SanthitApplication {
    private final ProductService productService;
    private final AuthService authService;
    @Bean
    public ApplicationRunner runner(){
        return r->{
            //authService.createInt();
    //    productService.createInit();
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(SanthitApplication.class, args);
    }

}
