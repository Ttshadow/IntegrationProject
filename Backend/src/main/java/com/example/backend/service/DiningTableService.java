package com.example.backend.service;

import com.example.backend.entity.DiningTable;
import com.example.backend.exception.RecordAlreadyExistsException;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.DiningTableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiningTableService {
    private final DiningTableRepository diningTableRepository;

    public DiningTableService(DiningTableRepository diningTableRepository) {
        this.diningTableRepository = diningTableRepository;
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
            diningTableFromDb.setStatus(newDiningTable.getStatus());
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
        List<DiningTable> allDiningTables = getAllDiningTables();
        //Add functionality to change reservation status
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
}
