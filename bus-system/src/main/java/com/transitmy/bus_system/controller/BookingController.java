package com.transitmy.bus_system.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.transitmy.bus_system.Repository.BookingRepository;
import com.transitmy.bus_system.Repository.BusRepository;
import com.transitmy.bus_system.entity.Booking;
import com.transitmy.bus_system.entity.Bus;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    
    @Autowired
    private BookingRepository bookingRepository;    

    @Autowired
    private BusRepository busRepository;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        // Check if the bus exists
        Bus bus = busRepository.findById(booking.getBus().getBusID()).orElseThrow() ;

        if(bus.getAvailableSeats() <= 0){
            throw new RuntimeException("Bus is full.");

        }

        bus.setAvailableSeats(bus.getAvailableSeats()-1);
        busRepository.save(bus);

        booking.setBus(bus);
        booking.setBookingTime(LocalDateTime.now());
        booking.setBookingStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{bookingID}")
    public Booking getBookingById(@PathVariable Long bookingID) {
        return bookingRepository.findById(bookingID).orElseThrow();
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Long userId) {
        return bookingRepository.findByUserUserID(userId);
    }

    @GetMapping("/bus/{busId}")
    public List<Booking> getBookingsByBusId(@PathVariable Long busId) {
        return bookingRepository.findByBusBusID(busId);
    }

    @PutMapping("/{bookingID}/cancel")
    public Booking cancelBooking(@PathVariable Long bookingID) {
        Booking booking = bookingRepository.findById(bookingID).orElseThrow();

       if(!"CANCELLED".equals(booking.getBookingStatus())){
            // Increase the available seats in the bus
            Bus bus = booking.getBus();
            bus.setAvailableSeats(bus.getAvailableSeats() + 1);
            busRepository.save(bus);

            booking.setBookingStatus("CANCELLED");
       }

        return bookingRepository.save(booking);
    }
}
