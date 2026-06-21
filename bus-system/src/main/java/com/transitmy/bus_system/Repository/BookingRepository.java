package com.transitmy.bus_system.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transitmy.bus_system.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserUserID(Long userID);
    List<Booking> findByBusBusID(Long busID);
}
