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
    private final DiningTableService diningTableService;

    public ReservationService(ReservationRepository reservationRepository, DiningTableRepository diningTableRepository, DiningTableService diningTableService) {
        this.reservationRepository = reservationRepository;
        this.diningTableRepository = diningTableRepository;
        this.diningTableService = diningTableService;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservation(Long id) {
        return reservationRepository.getReferenceById(id);
    }

    public List<Reservation> getAllPendingReservations() {
        return reservationRepository.findPendingReservationInOrder();
    }

    public void saveReservation(Reservation newReservation) {
        reservationRepository.save(newReservation);
    }

    public void saveUpdatedReservation(Reservation reservation) {
        Reservation reservationFromDb = getReservation(reservation.getId());
        reservationFromDb.setNumberOfParty(reservation.getNumberOfParty());
        reservationFromDb.setStartTime(reservation.getStartTime());
        reservationFromDb.setEndTime(reservation.getEndTime());
        reservationFromDb.setStatus(reservation.getStatus());
        reservationFromDb.setDiningTable(reservation.getDiningTable());
        reservationRepository.save(reservationFromDb);
    }

    public List<Reservation> getAllUserReservation(Long userId) {
        return reservationRepository.findAllReservationOfUser(userId);
    }

    public List<DiningTable> getTableReservationAvailability(Date start, Date end, int capacity) {
        List<DiningTable> potentialTables = diningTableService.getPotentialDiningTables(capacity);
        List<DiningTable> toRemoveTables = new ArrayList<>();
        Set<DiningTable> uniqueTables = new HashSet<DiningTable>();
        //List<DiningTable> allPotentialTables = getAllAvailableDiningTables(start, potentialTables);
        List<Reservation> selectedConfirmedReservation = reservationRepository.findSpecificReservation("confirmed", start);
        LocalTime startTime = start.toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
        LocalTime endTime = end.toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
        Duration reservationDuration = Duration.between(startTime, endTime);
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
        //Check if there are any available tables left.
        if (potentialTables.size() > 0) {
            return potentialTables;
        }
        else {
            //need to check if the r.starttime >= c.endtime && r.starttime + duration <= c.starttime of the next reservation on the same table.id
            //list of reservation per table..
            //uniqueTables = tables that have confirmed reservations.
            for (DiningTable table : uniqueTables) {
                //reservationsByTable = every reservation for specific table and for specific date.
                List<Reservation> reservationsByTable = reservationRepository.findSpecificReservationById("confirmed", start, table.getId());

                for(int i = 0; i < reservationsByTable.size()-1; i++) {
                    LocalTime firstEndReservation = reservationsByTable.get(i).getEndTime().toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
                    LocalTime secondStartReservation = reservationsByTable.get(i+1).getStartTime().toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
                    Duration inBetweenDuration = Duration.between(firstEndReservation, secondStartReservation);
                    if (reservationDuration.compareTo(inBetweenDuration) < 0) {
                        //return true;
                        potentialTables.add(table);
                        break;
                    }
                }
            }
        }
        return potentialTables;
    }

    public List<DiningTable> getAllAvailableDiningTables(Date start, List<DiningTable> potentialTables) {
        List<Reservation> selectedConfirmedReservation = reservationRepository.findSpecificReservation("confirmed", start);
        List<DiningTable> toRemoveTables = new ArrayList<>();
        Set<DiningTable> uniqueTables = new HashSet<DiningTable>();
        for (Reservation reservation: selectedConfirmedReservation) {
            for (DiningTable table: potentialTables) {
                if (reservation.getDiningTable().equals(table)) {
                    toRemoveTables.add(table);
                }
            }
        }
        uniqueTables.addAll(toRemoveTables);
        potentialTables.removeAll(uniqueTables);
        return potentialTables;
    }



}
