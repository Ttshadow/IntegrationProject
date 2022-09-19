package com.example.backend.service;


import com.example.backend.entity.Reservation;
import com.example.backend.entity.User;
import com.example.backend.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getAllPendingReservations() {
        return reservationRepository.findPendingReservationInOrder();
    }

    public void saveReservation(Reservation newReservation) {
        reservationRepository.save(newReservation);
    }

    public List<Reservation> getAllUserReservation(Long userId) {
        return reservationRepository.findAllReservationOfUser(userId);
    }
    //get all reservation
    //get all confirmed reservation for (date) and (>=capacity) (requested capacity)
    //get all table where table.status == available

}
