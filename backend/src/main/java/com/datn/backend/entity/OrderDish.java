package com.datn.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="order_dish")
@Getter
@Setter
public class OrderDish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name= "name_of_dish")
    private String nameOfDish;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="number_of_dish")
    private int quantity;

    @Column(name="unit_price")
    private BigDecimal unitPrice;

    @Column(name="dish_id")
    private Long dishId;

    @Column(name="status")
    private String status;

    @Column(name="notice")
    private String notice;

    @Column(name="time_order")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private Date timeOrder;

    @Column(name="last_updated")
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private Date lastUpdated;

    @ManyToOne
    @JoinColumn(name="order_id")
    private Order order;


}
