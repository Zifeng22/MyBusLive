package com.transitmy.bus_system.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transitmy.bus_system.entity.Driver;

public interface DriverRepository extends JpaRepository<Driver, Long>{ 
    Driver findByDrivername(String drivername);
}
