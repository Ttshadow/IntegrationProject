package com.example.backend.repository;

import com.example.backend.entity.DiningTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiningTableRepository extends JpaRepository<DiningTable, Long> {
    @Query(value = "select * from dining_tables where status = :tableStatus", nativeQuery = true)
    List<DiningTable> findDiningTableByStatus(@Param("tableStatus") String tableStatus);

    @Query(value = "select * from dining_tables where capacity >= :capacity and not status = :status and not id = 1", nativeQuery = true)
    List<DiningTable> findDiningTableWithoutStatus(@Param("status")String status, @Param("capacity") int capacity);
}
