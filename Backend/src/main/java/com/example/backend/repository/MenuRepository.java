package com.example.backend.repository;

import com.example.backend.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    @Query(value = "select * from menus where category_id == :categoryId", nativeQuery = true)
    List<Menu> getMenuByCategoryId(@Param("categoryId") Long categoryId);
}
