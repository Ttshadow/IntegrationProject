package com.example.backend.controller;

import com.example.backend.entity.DiningTable;
import com.example.backend.entity.Reservation;
import com.example.backend.entity.pojo.ReservationPojo;
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
    public Reservation addDReservation(@RequestBody Reservation newReservation) throws RecordNotFoundException {
        reservationService.saveReservation(newReservation);
        return reservationService.getReservation(newReservation.getId());
    }

    @PostMapping("/userdashboard/reservation/statusrequest")
    public String getNewReservationStatus(@RequestBody ReservationPojo reservation) {
        //TODO: CHECK TIME PERIOD FOR VALIDATION IN THE BACKEND!! return httprequest bad request
        if (reservationService.getTableReservationAvailability(reservation.getStartTime(), reservation.getEndTime(), reservation.getNumberOfParty()).size() > 0) {
            return "pending";
        }
        return "rejected";
    }

    @GetMapping("/admindashboard/reservation/test")
    public void test() throws RecordNotFoundException{

    }

    @PostMapping("/admindashboard/reservation/tables")
    public List<DiningTable> getDiningTableForReservation(@RequestBody ReservationPojo reservation) {
        return reservationService.getTableReservationAvailability(reservation.getStartTime(), reservation.getEndTime(), reservation.getNumberOfParty());
    }

    @PutMapping("/admindashboard/reservation/editreservation")
    public void editReservation(@RequestBody Reservation reservation) {
        reservationService.saveUpdatedReservation(reservation);
    }
}
