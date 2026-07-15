package com.transitmy.bus_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transitmy.bus_system.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Ticket findByBookingBookingID(Long bookingID);
    List<Ticket> findByBookingUserUserID(Long userID);
}
