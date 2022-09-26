package com.example.backend.service;

import com.example.backend.entity.pojo.ChargeRequest;
import com.stripe.Stripe;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    @Value("${stripe.apikey}")
    String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }
    public Charge charge(ChargeRequest chargeRequest) throws StripeException{
//        ChargeRequest newChargeRequest = new ChargeRequest();
//        newChargeRequest.setAmount(chargeRequest.getAmount());
//        newChargeRequest.setCurrency(chargeRequest.getCurrency());
//        newChargeRequest.setStripeEmail(chargeRequest.getStripeEmail());
//        newChargeRequest.setStripeToken(chargeRequest.getStripeToken());
//        newChargeRequest.setDescription(chargeRequest.getDescription());
//        return Charge.create(newChargeRequest);

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", chargeRequest.getAmount());
        chargeParams.put("currency", chargeRequest.getCurrency());
        chargeParams.put("description", chargeRequest.getDescription());
        chargeParams.put("source", chargeRequest.getStripeToken());
        return Charge.create(chargeParams);
    }
}
