package org.example.santhit.order.service;

import lombok.RequiredArgsConstructor;
import org.example.santhit.order.dao.OrderFormDao;
import org.example.santhit.order.entity.OrderForm;
import org.example.santhit.product.dao.CustomerDao;
import org.example.santhit.product.entity.Customer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class OrderFormService {
    private final OrderFormDao orderFormDao;
    private final CustomerDao customerDao;

    @Transactional
    public String createOrderForm(
            String username,
            String description,
            BigDecimal deposit
    ) {
        Customer customer = customerDao.findByUsername(username)
                        .orElseThrow(() -> new RuntimeException( "User not found"));
        if (deposit == null) { deposit = BigDecimal.ZERO;}
        if (deposit.compareTo( BigDecimal.ZERO ) < 0) {
          throw new RuntimeException("Deposit cannot be negative");
        }
        OrderForm orderForm =new OrderForm();
        orderForm.addCustomer(customer);
        orderForm.setDescription(description);
        orderForm.setDeposit(deposit);
        orderFormDao.save(orderForm);
        return "Successfully orderForm";
    }
}