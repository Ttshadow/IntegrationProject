package com.example.backend.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class PaymentService {

    @Value("${stripe.public.key}")
    private String stripePublicKey;

    @Value("${stripe.apikey}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }
    public PaymentIntent createPayment(Long amount, String id) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency("CAD")
                .setPaymentMethod(id)
                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        paymentIntent.confirm();
        return paymentIntent;
    }
}
