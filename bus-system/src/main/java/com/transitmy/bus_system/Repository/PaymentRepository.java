package com.transitmy.bus_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transitmy.bus_system.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{
    List<Payment> findByBooking_BookingID(Long bookingID);

    List<Payment> findByPaymentStatus(String paymentStatus);

    List<Payment> findByPaymentMethod(String paymentMethod);
}
