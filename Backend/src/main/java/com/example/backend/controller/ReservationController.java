package com.example.backend.controller;

import com.example.backend.entity.Reservation;
import com.example.backend.entity.User;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    //ADMIN SIDE
    @GetMapping("/admindashboard/reservation")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/admindashboard/reservation/pending")
    public List<Reservation> getAllPendingReservations() {
        return reservationService.getAllPendingReservations();
    }

    //USER SIDE
    @GetMapping("/userdashboard/reservation/{id}")
    public List<Reservation> getAllUserReservations(@PathVariable(value = "id")long id) {
        return reservationService.getAllUserReservation(id);
    }

    @PostMapping("/userdashboard/reservation/new")
    public List<Reservation> addDiningTable(@RequestBody Reservation newReservation) throws RecordNotFoundException {
        reservationService.saveReservation(newReservation);
        return reservationService.getAllReservations();
    }
}
