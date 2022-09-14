package com.example.backend.repository;

import com.example.backend.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    @Query(value = "select * from promotions where status == :stauts", nativeQuery = true)
    List<Promotion> getPromotionByStatus(@Param("status")Boolean status);
}
