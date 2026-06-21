package com.transitmy.bus_system.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.transitmy.bus_system.entity.Route;

public interface RouteRepository extends JpaRepository<Route, Long>{
     Route findByOrigin(String origin);
}

