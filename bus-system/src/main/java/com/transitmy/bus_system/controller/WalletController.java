package com.transitmy.bus_system.controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.transitmy.bus_system.entity.User;
import com.transitmy.bus_system.entity.Wallet;
import com.transitmy.bus_system.repository.UserRepository;
import com.transitmy.bus_system.repository.WalletRepository;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user/{userID}")         //create user walllet
    public Wallet createWallet(@PathVariable Long userID) {
        User user = userRepository.findById(userID).orElseThrow();

        Wallet existingWallet = walletRepository.findByUserUserID(userID);
        if (existingWallet != null) {
            return existingWallet;
        }

        Wallet wallet = new Wallet();
        wallet.setUser(user);
        wallet.setBalance(BigDecimal.ZERO);

        return walletRepository.save(wallet);
    }

    @GetMapping("/user/{userID}")
    public Wallet getWalletByUser(@PathVariable Long userID) {
        return walletRepository.findByUserUserID(userID);
    }

    @PutMapping("/user/{userID}/topup")     //topup
    public Wallet topUpWallet(@PathVariable Long userID, @RequestParam BigDecimal amount) {
        Wallet wallet = walletRepository.findByUserUserID(userID);

        if (wallet == null) {
            User user = userRepository.findById(userID).orElseThrow();

            wallet = new Wallet();
            wallet.setUser(user);
            wallet.setBalance(BigDecimal.ZERO);
        }

        wallet.setBalance(wallet.getBalance().add(amount));

        return walletRepository.save(wallet);
    }

    @PutMapping("/user/{userID}/deduct")          //deduct balance
    public Wallet deductWallet(@PathVariable Long userID, @RequestParam BigDecimal amount) {
        Wallet wallet = walletRepository.findByUserUserID(userID);

        if (wallet == null) {
            throw new RuntimeException("Wallet not found");
        }

        if (wallet.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient wallet balance");
        }

        wallet.setBalance(wallet.getBalance().subtract(amount));

        return walletRepository.save(wallet);
    }
}