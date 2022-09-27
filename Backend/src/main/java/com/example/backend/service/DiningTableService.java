package com.example.backend.service;

import com.example.backend.entity.DiningTable;
import com.example.backend.entity.Reservation;
import com.example.backend.exception.RecordAlreadyExistsException;
import com.example.backend.exception.RecordNotFoundException;
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
        if (newDiningTable.getId() == null) {
            List<DiningTable> tables = getAllDiningTables();
            for (DiningTable table: tables) {
                if (newDiningTable.getName() == table.getName()) {
                    throw new RecordAlreadyExistsException("This table name already exists.");
                }
            }
            diningTableRepository.save(newDiningTable);
        } else {
            DiningTable diningTableFromDb = getDiningTableById(newDiningTable.getId());
            diningTableFromDb.setName(newDiningTable.getName());
            diningTableFromDb.setCapacity(newDiningTable.getCapacity());
            if(diningTableFromDb.getStatus().equals("reserved")) {
                Date date = new Date();
                List<Reservation> reservationsByTable = reservationService.findReservationByStatusTableAndTime("confirmed", date, diningTableFromDb.getId());
                System.out.println("table status is now = " + newDiningTable.getStatus());
                if (newDiningTable.getStatus().equals("occupied")) {
                    for (Reservation reservation : reservationsByTable) {
                        reservation.setStatus("fulfilled");
                        System.out.println("reservation id: "+ reservation.getId()+ "status is now = fulfilled ");
                        reservationService.saveUpdatedReservation(reservation);
                    }
                }
                else if (newDiningTable.getStatus().equals("available")) {
                    for (Reservation reservation : reservationsByTable) {
                        reservation.setStatus("unfulfilled");
                        System.out.println("reservation id: "+ reservation.getId()+ "status is now = unfulfilled ");
                        reservationService.saveUpdatedReservation(reservation);
                    }
                }
                else {
                    for (Reservation reservation : reservationsByTable) {
                        reservation.setStatus("cancelled");
                        System.out.println("reservation id: "+ reservation.getId()+ "status is now = cancelled ");
                        reservationService.saveUpdatedReservation(reservation);
                    }
                }
            }
            diningTableFromDb.setStatus(newDiningTable.getStatus());
            //if db.status = reserved and new.status = occupied XOR available
            //getReservation.atCurrentTime.status = fulfilled/unfulfilled

            diningTableRepository.save(diningTableFromDb);
        }
    }

    //Take status and modify reservation.status if needed.
    public void updateReservationStatus(String status) {

    }

    public void deleteDiningTableById(Long id) {
        diningTableRepository.deleteById(id);
    }

    public void changeDiningTableStatus(Long id, String status) throws RecordNotFoundException {
        DiningTable diningTable = getDiningTableById((id));
        diningTable.setStatus(status);
        diningTableRepository.save(diningTable);
    }

    public void changeAllDiningTableStatus(String status) throws RecordNotFoundException {
        Date date = new Date();
        List<DiningTable> allDiningTables = getAllDiningTables();
        //Add functionality to change reservation status
        //check reservation from today and cancel  them.

        //get list of reservation
        //check status. if reserved - occupied, reservation.status=fulfilled
        //if reserved - available = unfulfilled
        //if reserved - occupied = fulfilled
        //if reserved - unavailable = cancelled
        //if available - occupied = nothing
        //if available - unavailable = cancelled(for the day/alert admin)
        //if unavailable - available = nothing
        //if occupied - available = nothing
        List<Reservation> reservationList = reservationService.getReservationAtDate(date);
        for(Reservation reservation : reservationList) {
            if (!status.equals("available") && reservation.getStatus().equals("confirmed")) {
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
        //List<DiningTable> toRemoveTables = new ArrayList<>();
        //Set<DiningTable> uniqueTables = new HashSet<DiningTable>();

        return potentialTables;
    }

    public List<DiningTable> getCurrentTableStatus(Date date) {
        //get reservations for today
        List<Reservation> reservationList = reservationService.getReservationAtDate(date);
        //loop throuugh reservations
        LocalTime currentTime = date.toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
        for (Reservation reservation: reservationList) {
            System.out.println("reservation in list: " + reservation.getId());
            LocalTime startTime = reservation.getStartTime().toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
            LocalTime endTime = reservation.getEndTime().toInstant().atZone(ZoneId.of("America/Montreal")).toLocalTime();
            Duration inBetweenDuration = Duration.between(startTime, currentTime);
            System.out.println(inBetweenDuration.toMinutesPart());
            if (currentTime.compareTo(startTime) >= 0 && currentTime.compareTo(endTime) <= 0) {
                if (reservation.getDiningTable().getStatus().equals("available")) {
                    System.out.println("table is available. status = " + reservation.getDiningTable().getStatus());
                    reservation.getDiningTable().setStatus("reserved");
                    diningTableRepository.save(reservation.getDiningTable());
                }
                else if (inBetweenDuration.toMinutesPart() >= 15 && reservation.getDiningTable().getStatus().equals("reserved")) {
                    reservation.setStatus("unfulfilled");
                    reservation.getDiningTable().setStatus("available");
                    reservationService.saveUpdatedReservation(reservation);
                    diningTableRepository.save(reservation.getDiningTable());
                }
            }
        }
        return getAllDiningTables();
        //if date >= reservation.starttime && date <= reservation.endtime
        //table.setstatus = reserved
    }
}
