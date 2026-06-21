package com.transitmy.bus_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transitmy.bus_system.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
