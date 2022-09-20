package com.example.backend.service;

import com.example.backend.entity.Order;
import com.example.backend.entity.pojo.OrderPojo;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private DiningTableRepository diningTableRepository;

    public List<Order> getAllOrder(){
        List<Order> orders = orderRepository.findAll();
        return orders;
    }
    public Order getOrderById(Long id) throws RecordNotFoundException {
        Optional<Order> order = orderRepository.findById(id);
        if(order.isPresent()){
            return order.get();
        }
        throw new RecordNotFoundException("Order Not Found.");
    }
    public void saveOrUpdateOrder(Order newOrder) throws RecordNotFoundException {
        if(newOrder.getId() == null){
            orderRepository.save(newOrder);
        }else{
            Order orderFromDb = getOrderById(newOrder.getId());
            orderFromDb.setStatus(newOrder.getStatus());
            orderFromDb.setPromotion(newOrder.getPromotion());
            orderFromDb.setDiningTable(newOrder.getDiningTable());
            orderFromDb.setTakeout(newOrder.isTakeout());
            orderFromDb.setUser(newOrder.getUser());
            orderFromDb.setTotalPrice(newOrder.getTotalPrice());
            orderFromDb.setDate(newOrder.getDate());
            orderFromDb.setOrderItemsList(newOrder.getOrderItemsList());
            orderRepository.save(orderFromDb);
        }
    }
    public List<Order> getOrderByUserId(Long userId){
        return orderRepository.getOrderByUserId(userId);
    }
    public List<Order> getOrderByTableId(Long tableId){
        return orderRepository.getOrderByTableId(tableId);
    }

    public void createNewOrder(OrderPojo orderPojo) throws RecordNotFoundException {
        Order order = new Order();
        order.setStatus(orderPojo.getStatus());
        order.setDate(new Date());
        order.setTakeout(orderPojo.getTakeout());
        order.setTotalPrice(orderPojo.getTotalPrice());
        order.setUser(userRepository.findById(orderPojo.getUserId()).get());
        order.setPromotion(promotionRepository.findById(orderPojo.getPromotionId()).get());
        order.setDiningTable(diningTableRepository.findById(orderPojo.getDiningTableId()).get());
//        saveOrUpdateOrder(order);
        System.out.println(order);
    }
}
