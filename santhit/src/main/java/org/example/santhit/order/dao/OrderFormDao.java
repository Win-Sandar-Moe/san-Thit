package org.example.santhit.order.dao;

import org.example.santhit.order.entity.OrderForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface  OrderFormDao extends JpaRepository<OrderForm, UUID> {


}
