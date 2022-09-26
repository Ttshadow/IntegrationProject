package com.example.backend.controller;

import com.example.backend.entity.pojo.ChargeRequest;
import com.example.backend.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChargeController {
    @Autowired
    private StripeService stripeService;

    @PostMapping("/order/payment")
    public ResponseEntity<Charge> charge(ChargeRequest chargeRequest)
            throws StripeException {
        chargeRequest.setDescription("Example charge");
        chargeRequest.setCurrency(ChargeRequest.Currency.EUR);
        Charge charge = stripeService.charge(chargeRequest);
        return ResponseEntity.ok(charge);
    }
}
