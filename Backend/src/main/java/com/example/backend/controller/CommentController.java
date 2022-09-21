package com.example.backend.controller;

import com.example.backend.constant.*;
import com.example.backend.entity.*;
import com.example.backend.exception.*;
import com.example.backend.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import java.util.*;

@RestController
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping("/admindashboard/review")
    public List<Comment> getAllComments(){
        return commentService.getAllComments();
    }

    @PostMapping("/userdashboard/review")
    public ResponseEntity addComment(@RequestBody Comment newComment) throws RecordNotFoundException {
        try{
            commentService.saveComment(newComment);
            return ResponseEntity.ok(newComment);
        }catch(ConstraintViolationException ex){
            return ResponseEntity.badRequest().body(ErrorMessage.COMMENT_IS_REQUIRED_ERROR_MESSAGE);
        }

    }
}