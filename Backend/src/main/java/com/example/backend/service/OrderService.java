package com.example.backend.service;

import com.example.backend.entity.CartItem;
import com.example.backend.entity.Order;
import com.example.backend.entity.OrderItems;
import com.example.backend.entity.User;
import com.example.backend.entity.pojo.OrderPojo;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private CartItemRepository cartItemRepository;

    public List<Order> getAllOrder() {
        List<Order> orders = orderRepository.findAll();
        return orders;
    }

    public Order getOrderById(Long id) throws RecordNotFoundException {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            return order.get();
        }
        throw new RecordNotFoundException("Order Not Found.");
    }

    public Order saveOrUpdateOrder(Order newOrder) throws RecordNotFoundException {
        if (newOrder.getId() == null) {
            newOrder.setUser(userRepository.findById(newOrder.getUser().getId()).get());
            if (newOrder.getPromotion().getDescription().length() > 0) {
                newOrder.setPromotion(promotionRepository.getPromotionByDescription(newOrder.getPromotion().getDescription()).get());
            }else {
                newOrder.setPromotion(null);
            }
            newOrder.setDiningTable(diningTableRepository.findById(1L).get());
            newOrder.setDate(new Date());
            newOrder.setStatus("Paid");
            Order order = orderRepository.save(newOrder);
            createNewOrderLists(order);
            removeAllItemsByUserId(order.getUser().getId());
            return order;
        } else {
            Order orderFromDb = getOrderById(newOrder.getId());
            orderFromDb.setStatus(newOrder.getStatus());
            orderFromDb.setPromotion(newOrder.getPromotion());
            orderFromDb.setDiningTable(newOrder.getDiningTable());
            orderFromDb.setTakeout(newOrder.isTakeout());
            orderFromDb.setUser(newOrder.getUser());
            orderFromDb.setTotalPrice(newOrder.getTotalPrice());
            orderFromDb.setDate(newOrder.getDate());
            orderFromDb.setOrderItemsList(newOrder.getOrderItemsList());
            return orderRepository.save(orderFromDb);
        }
    }

    public List<Order> getOrderByUserId(Long userId) {
        return orderRepository.getOrderByUserId(userId);
    }

    public List<Order> getOrderByTableId(Long tableId) {
        return orderRepository.getOrderByTableId(tableId);
    }

    public void createNewOrderLists(Order order) {
        List<OrderItems> orderItemsList = order.getOrderItemsList();
        for (OrderItems oi : orderItemsList) {
            oi.setOrder(order);
        }
        orderItemRepository.saveAll(orderItemsList);
    }

    public void removeAllItemsByUserId(Long userId) {
        List<CartItem> cartItems = cartItemRepository.getAllCartItemByUserId(userId);
        for (CartItem item : cartItems) {
            cartItemRepository.deleteById(item.getId());
        }
    }

    public List<CartItem> getAllOrderItems(Long userId) {
        return cartItemRepository.getAllCartItemByUserId(userId);
    }

    public User getUserInfo(Long userId) {
        return userRepository.findById(userId).get();
    }
}
