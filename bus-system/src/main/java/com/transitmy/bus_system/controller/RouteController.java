package com.transitmy.bus_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.transitmy.bus_system.entity.Route;
import com.transitmy.bus_system.repository.RouteRepository;

@RestController
public class RouteController {
    @Autowired
    private RouteRepository repo;

    @PostMapping("/routes/search")  //user search location
    public ResponseEntity<?> searchRoute(@RequestBody Route route){
        Route result = repo.findByOrigin(route.getOrigin());

         if(result == null){
            return ResponseEntity.status(404).body("Route Not found");
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/routes")   //insert location
    public ResponseEntity<?> location(@RequestBody Route route){
        if(route.getOrigin()==null || route.getOrigin().isBlank()
        || route.getDestination()==null || route.getDestination().isBlank()
        || route.getFare()==null
        || route.getEstimatedTime()==null){
            
            return ResponseEntity.badRequest().body("Invalid Input / password mismatch");
        }
        repo.save(route);
        return ResponseEntity.ok("Registration successful");
    }

    @GetMapping("/routes/{route_ID}")  //show result
    public Route getRoute(@PathVariable Long route_ID){
        return repo.findById(route_ID).orElseThrow();
    }

    @GetMapping("/routes")
    public List<Route> getAllRoutes(){
        return repo.findAll();
    }

    @PutMapping("/rotes/{route_ID}")
    public Route updateRoute(@PathVariable Long route_ID, @RequestBody Route route){
        Route location = repo.findById(route_ID).orElseThrow();

        location.setOrigin(route.getOrigin());
        location.setDestination(route.getDestination());
        location.setFare(route.getFare());
        location.setEstimatedTime(route.getEstimatedTime());

        return repo.save(location);
    }
}
