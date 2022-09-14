package com.example.backend.service;

import com.example.backend.entity.Comment;
import com.example.backend.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }
    public List<Comment> getAllComments(){
        return commentRepository.findAll();
    }
    public void saveComment(Comment comment){
        commentRepository.save(comment);
    }
    public List<Comment> getCommentByUserId(Long userId){
        return commentRepository.getCommentByUserId(userId);
    }
    public void deleteComment(Long id){
        commentRepository.deleteById(id);
    }
}
