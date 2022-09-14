package com.example.backend.service;

import com.example.backend.entity.Order;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    public List<Order> getAllOrder(){
        return orderRepository.findAll();
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
            //orderFromDb.setUser(newOrder.getUser());
            //orderFromDb.setTotalPrice(newOrder.getTotalPrice());
            orderRepository.save(orderFromDb);
        }
    }
    public List<Order> getOrderByUserId(Long userId){
        return orderRepository.getOrderByUserId(userId);
    }
    public List<Order> getOrderByTableId(Long tableId){
        return orderRepository.getOrderByTableId(tableId);
    }
}
