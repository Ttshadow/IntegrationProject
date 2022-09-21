package com.example.backend.controller;

import com.example.backend.entity.DiningTable;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.DiningTableService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
        return diningTableService.getAllDiningTables();
    }
    @PutMapping("/updatetable")
    public List<DiningTable> saveDiningTable(@RequestBody DiningTable newDiningtable) throws RecordNotFoundException {
        diningTableService.saveOrUpdateDiningTable(newDiningtable);
        return diningTableService.getAllDiningTables();
    }

    @PostMapping("/addtable")
    public List<DiningTable> addDiningTable(@RequestBody DiningTable newDiningtable) throws RecordNotFoundException {
        diningTableService.saveOrUpdateDiningTable(newDiningtable);
        return diningTableService.getAllDiningTables();
    }

    @DeleteMapping("/deletetable/{id}")
    public void deleteDiningTable(@PathVariable(value = "id")long id) {
        diningTableService.deleteDiningTableById(id);
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

}
