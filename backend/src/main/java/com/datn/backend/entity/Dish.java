package com.datn.backend.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name="dish")
@Data
public class Dish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="price")
    private Double price;

    @Column(name = "dish_image_url")
    private String dishImageUrl;

    @Column(name="type_of_dish")
    private String typeOfDish;

    @Column(name="specification")
    private String specification;



}
