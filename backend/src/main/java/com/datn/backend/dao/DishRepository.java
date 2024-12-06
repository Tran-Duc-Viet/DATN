package com.datn.backend.dao;

import com.datn.backend.entity.Dish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin({"http://localhost:4200","*"})
public interface DishRepository extends JpaRepository<Dish,Long> {

    Page<Dish> findByNameContaining(@Param("name") String name, Pageable pageable);
}
