package com.example.backend.controller;

import com.example.backend.entity.Order;
import com.example.backend.entity.OrderItems;
import com.example.backend.entity.pojo.EditOrderPojo;
import com.example.backend.entity.pojo.OrderPojo;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.OrderService;
import com.example.backend.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private PromotionService promotionService;

    @GetMapping("/admindashboard/orders")
    public ResponseEntity<List<Order>> getAllOrders(){
        try {
            return new ResponseEntity<>(orderService.getAllOrder(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/admindashboard/orders")
    public ResponseEntity<String> saveNewOrder(@RequestBody OrderPojo orderPojo){
        try {
            orderService.createNewOrder(orderPojo);
            return new ResponseEntity<>("Add successfully",HttpStatus.OK);
        } catch (RecordNotFoundException e) {
            throw new RuntimeException(e);
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
    @GetMapping("/order/{id}")
    public ResponseEntity<List<OrderItems>> getAllOrderItems(@PathVariable Long id){
        List<OrderItems> orderItems = orderService.getAllOrderItems(id);
        return ResponseEntity.ok(orderItems);
    }

    @GetMapping("/validatepromotion")
    public ResponseEntity<?> validatePromotionCode(@RequestParam String promotion){
        return ResponseEntity.ok(promotionService.validatePromotionByCode(promotion));
    }
}
