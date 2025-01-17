package com.datn.backend.dao;

import com.datn.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin({"http://localhost:4200","*"})
public interface OrderRepository extends JpaRepository<Order,Long> {
}
