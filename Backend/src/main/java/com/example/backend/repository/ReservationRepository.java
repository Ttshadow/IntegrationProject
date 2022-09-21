package com.example.backend.repository;

import com.example.backend.entity.Reservation;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = "select * from reservations where dining_table_id = 1", nativeQuery = true)
    List<Reservation> findPendingReservationInOrder();

    @Query(value = "select * from reservations where user_id = :userId", nativeQuery = true)
    List<Reservation> findAllReservationOfUser(@Param("userId") long userId);

    @Query(value = "select * from reservations where status = :status and (DATE(start_time) = DATE(:date))", nativeQuery = true)
    List<Reservation> findSpecificReservation(@Param("status") String status, @Param("date") Date date);

    @Query(value = "select * from reservations where status = :status and (DATE(start_time) = DATE(:date)) and dining_table_id = :tableId order by start_time", nativeQuery = true)
    List<Reservation> findSpecificReservationById(@Param("status") String status, @Param("date") Date date, @Param("tableId")long tableId);
}
