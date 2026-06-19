package com.transitmy.bus_system;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Long>{ 
    Driver findByUsername(String Drivername);
}
