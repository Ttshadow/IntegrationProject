package com.example.backend.controller;

import com.example.backend.entity.*;
import com.example.backend.exception.*;
import com.example.backend.service.*;
import org.springframework.web.bind.annotation.*;

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
    public List<Comment> addComment(@RequestBody Comment newComment, User user) throws RecordNotFoundException {
        commentService.saveComment(newComment);
        return commentService.getCommentByUserId(user.getId());
    }
}