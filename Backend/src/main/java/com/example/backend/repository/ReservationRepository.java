package com.example.backend.repository;

import com.example.backend.entity.Reservation;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = "select * from reservations where dining_table_id = 7", nativeQuery = true)
    List<Reservation> findPendingReservationInOrder();

    @Query(value = "select * from reservations where user_id = :userId", nativeQuery = true)
    List<Reservation> findAllReservationOfUser(@Param("userId") long userId);
}
