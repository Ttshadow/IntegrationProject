package com.example.backend.controller;

import com.example.backend.entity.Menu;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/{id}")
    public Menu getMenuById(@PathVariable Long id) throws RecordNotFoundException {
        return menuService.getMenuById(id);
    }

    @PostMapping("/add_menu")
    public ResponseEntity addMenu(@RequestBody Menu menu) throws RecordNotFoundException {
        menuService.saveOrUpdateMenu(menu);
        return ResponseEntity.ok(menu);
    }

    @PutMapping("/edit_menu")
    public Menu updateMenu(@RequestBody Menu menu) throws RecordNotFoundException {

        menuService.saveOrUpdateMenu(menu);
        return menu;
    }

    @DeleteMapping("/{id}")
    public void deleteMenuById(@PathVariable Long id){
        menuService.deleteMenuById(id);
    }

    @PutMapping("/status/{id}")
    public void updateMenuStatus(@PathVariable Long id, @RequestBody String newStatus) throws RecordNotFoundException {
        menuService.changeMenuStatus(id, newStatus);
    }

    @GetMapping("/category/{id}")
    public List<Menu> getMenuByCategoryId(@PathVariable Long id){
        return menuService.getMenuByCategory(id);
    }
}
