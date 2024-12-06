package com.datn.backend.dao;


import com.datn.backend.entity.OrderDish;
import com.datn.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin({"http://localhost:4200","*"})
public interface OrderDishRepository extends JpaRepository<OrderDish,Long> {
}
