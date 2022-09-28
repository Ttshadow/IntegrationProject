package com.example.backend.controller;

import com.example.backend.entity.CartItem;
import com.example.backend.entity.Order;
import com.example.backend.entity.User;
import com.example.backend.entity.pojo.EditOrderPojo;
import com.example.backend.entity.pojo.OrderPojo;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.OrderService;
import com.example.backend.service.PromotionService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private PromotionService promotionService;
    @Autowired
    private UserService userService;

    @GetMapping("/admindashboard/orders")
    public ResponseEntity<List<Order>> getAllOrders(){
        try {
            return new ResponseEntity<>(orderService.getAllOrder(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping ("/admindashboard/orders")
    public ResponseEntity<Order> updateOrderStatus(@RequestBody EditOrderPojo orderPojo){
        try {
            Order order = orderService.getOrderById(orderPojo.getOrderId());
            order.setStatus(orderPojo.getOrderStatus());
            orderService.saveOrUpdateOrder(order);
            return new ResponseEntity<>(orderService.getOrderById(orderPojo.getOrderId()), HttpStatus.OK);
        } catch (RecordNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/admindashboard/orders")
    public ResponseEntity<?> saveNewOrder(@RequestBody Order order){
        try {
            orderService.createNewOrder(order);
            return ResponseEntity.ok("Add order successful");
        } catch (RecordNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/order/{userId}")
    public ResponseEntity<List<CartItem>> getAllOrderItems(@PathVariable Long userId){
        List<CartItem> orderItems = orderService.getAllOrderItems(userId);
        return ResponseEntity.ok(orderItems);
    }

    @GetMapping("/order/getuserinfo/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable Long userId){
        return ResponseEntity.ok(orderService.getUserInfo(userId));
    }

    @PostMapping("/order/saveorder")
    public ResponseEntity<?> saveOrder(@RequestBody Order order){
        try {
            return ResponseEntity.ok(orderService.saveOrUpdateOrder(order));
        } catch (RecordNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/validatepromotion")
    public ResponseEntity<?> validatePromotionCode(@RequestParam String promotionCode){
        return ResponseEntity.ok(promotionService.validatePromotionByCode(promotionCode));
    }

    @PostMapping("/order/edituser")
    public void updateUser(@RequestBody User user){
        try {
            userService.updateUser(user);
        } catch (RecordNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
