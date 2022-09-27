package com.example.backend.service;


import com.example.backend.entity.DiningTable;
import com.example.backend.entity.Reservation;
import com.example.backend.entity.User;
import com.example.backend.repository.DiningTableRepository;
import com.example.backend.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final DiningTableRepository diningTableRepository;

    public ReservationService(ReservationRepository reservationRepository, DiningTableRepository diningTableRepository) {
        this.reservationRepository = reservationRepository;
        this. diningTableRepository = diningTableRepository;
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

    public boolean getTableReservationAvailability(Date startTime, Date endTime, int capacity) {
        List<DiningTable> potentialTables = diningTableRepository.findDiningTableWithoutStatus("unavailable", capacity);
        List<DiningTable> toRemoveTables = new ArrayList<>();
        Set<DiningTable> uniqueTables = new HashSet<DiningTable>();
        List<Reservation> selectedConfirmedReservation = reservationRepository.findSpecificReservation("confirmed", startTime);
        LocalTime start = startTime.toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
        LocalTime end = endTime.toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();

        //Finding all the available table only
        for (Reservation reservation: selectedConfirmedReservation) {
            for (DiningTable table: potentialTables) {
                if (reservation.getDiningTable().equals(table)) {
                    toRemoveTables.add(table);
                }
            }
        }

        uniqueTables.addAll(toRemoveTables);
        potentialTables.removeAll(uniqueTables);
        System.out.println(potentialTables.size());
        if (potentialTables.size() > 0) {
            return true;
        }
        else {
            //need to check if the r.starttime >= c.endtime && r.starttime + duration <= c.starttime of the next reservation on the same table.id
            //list of reservation per table..
            for (DiningTable table : uniqueTables) {
                //order of the list? 
                List<Reservation> reservationsByTable = reservationRepository.findSpecificReservationById("confirmed", startTime, table.getId());

                for(int i = 0; i < reservationsByTable.size()-1; i++) {
                    if (reservationsByTable.get(i).getStartTime().toInstant().compareTo(reservationsByTable.get(i+1).getEndTime().toInstant()) >= 0) {

                    }
                }
            }
            //List<Reservation> reservationByTable
            for (Reservation reservation: selectedConfirmedReservation) {
                if (reservation.getStartTime().toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime().isAfter(end) ||
                        reservation.getEndTime().toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime().isBefore(start)) {
                    return true;
                }
            }
        }
        return false;
    }
}