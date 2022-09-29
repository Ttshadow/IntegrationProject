package com.example.backend.controller;

import com.example.backend.entity.*;
import com.example.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private PromotionService promotionService;
    @Autowired
    private CommentService commentService;

    @GetMapping("/promotion")
    public ResponseEntity<?> getAllPromotion(){
        List<Promotion> promotionList = promotionService.getAllPromotion();
        return ResponseEntity.ok(promotionList);
    }

    @GetMapping("/testimonial")
    public ResponseEntity<?> getAllComment(){
        List<Comment> commentList = commentService.getAllComments();
        return ResponseEntity.ok(commentList);
    }
}