package com.datn.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="table_number")
    private String tableNum;

    @Column(name="total_quantity")
    private int totalQuantity;

    @Column(name="total_price")
    private BigDecimal totalPrice;

    @Column(name="status")
    private String status;

    @Column(name="pay_by_cash")
    private boolean payByCash;

    @Column(name = "customer_pay")
    private Double customerPay;

    @Column(name="return_money")
    private Double returnMoney;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    @Column(name="time_created")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private Date timeCreated;

    @Column(name="last_updated")
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private Date lastUpdated;

    @Column(name="order_done")
    private boolean orderDone;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderDish> orderDishes=new HashSet<>();

    public void add(OrderDish item){
        if(item!=null){
            if(orderDishes==null){
                orderDishes=new HashSet<>();
            }
            orderDishes.add(item);
            item.setOrder(this);
        }

    }






}
