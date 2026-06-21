// This controller lets you create buses, view all buses, and view a specific bus by its ID. 
// It also allows you to update and delete a bus.
package com.transitmy.bus_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.transitmy.bus_system.Repository.BusRepository;
import com.transitmy.bus_system.entity.Bus;

@RestController
@RequestMapping("/api/buses")
public class BusController {

    @Autowired
    private BusRepository busRepository;

    @PostMapping
    public Bus createBus(@RequestBody Bus bus){
        return busRepository.save(bus);
    }

    @GetMapping
    public List<Bus> getAllBuses(){
        return busRepository.findAll();
    }

    @GetMapping("/{bus_id}")
    public Bus getBusById(@PathVariable Long bus_id){
        return busRepository.findById(bus_id).orElseThrow();
    }

    @PutMapping("/{bus_id}")
    public Bus updateBus(@PathVariable Long bus_id, @RequestBody Bus bus){
        Bus existingBus = busRepository.findById(bus_id).orElseThrow();

        existingBus.setBusNumber(bus.getBusNumber());
        existingBus.setTotalSeats(bus.getTotalSeats());
        existingBus.setAvailableSeats(bus.getAvailableSeats());
        existingBus.setStatus(bus.getStatus());
        existingBus.setRoute(bus.getRoute());
        

        return busRepository.save(existingBus);
    }

    @DeleteMapping("/{bus_id}")
    public String deleteBus(@PathVariable Long bus_id){
        busRepository.deleteById(bus_id);
        return "Bus deleted successfully";
    }
}
