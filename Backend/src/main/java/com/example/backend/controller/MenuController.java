package com.example.backend.controller;

import com.example.backend.entity.Menu;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.MenuService;
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

    @PutMapping("/edit_menu")
    public Menu updateMenu(@RequestBody Menu menu) throws RecordNotFoundException {

        menuService.saveOrUpdateMenu(menu, menu.getCategory());
        return menu;
    }
}
