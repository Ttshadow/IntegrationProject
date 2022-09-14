package com.example.backend.controller;

import com.example.backend.entity.DiningTable;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.DiningTableService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import java.util.List;

@Controller
public class DiningTableController {
    private final DiningTableService diningTableService;

    public DiningTableController(DiningTableService diningTableService) {
        this.diningTableService = diningTableService;
    }
    @GetMapping("/diningtable")
    public List<DiningTable> getAllDiningTables(){
        return diningTableService.getAllDiningTables();
    }
    @GetMapping("/add_dining_table")
    public void addDiningTable(){
        //TODO:
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
