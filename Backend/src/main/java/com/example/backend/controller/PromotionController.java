package com.example.backend.controller;

import com.example.backend.entity.Promotion;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promotion")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping
    public ResponseEntity<?> getAllPromotion(Long userId){
        List<Promotion> promotionList = promotionService.getAllPromotion();
        return ResponseEntity.ok(promotionList);
    }

    @DeleteMapping
    public ResponseEntity<?> deletePromotionById(@RequestParam Long promotionId){
        promotionService.deletePromotionById(promotionId);
        return ResponseEntity.ok(promotionService.getAllPromotion());
    }

    @PutMapping
    public ResponseEntity<?> updatePromotionById(@RequestBody Promotion promotion){
        try {
            promotionService.saveOrUpdatePromotion(promotion);
        } catch (RecordNotFoundException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(promotionService.getAllPromotion());
    }
}
