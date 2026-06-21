package com.transitmy.bus_system.Repository;

import org.springframework. data.jpa.repository.JpaRepository;

import com.transitmy.bus_system.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Booking findByBookingReference(String bookingReference);
}
