package com.datn.backend.entity;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long  id;

    @Column(name = "username")
    private String userName;

    @Column(name = "password")
    private String userPassword;

    @Column(name = "is_active")
    private boolean isActive =true;

    @Column(name = "role", nullable = false)
    private String role;




}
