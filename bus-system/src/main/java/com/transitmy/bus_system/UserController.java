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
public class UserController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        User existingUser = repo.findByUsername(user.getUsername());

        if(existingUser == null){
            return ResponseEntity.status(404).body("No account found");
        }
        if(!existingUser.getPassword().equals(user.getPassword())){
            return ResponseEntity.status(401).body("Invalid Password");
        }
        return ResponseEntity.ok(existingUser);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        if(user.getUsername()==null || user.getUsername().isBlank()
        || user.getPassword()==null || user.getPassword().isBlank()
        || user.getPhone()==null || user.getPhone().isBlank()
        || user.getEmail()==null || user.getEmail().isBlank()){
            
            return ResponseEntity.badRequest().body("Invalid Input / password mismatch");
        }
        repo.save(user);
        return ResponseEntity.ok("Registration successful");
    }

    @GetMapping("/setting/{user_id}")
    public User getUser(@PathVariable Long user_id){
        return repo.findById(user_id).orElseThrow();
    }
    
    @PutMapping("/updateUser/{user_id}")
    public User updateUser(@PathVariable Long user_id, @RequestBody User user){
        User existing = repo.findById(user_id).orElseThrow();

        existing.setUsername(user.getUsername());
        existing.setPassword(user.getPassword());
        existing.setEmail(user.getEmail());
        existing.setPhone(user.getPhone());

        return repo.save(existing);
    }
}
