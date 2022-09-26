package com.example.backend.controller;

import com.example.backend.entity.pojo.PaymentRequest;
import com.example.backend.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    public final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/order/payment")
    public ResponseEntity<String> charge(@RequestBody PaymentRequest paymentRequest) throws StripeException {
        try{paymentService.createPayment(paymentRequest.getAmount(), paymentRequest.getId());
        return ResponseEntity.ok("success");
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("fail");
        }
    }
}
