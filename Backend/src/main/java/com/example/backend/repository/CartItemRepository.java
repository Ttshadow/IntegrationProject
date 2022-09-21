package com.example.backend.repository;

import com.example.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query(value = "select * from cart_items where user_id = :userId", nativeQuery = true)
    List<CartItem> getAllCartItemByUserId(@Param("userId") Long userId);

    @Query(value = "select * from cart_items where user_id = :userId and menu_id = :menuId", nativeQuery = true)
    Optional<CartItem> getCartItemByUserAndMenu(@Param("userId")Long userId, @Param("menuId")Long menuId);
}
