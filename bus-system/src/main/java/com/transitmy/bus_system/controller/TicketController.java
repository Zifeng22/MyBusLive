package com.transitmy.bus_system.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.transitmy.bus_system.entity.Booking;
import com.transitmy.bus_system.entity.Ticket;
import com.transitmy.bus_system.repository.BookingRepository;
import com.transitmy.bus_system.repository.TicketRepository;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/booking/{bookingID}")
    public Ticket generateTicket(@PathVariable Long bookingID) {
        Booking booking = bookingRepository.findById(bookingID).orElseThrow();

        Ticket existingTicket = ticketRepository.findByBookingBookingID(bookingID);
        if (existingTicket != null) {
            return existingTicket;
        }

        Ticket ticket = new Ticket();
        ticket.setBooking(booking);
        ticket.setIssueDate(LocalDateTime.now());
        ticket.setTicketStatus("ACTIVE");
        ticket.setQrCode("TICKET-" + bookingID + "-" + System.currentTimeMillis());

        return ticketRepository.save(ticket);
    }

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @GetMapping("/{ticketID}")
    public Ticket getTicketById(@PathVariable Long ticketID) {
        return ticketRepository.findById(ticketID).orElseThrow();
    }

    @GetMapping("/booking/{bookingID}")
    public Ticket getTicketByBooking(@PathVariable Long bookingID) {
        return ticketRepository.findByBookingBookingID(bookingID);
    }

    @GetMapping("/user/{userID}")
    public List<Ticket> getTicketsByUser(@PathVariable Long userID) {
        return ticketRepository.findByBookingUserUserID(userID);
    }

    @PutMapping("/{ticketID}/used")
    public Ticket markTicketAsUsed(@PathVariable Long ticketID) {
        Ticket ticket = ticketRepository.findById(ticketID).orElseThrow();
        ticket.setTicketStatus("USED");
        return ticketRepository.save(ticket);
    }

    @PutMapping("/{ticketID}/cancel")
    public Ticket cancelTicket(@PathVariable Long ticketID) {
        Ticket ticket = ticketRepository.findById(ticketID).orElseThrow();
        ticket.setTicketStatus("CANCELLED");
        return ticketRepository.save(ticket);
    }
}
