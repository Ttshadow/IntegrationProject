package com.example.backend.controller;

import com.example.backend.constant.ErrorMessage;
import com.example.backend.entity.DiningTable;
import com.example.backend.exception.RecordAlreadyExistsException;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.exception.TableIsOccupiedException;
import com.example.backend.service.DiningTableService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController

@RequestMapping("/admindashboard")
public class DiningTableController {
    private final DiningTableService diningTableService;

    public DiningTableController(DiningTableService diningTableService) {
        this.diningTableService = diningTableService;
    }
    @GetMapping("/diningtable")
    public List<DiningTable> getAllDiningTables(){
        Date date = new Date();
        return diningTableService.getCurrentTableStatus(date);
    }
    @PutMapping("/updatetable")
    public ResponseEntity saveDiningTable(@RequestBody DiningTable newDiningtable) throws RecordNotFoundException, RecordAlreadyExistsException {
        try {
            diningTableService.saveOrUpdateDiningTable(newDiningtable);
            return ResponseEntity.ok("");
        }
        catch (RecordAlreadyExistsException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }

    }

    @PostMapping("/addtable")
    public ResponseEntity addDiningTable(@RequestBody DiningTable newDiningtable) throws RecordNotFoundException, RecordAlreadyExistsException {
        try {
            diningTableService.saveOrUpdateDiningTable(newDiningtable);
            return ResponseEntity.ok("");
            //return diningTableService.getAllDiningTables();
        }
        catch (RecordAlreadyExistsException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }



    @DeleteMapping("/deletetable/{id}")
    public ResponseEntity deleteDiningTable(@PathVariable(value = "id")long id) throws RecordNotFoundException {
        try{
            diningTableService.deleteDiningTableById(id);
            return ResponseEntity.ok("");
        }catch(TableIsOccupiedException ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/diningtable/{id}")
    public DiningTable getDiningTable(@PathVariable(value = "id")long id) throws RecordNotFoundException{
        return diningTableService.getDiningTableById(id);
    }

    @PutMapping("/updatealltable/{status}")
    public void updateAllStatus(@PathVariable(value = "status") String status) throws RecordNotFoundException {
        diningTableService.changeAllDiningTableStatus(status);
    }

    @GetMapping("/getwithout/{status}/{capacity}")
    public List<DiningTable> getNoUnavailableDiningTable(@PathVariable(value = "status")String status, @PathVariable(value = "capacity")int capacity) throws RecordNotFoundException {
        return diningTableService.getDiningTablWithoutStatus(status, capacity);
    }
    @GetMapping("/getavailabletable")
    public List<DiningTable> getAvailableDiningTable(){
        return diningTableService.getAvailableDiningTable();
    }
}
