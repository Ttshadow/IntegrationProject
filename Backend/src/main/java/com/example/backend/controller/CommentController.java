package com.example.backend.controller;

import com.example.backend.constant.*;
import com.example.backend.entity.*;
import com.example.backend.exception.*;
import com.example.backend.service.*;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import java.util.*;

@RestController
public class CommentController {
    private final CommentService commentService;
    private final OrderService orderService;
    private final ReservationService reservationService;

    public CommentController(CommentService commentService, OrderService orderService, ReservationService reservationService){
        this.commentService = commentService;
        this.orderService = orderService;
        this.reservationService = reservationService;
    }

    @GetMapping("/admindashboard/review")
    public List<Comment> getAllComments(){
        return commentService.getAllComments();
    }

    @PostMapping("/userdashboard/review")
    public ResponseEntity addComment(@RequestBody Comment newComment) throws RecordNotFoundException {
        List <Reservation> reservations = reservationService.getReservationStatusOfUser(newComment.getUser().getId());
        try{
            if(orderService.getOrderByUserId(newComment.getUser().getId()).isEmpty() || reservations.isEmpty()){
                return ResponseEntity.badRequest().body("You can leave a comment after you make an order or fulfill a reservation.");
            }
//            else if(reservations.isEmpty()){
//                return ResponseEntity.badRequest().body("You can leave comment after fulfill your reservation.");
//            }
            else{
                commentService.saveComment(newComment);
                return ResponseEntity.ok(newComment);
            }
        }catch(ConstraintViolationException ex){
            if(newComment.getContent().equals("")){
                return ResponseEntity.badRequest().body(ErrorMessage.COMMENT_IS_REQUIRED_ERROR_MESSAGE);
            }else {
                return ResponseEntity.badRequest().body(ErrorMessage.COMMENT_SIZE_LIMIT_ERROR_MESSAGE);
            }
        }
    }
}