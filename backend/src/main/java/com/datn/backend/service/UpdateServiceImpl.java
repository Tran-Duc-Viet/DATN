package com.datn.backend.service;

import com.datn.backend.dao.DishRepository;
import com.datn.backend.dao.OrderDishRepository;
import com.datn.backend.dao.OrderRepository;
import com.datn.backend.dao.UserRepository;
import com.datn.backend.dto.*;
import com.datn.backend.entity.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class UpdateServiceImpl implements UpdateService {

    private OrderRepository orderRepository;

    private OrderDishRepository orderDishRepository;
    private DishRepository dishRepository;

    private UserRepository userRepository;

    private static final String url = "https://script.googleusercontent.com/macros/echo?user_content_key=eygyVr1cnep-GksKFqeIZIp2zvRIVjmsivNj23mtEt5uSALJ4v1W4jQFHB6YUR1bqm4U8OrRCrhOaerf4hP0NLeH6P7eZYH_m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLsvX4OvYi-wp_mIWmhpOl9cHrtgOTqmumbfU--NDPYVKXAk5qcZikk3Lo5X8UbMLsaQam9P0o4ZTvXzwMEKgiV7e2IDmSic6Nz9Jw9Md8uu&lib=MukYrzcbyrUCK5ymmeo3wtX1UNjcrtiVA";



    private static final String message="Chuyen tien an TRAN DUC VIET";
    private static final String message2="CHUYEN TIEN AN TRAN DUC VIET";


    private static final DateTimeFormatter CUSTOM_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");


    @Autowired
    public UpdateServiceImpl(OrderRepository orderRepository, OrderDishRepository orderDishRepository, DishRepository dishRepository , UserRepository userRepository){
        this.orderRepository=orderRepository;
        this.orderDishRepository=orderDishRepository;
        this.dishRepository=dishRepository;
        this.userRepository=userRepository;
    }



    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Long orderPurchaseId = purchase.getOrder().getId();
        Optional<Order> orderPurchase = orderRepository.findById(orderPurchaseId);

        if (!orderPurchase.isPresent()) {
            return null;
        }

        Order order = orderPurchase.get();

        // Ensure totalPrice and totalQuantity are not null
        BigDecimal currentTotalPrice = order.getTotalPrice() != null ? order.getTotalPrice() : BigDecimal.ZERO;
        BigDecimal purchaseTotalPrice = purchase.getOrder().getTotalPrice() != null ? purchase.getOrder().getTotalPrice() : BigDecimal.ZERO;

        int currentTotalQuantity = (order.getTotalQuantity() != -1) ? order.getTotalQuantity() : 0;
        int purchaseTotalQuantity = purchase.getOrder().getTotalQuantity();

        // Update total price
        BigDecimal totalPrice = currentTotalPrice.add(purchaseTotalPrice);
        order.setTotalPrice(totalPrice);

        // Update total quantity
        int totalQuantity = currentTotalQuantity + purchaseTotalQuantity;
        order.setTotalQuantity(totalQuantity);


        // Populate order with orderDishes
        Set<OrderDish> orderDishes = purchase.getOrderDishes();
        orderDishes.forEach(dish -> order.add(dish));

        // Save to database
        orderRepository.save(order);

        // Return a response
        return new PurchaseResponse("Success add dish to order");
    }

    @Override
    @Transactional
    public DeleteOrderDishResponse deleteOrderDish(Purchase purchase) {
        Long orderPurchaseId = purchase.getOrder().getId();

        // Retrieve the order info from dto
        Optional<Order> orderPurchase = orderRepository.findById(orderPurchaseId);
        if (!orderPurchase.isPresent()) {
            return new DeleteOrderDishResponse(false, "Order Not Found");
        }

        Order order = orderPurchase.get();

        // Ensure totalPrice and totalQuantity are not null
        BigDecimal currentTotalPrice = order.getTotalPrice() != null ? order.getTotalPrice() : BigDecimal.ZERO;
        int currentTotalQuantity = order.getTotalQuantity() != -1 ? order.getTotalQuantity() : 0;

        // Retrieve the first order dish from the purchase
        OrderDish orderDish = purchase.getOrderDishes().stream().findFirst().orElse(null);
        if (orderDish == null) {
            return new DeleteOrderDishResponse(false, "OrderDish Not Found");
        }

        // Update total price and quantity
        BigDecimal totalPrice = currentTotalPrice.subtract(orderDish.getUnitPrice().multiply(BigDecimal.valueOf(orderDish.getQuantity())));
        int totalQuantity = currentTotalQuantity - orderDish.getQuantity();




        // Ensure all order dishes can be deleted
        boolean canDelete = true;
        Set<OrderDish> orderDishes = purchase.getOrderDishes();
        for (OrderDish dish : orderDishes) {
            Optional<OrderDish> orderDish1=orderDishRepository.findById(dish.getId());
            if (!orderDish1.get().getStatus().equals("Processing")) {
                canDelete = false;
                break;
            }
        }

        if (!canDelete) {
            return new DeleteOrderDishResponse(false, "Cannot Delete Because Dishes are Preparing");
        }else{
            order.setTotalPrice(totalPrice);
            order.setTotalQuantity(totalQuantity);
            // Delete order dishes from database
            orderDishes.forEach(dish -> orderDishRepository.deleteById(dish.getId()));

            // Save to database and return a response
            orderRepository.save(order);
        }

        return new DeleteOrderDishResponse(true, "Delete Success");
    }

    @Override
    @Transactional
    public ChangeNameResponse changeName(Long id, NameWantToChange nameWantToChange){
        //retrieve the order info from dto
        Optional<Order> orderPurchase=orderRepository.findById(id);
        if(!orderPurchase.isPresent()){
            return new ChangeNameResponse(false,"Fail to change Name");
        }
        Order _order=orderPurchase.get();
        _order.setTableNum(nameWantToChange.getChangeName());
        orderRepository.save(_order);
        return new ChangeNameResponse(true,"Success");
    }

    @Override
    @Transactional
    public EndOrderResponse endOrder(Purchase purchase) {
        Long orderPurchaseId = purchase.getOrder().getId();

        // Retrieve the order info from dto
        Optional<Order> orderPurchase = orderRepository.findById(orderPurchaseId);
        if (!orderPurchase.isPresent()) {
            return new EndOrderResponse(false,"Order Not Found");
        }

        Order order = orderPurchase.get();
        order.setOrderDone(true);
        order.setStatus("Paying");
        orderRepository.save(order);
        return new EndOrderResponse(true,"End Ordering");
    }

    @Override
    @Transactional
    public Order doneOrderForPayByCash(Long id, Order order) {
        Optional<Order> orderPurchase=orderRepository.findById(order.getId());
        if(!orderPurchase.isPresent()){
            return null;
        }
        Order _order=orderPurchase.get();
        _order.setPayByCash(true);
        _order.setCustomerPay(order.getCustomerPay());
        _order.setReturnMoney(order.getReturnMoney());
        _order.setStatus("Paid");
        return orderRepository.save(_order);
    }

    @Override
    public ResponseCheck checkQr(Long id, GetQR getQR) {
        Optional<Order> orderPurchase = orderRepository.findById(id);
        if (!orderPurchase.isPresent()) {
            return new ResponseCheck(false, "Order not found");
        }
        Order _order = orderPurchase.get();
        double totalMoney=getQR.getTotalMoney();
        try {
            URL apiUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
            connection.setRequestMethod("GET");

            // Read response
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8));
            StringBuilder responseBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                responseBuilder.append(line);
            }
            reader.close();

            String jsonResponse = responseBuilder.toString();

            // Parse JSON using Jackson ObjectMapper
            ObjectMapper mapper = new ObjectMapper();
            TransactionResponse transactionResponse = mapper.readValue(jsonResponse, TransactionResponse.class);

            // Accessing parsed data
            List<Transaction> transactions = transactionResponse.getData();
            for (Transaction transaction : transactions) {
                if ((transaction.getDescription().contains(message)||transaction.getDescription().contains(message2))
                        && transaction.getAmount() >= totalMoney
                        && isWithinLastMinutes(transaction.getDateOccurred(), 3)) {
                    _order.setStatus("Paid");
                    orderRepository.save(_order);
                    return new ResponseCheck(true, "Success");
                }
            }

            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseCheck( false, "Not See Any Transaction");

    }

    @Override
    @Transactional
    public Order createOrder(CreateOrder createOrder) {
        Optional<User> user= userRepository.findById(createOrder.getUserId());
        if(!user.isPresent()){
            return null;
        }
        Order order=new Order();
        order.setTableNum(createOrder.getTableNum());
        order.setUser(user.get());
        order.setStatus("Ordering");
        orderRepository.save(order);
        return order;
    }

    @Override
    @Transactional
    public ResponseDeleteOrder deleteOrder(Long id){
        Optional<Order> orderDelete=orderRepository.findById(id);
        if(!orderDelete.get().getOrderDishes().isEmpty()){
            return new ResponseDeleteOrder(false, "Can delete this order");
        }else{
            orderRepository.delete(orderDelete.get());
        }

        return new ResponseDeleteOrder(true,"Delete success");

    }


    private static String getTodayDateString() {
        // Lấy ngày hiện tại
        LocalDate today = LocalDate.now();
        // Định dạng ngày hiện tại
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        // Trả về chuỗi ngày đã định dạng
        return today.format(formatter);
    }

    private static boolean isWithinLastMinutes(String dateTimeString, int minutes) {
        LocalDateTime dateTime = LocalDateTime.parse(dateTimeString, CUSTOM_FORMATTER);
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(dateTime, now);
        return duration.toMinutes() <= minutes;
    }



}
