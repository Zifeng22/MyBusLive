package com.transitmy.bus_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DriverController {

    @Autowired
    private DriverRepository repo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Driver driver){
        Driver existingDriver = repo.findByDrivername(driver.getDrivername());

        if(existingDriver == null){
            return ResponseEntity.status(404).body("No account found");
        }
        if(!existingDriver.getPassword().equals(driver.getPassword())){
            return ResponseEntity.status(401).body("Invalid Password");
        }
        return ResponseEntity.ok(existingDriver);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Driver driver){
        if(driver.getDrivername()==null || driver.getDrivername().isBlank()
        || driver.getPassword() == null || driver.getPassword().isBlank()
        || driver.getPhone() == null || driver.getPhone().isBlank()
        || driver.getEmail() == null || driver.getEmail().isBlank()){
            return ResponseEntity.badRequest().body("Invalid Input / password mismatch");
        }
        repo.save(driver);
        return ResponseEntity.ok("Registration successful");
    }
    @GetMapping("/setting/{driver_id}")
    public Driver getDriver(@PathVariable Long driver_id){
        return repo.findById(driver_id).orElseThrow();
    }

    @PutMapping("/updateDriver/{driver_id}")
    public Driver updateDriver(@PathVariable Long driver_id , @RequestBody Driver driver){
        Driver existing = repo.findById(driver_id).orElseThrow();

        existing.setDrivername(driver.getDrivername());
        existing.setPassword(driver.getPassword());
        existing.setEmail(driver.getEmail());
        existing.setPhone(driver.getPhone());

        return repo.save(existing);
    }
}

