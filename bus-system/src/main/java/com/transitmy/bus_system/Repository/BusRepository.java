package com.transitmy.bus_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transitmy.bus_system.entity.Bus;

public interface BusRepository extends JpaRepository<Bus, Long> {
    Bus findByBusNumber(String busNumber);
}
