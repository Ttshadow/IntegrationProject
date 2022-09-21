package com.example.backend.repository;

import com.example.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "select * from orders where user_id = :userId", nativeQuery = true)
    List<Order> getOrderByUserId(@Param("userId")Long userId);

    @Query(value = "select * from orders where table_id = :tableId", nativeQuery = true)
    List<Order> getOrderByTableId(@Param("tableId") Long tableId);
}
