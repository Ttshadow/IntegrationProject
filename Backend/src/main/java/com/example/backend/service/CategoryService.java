package com.example.backend.service;

import com.example.backend.entity.Category;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
    public Category getCategoryById(Long id) throws RecordNotFoundException {
        Optional<Category> category = categoryRepository.findById(id);
        if(category.isPresent()){
            return category.get();
        }
        throw new RecordNotFoundException("Category Not Found.");
    }
    public void saveOrUpdateCategory (Category newCategory) throws RecordNotFoundException {
        if (newCategory.getId() == null){
            categoryRepository.save(newCategory);
        }
        else{
            Category categoryFromDb = getCategoryById(newCategory.getId());
            categoryFromDb.setName(newCategory.getName());
            categoryRepository.save(categoryFromDb);
        }
    }
    public void deleteCategoryById(Long id){
        categoryRepository.deleteById(id);
    }
}
