package com.transitmy.bus_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.transitmy.bus_system.entity.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long>{
    Wallet findByUserUserID(Long userID);
}
