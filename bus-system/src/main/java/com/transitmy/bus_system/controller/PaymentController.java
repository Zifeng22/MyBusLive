package com.transitmy.bus_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.transitmy.bus_system.repository.PaymentRepository;

@RestController
public class PaymentController {

    @Autowired
    private PaymentRepository repo;

  
    
}
