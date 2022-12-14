package com.example.backend.service;

import com.example.backend.entity.DiningTable;
import com.example.backend.entity.Reservation;
import com.example.backend.exception.RecordAlreadyExistsException;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.exception.TableIsOccupiedException;
import com.example.backend.repository.DiningTableRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class DiningTableService {
    private final DiningTableRepository diningTableRepository;
    private final ReservationService reservationService;

    public DiningTableService(DiningTableRepository diningTableRepository, @Lazy ReservationService reservationService) {
        this.diningTableRepository = diningTableRepository;
        this.reservationService = reservationService;
    }

    public List<DiningTable> getAllDiningTables() {
        return diningTableRepository.findAll();
    }

    public DiningTable getDiningTableById(Long id) throws RecordNotFoundException {
        Optional<DiningTable> diningTable = diningTableRepository.findById(id);
        if (diningTable.isPresent()) {
            return diningTable.get();
        }
        throw new RecordNotFoundException("Dining Table Not Found.");
    }

    public void saveOrUpdateDiningTable(DiningTable newDiningTable) throws RecordNotFoundException, RecordAlreadyExistsException {
        List<DiningTable> tables = getAllDiningTables();
        if (newDiningTable.getId() == null) {
            validateName(newDiningTable.getName(), tables);
            diningTableRepository.save(newDiningTable);
        } else {
            DiningTable diningTableFromDb = getDiningTableById(newDiningTable.getId());
            if (!newDiningTable.getName().equals(diningTableFromDb.getName())) {
                validateName(newDiningTable.getName(), tables);
            }
            diningTableFromDb.setName(newDiningTable.getName());
            diningTableFromDb.setCapacity(newDiningTable.getCapacity());
            if(diningTableFromDb.getStatus().equals("reserved")) {
                Date date = new Date();
                List<Reservation> reservationsByTable = reservationService.findReservationByStatusTableAndTime("confirmed", date, diningTableFromDb.getId());
                if (newDiningTable.getStatus().equals("occupied")) {
                    for (Reservation reservation : reservationsByTable) {
                        reservation.setStatus("fulfilled");
                        reservationService.saveUpdatedReservation(reservation);
                    }
                }
                else if (newDiningTable.getStatus().equals("available")) {
                    for (Reservation reservation : reservationsByTable) {
                        reservation.setStatus("unfulfilled");
                        reservationService.saveUpdatedReservation(reservation);
                    }
                }
                else {
                    for (Reservation reservation : reservationsByTable) {
                        reservation.setStatus("cancelled");
                        reservationService.saveUpdatedReservation(reservation);
                    }
                }
            }
            diningTableFromDb.setStatus(newDiningTable.getStatus());
            diningTableRepository.save(diningTableFromDb);
        }
    }

    public void validateName(String name, List<DiningTable> tables) throws RecordAlreadyExistsException{
        for (DiningTable table: tables) {
            if (table.getName().equals(name)) {
                throw new RecordAlreadyExistsException("This table name already exists.");
            }
        }
    }

    public void deleteDiningTableById(Long id) throws RecordNotFoundException, TableIsOccupiedException {
        if (getDiningTableById(id).getStatus().equals("occupied")) {
            throw new TableIsOccupiedException("Cannot delete a table that is occupied.");
        }
        diningTableRepository.deleteById(id);
    }

    public void statusToOccup??ed(Long id) throws RecordNotFoundException {
        DiningTable diningTable = getDiningTableById((id));
        diningTable.setStatus("occupied");
        diningTableRepository.save(diningTable);
    }

    public void changeAllDiningTableStatus(String status) throws RecordNotFoundException {
        Date date = new Date();
        List<DiningTable> allDiningTables = getAllDiningTables();
        List<Reservation> reservationList = reservationService.getReservationAtDate(date);
        for(Reservation reservation : reservationList) {
            if (!status.equals("available") && (reservation.getStatus().equals("confirmed") || reservation.getStatus().equals("pending"))) {
                reservation.setStatus("cancelled");
                reservationService.saveUpdatedReservation(reservation);
            }
        }
        for (DiningTable table: allDiningTables) {
            if(table.getId() != 1 && table.getId() != 2){
                table.setStatus(status);
                diningTableRepository.save(table);
            }
        }
    }

    public List<DiningTable> getAvailableDiningTable() {
        return diningTableRepository.findAvailableDiningTable();
    }

    public List<DiningTable> getDiningTablWithoutStatus(String status, int capacity) {
        return diningTableRepository.findDiningTableWithoutStatus(status, capacity);
    }

    public List<DiningTable> getPotentialDiningTables(int capacity) {
        List<DiningTable> potentialTables = diningTableRepository.findDiningTableWithoutStatus("unavailable", capacity);
        return potentialTables;
    }

    public List<DiningTable> getCurrentTableStatus(Date date) {
        List<Reservation> reservationList = reservationService.getReservationAtDate(date);
        LocalTime currentTime = date.toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
        for (Reservation reservation: reservationList) {
            LocalTime startTime = reservation.getStartTime().toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
            LocalTime endTime = reservation.getEndTime().toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
            Duration inBetweenDuration = Duration.between(startTime, currentTime);
            if (currentTime.compareTo(startTime) >= 0 && currentTime.compareTo(endTime) <= 0) {
                if (reservation.getDiningTable().getStatus().equals("available")) {
                    reservation.getDiningTable().setStatus("reserved");
                    diningTableRepository.save(reservation.getDiningTable());
                }
            }
            else if (inBetweenDuration.toMinutesPart() >= 2 && (reservation.getDiningTable().getStatus().equals("reserved") || reservation.getStatus().equals("confirmed"))) {
                reservation.setStatus("unfulfilled");
                reservation.getDiningTable().setStatus("available");
                reservationService.saveUpdatedReservation(reservation);
                diningTableRepository.save(reservation.getDiningTable());
            }
        }
        return getAllDiningTables();
    }
}
