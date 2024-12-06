package com.datn.backend.dao;

import com.datn.backend.entity.Dish;
import com.datn.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin({"http://localhost:4200","*"})
public interface UserRepository extends JpaRepository<User,Long> {

    boolean existsByUserName(String userName);

    Optional<User> findByUserName(String userName);

    Optional<User> findByUserNameAndIsActiveTrue(String userName);

    Optional<User> findFirstByUserName(String username);

    Page<User> findByUserNameContaining(@Param("name") String name, Pageable pageable);

    boolean existsByUserNameAndIsActiveTrue(String userName);

    boolean existsByUserNameAndIsActiveFalse(String userName);

    Optional<User> findFirstByUserNameAndIsActiveTrue(String userName);
}
