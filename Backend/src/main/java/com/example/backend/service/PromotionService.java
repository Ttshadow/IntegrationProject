package com.example.backend.service;

import com.example.backend.entity.Promotion;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.PromotionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromotionService {

    private final PromotionRepository promotionRepository;

    public PromotionService(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    public List<Promotion> getAllPromotion() {
        return promotionRepository.findAll();
    }

    public Promotion getPromotionById(Long id) throws RecordNotFoundException {
        Optional<Promotion> promotion = promotionRepository.findById(id);
        if (promotion.isPresent()) {
            return promotion.get();
        }
        throw new RecordNotFoundException("Promotion Not Found.");
    }

    public void saveOrUpdatePromotion(Promotion newPromotion) throws RecordNotFoundException {
        if (newPromotion.getId() == null) {
            promotionRepository.save(newPromotion);
        } else {
            Promotion promotionFromDb = getPromotionById(newPromotion.getId());
            promotionFromDb.setDescription(newPromotion.getDescription());
            promotionFromDb.setStatus(newPromotion.isStatus()); //TODO: change to isValid?
            promotionFromDb.setCode(newPromotion.getCode());
            promotionFromDb.setDiscount(newPromotion.getDiscount());
            promotionFromDb.setTitle(newPromotion.getTitle());
            promotionRepository.save(promotionFromDb);
        }
    }

    public void changePromotionStatus(Long id, boolean status) throws RecordNotFoundException {
        Promotion promotion = getPromotionById(id);
        promotion.setStatus(status);
        promotionRepository.save(promotion);
    }

    public List<Promotion> getPromotionByStatus(boolean status) {
        return promotionRepository.getPromotionByStatus(status);
    }

    public void deletePromotionById(Long id) {
        promotionRepository.deleteById(id);
    }
}
