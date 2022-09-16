package com.example.backend.controller;

import com.example.backend.entity.Order;
import com.example.backend.entity.pojo.OrderPojo;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders(){
        try {
            return new ResponseEntity<>(orderService.getAllOrder(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/orders")
    public ResponseEntity<String> saveNewOrder(@RequestBody OrderPojo orderPojo){
        try {
            orderService.createNewOrder(orderPojo);
            return new ResponseEntity<>("Add successfully",HttpStatus.OK);
        } catch (RecordNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    @PatchMapping ("/orders/{orderId}/{orderStatus}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long orderId,@PathVariable String orderStatus){
        try {
            Order order = orderService.getOrderById(orderId);
            order.setStatus(orderStatus);
            orderService.saveOrUpdateOrder(order);
            return new ResponseEntity<>(orderService.getOrderById(orderId), HttpStatus.OK);
        } catch (RecordNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
