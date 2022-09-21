package com.example.backend.controller;

import com.example.backend.constant.ErrorMessage;
import com.example.backend.entity.Menu;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import java.util.List;

@RestController
@RequestMapping("/admindashboard/menu")
public class MenuController {
    public final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public List<Menu> getAllMenus(){
        return menuService.getAllMenu();
    }

    @GetMapping("/available_menu")
    public List<Menu> getAvailableMenu(){
        return menuService.getAvailableMenu();
    }

    @GetMapping("/{id}")
    public Menu getMenuById(@PathVariable Long id) throws RecordNotFoundException {
        return menuService.getMenuById(id);
    }

    @PostMapping("/add_menu")
    public ResponseEntity addMenu(@RequestBody Menu menu) throws RecordNotFoundException {
        try{
            menuService.saveOrUpdateMenu(menu);
            return ResponseEntity.ok(menu);
        }
        catch (ConstraintViolationException e){
            return ResponseEntity.badRequest().body(e.getConstraintViolations().iterator().next().getMessageTemplate());
        }
    }

    @PutMapping("/edit_menu")
    public ResponseEntity updateMenu(@RequestBody Menu menu) throws RecordNotFoundException {
        try{
            menuService.saveOrUpdateMenu(menu);
            return ResponseEntity.ok(menu);}
        catch (Exception e){
            return ResponseEntity.internalServerError().body(ErrorMessage.NAME_SIZE_LIMIT_ERROR_MESSAGE);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMenuById(@PathVariable Long id){
        menuService.deleteMenuById(id);
        return ResponseEntity.ok("Delete Success");
    }

    @PutMapping("/status/{id}")
    public ResponseEntity updateMenuStatus(@PathVariable Long id, @RequestBody String newStatus) throws RecordNotFoundException {
        menuService.changeMenuStatus(id, newStatus);
        return ResponseEntity.ok("Status Update Success");

    }

    @GetMapping("/category/{id}")
    public List<Menu> getMenuByCategoryId(@PathVariable Long id){
        return menuService.getMenuByCategory(id);
    }

    @GetMapping("/available_by_category/{id}")
    public List<Menu> getAvailableMenuByCategoryId(@PathVariable Long id){
        return menuService.getAvailableMenuByCategoryId(id);
    }
}
