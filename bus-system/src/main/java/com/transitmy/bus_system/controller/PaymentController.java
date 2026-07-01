package com.transitmy.bus_system.controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.transitmy.bus_system.entity.Booking;
import com.transitmy.bus_system.entity.Payment;
import com.transitmy.bus_system.repository.BookingRepository;
import com.transitmy.bus_system.repository.PaymentRepository;

@RestController
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping ("/payments")  //payment
    public Payment processPayment(@RequestBody Payment payment) {
        
        if (payment.getBooking() == null || payment.getBooking().getBookingID() == null) {
            throw new RuntimeException("Booking ID is required.");
        }

        Booking booking = bookingRepository.findById(payment.getBooking().getBookingID()).orElseThrow();

        if(booking.getBookingStatus().equals("CANCELLED")){
            throw new RuntimeException("Payment has already been cancelled for this booking.");
        }

        if (booking.getRoute() == null || booking.getRoute().getFare() == null) {
            throw new RuntimeException("Fare information is unavailable.");
        }

        String method = payment.getPaymentMethod();

        if (method == null ||
            !(method.equalsIgnoreCase("CARD")
              || method.equalsIgnoreCase("NFC")
              || method.equalsIgnoreCase("ONLINE_BANKING"))) {
            throw new RuntimeException("Invalid payment method.");
        }
        bookingRepository.save(booking);

        payment.setBooking(booking);
        payment.setPaymentStatus("PENDING");
        payment.setTransactionDate(java.time.LocalDateTime.now());
        payment.setAmount(BigDecimal.valueOf(booking.getRoute().getFare()));

        return paymentRepository.save(payment);
    }

    @GetMapping("/payments/{paymentID}")
    public Payment getPaymentById(@PathVariable Long paymentID) {
        return paymentRepository.findById(paymentID).orElseThrow();
    }

    
    
}
