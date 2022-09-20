package com.example.backend.repository;

import com.example.backend.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItems, Long> {
    @Query(value = "select * from order_items where order_id = :orderId", nativeQuery = true)
    List<OrderItems> getOrderItemsByOrderId(@Param("orderId")Long orderId);
}
