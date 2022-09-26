package com.example.backend.repository;

import com.example.backend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "select * from comments where user_id == :userId", nativeQuery = true)
    List<Comment> getCommentByUserId(@Param("userId") Long userId);

    @Query(value = "select * from comments join reservations on comments.user_id = reservations.user_id and reservations.status = 'reserved'", nativeQuery = true)
    List<Comment> getCommentByReservations(@Param("userId") Long userId);
}