package com.example.backend.service;

import com.example.backend.entity.OrderItems;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.OrderItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }
    public List<OrderItems> getOrderItemByOrderId(Long orderId){
        return orderItemRepository.getOrderItemsByOrderId(orderId);
    }
    public OrderItems getOrderItemById(Long id) throws RecordNotFoundException {
        Optional<OrderItems> orderItems = orderItemRepository.findById(id);
        if(orderItems.isPresent()){
            return orderItems.get();
        }
        throw new RecordNotFoundException("Order Item Not Found.");
    }
    public void saveOrderItem(OrderItems orderItems){
        orderItemRepository.save(orderItems);
    }
    public void updateOrderItemQuantity(Long orderItemId, int quantity) throws RecordNotFoundException {
        OrderItems orderItem = getOrderItemById(orderItemId);
        orderItem.setQuantity(quantity);
        orderItemRepository.save(orderItem);
    }
    public void deleteOrderItemById(Long id){
        orderItemRepository.deleteById(id);
    }
}
