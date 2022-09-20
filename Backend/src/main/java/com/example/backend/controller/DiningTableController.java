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
@RequestMapping("/diningtable")
public class DiningTableController {
    private final DiningTableService diningTableService;

    public DiningTableController(DiningTableService diningTableService) {
        this.diningTableService = diningTableService;
    }
    @GetMapping
    public List<DiningTable> getAllDiningTables(){
        return diningTableService.getAllDiningTables();
    }

    @PostMapping("/save_dining_table")
    public List<DiningTable> saveDiningTable(@Valid @ModelAttribute("diningTable") DiningTable newDiningtable, BindingResult result) throws RecordNotFoundException {
        if(result.hasErrors()){
            //TODO:
        }
        diningTableService.saveOrUpdateDiningTable(newDiningtable);
        return diningTableService.getAllDiningTables();
    }

}
