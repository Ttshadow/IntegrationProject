package com.example.backend.controller;

import com.example.backend.entity.Category;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admindashboard/category")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryRepository categoryRepository, CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }
    @PostMapping("/add_category")
    public ResponseEntity addCategory(@RequestBody Category category) throws RecordNotFoundException {
        categoryService.saveOrUpdateCategory(category);
        return ResponseEntity.ok(category);
    }
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) throws RecordNotFoundException {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/edit_category")
    public Category updateCategory(@RequestBody Category category) throws RecordNotFoundException {
        categoryService.saveOrUpdateCategory(category);
        return category;
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id){
        categoryService.deleteCategoryById(id);
    }
}

