package com.example.backend.service;

import com.example.backend.entity.Category;
import com.example.backend.entity.Menu;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {
    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository, CategoryRepository categoryRepository) {
        this.menuRepository = menuRepository;
    }
    public List<Menu> getAllMenu(){
        return menuRepository.findAll();
    }
    public Menu getMenuById(Long id) throws RecordNotFoundException {
        Optional<Menu> menu = menuRepository.findById(id);
        if(menu.isPresent()){
            return menu.get();
        }
        throw new RecordNotFoundException("Menu Not Found.");
    }
    public void saveOrUpdateMenu(Menu newMenu, Category category) throws RecordNotFoundException {
        if(newMenu.getId() == null){
            newMenu.setCategory(category);
            menuRepository.save(newMenu);
        }else{
            Menu menuFromDb = getMenuById(newMenu.getId());
            menuFromDb.setCategory(newMenu.getCategory());
            menuFromDb.setDescription(newMenu.getDescription());
            menuFromDb.setImage(newMenu.getImage());
            menuFromDb.setName(newMenu.getName());
            //
            menuFromDb.setStatus(newMenu.getStatus());
        }
    }
    public void deleteMenuById(Long id){
        menuRepository.deleteById(id);
    }
    public void changeMenuStatus(Long id, String status) throws RecordNotFoundException {
        Menu menu = getMenuById(id);
        menu.setStatus(status);
        menuRepository.save(menu);
    }
    public List<Menu> getMenuByCategory(Long categoryId){
        return menuRepository.getMenuByCategoryId(categoryId);
    }
}
