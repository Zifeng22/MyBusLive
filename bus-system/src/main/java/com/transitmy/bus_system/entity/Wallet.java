package com.transitmy.bus_system.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "wallets")
public class Wallet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walletID;
    private BigDecimal balance;

    //Relationships
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Wallet(){

    }

    public Long getWalletID(){
        return walletID;
    }

    public void setWalletID(Long walletID){
        this.walletID = walletID;
    }

    public BigDecimal getBalance(){
        return balance;
    }

    public void setBalance(BigDecimal balance){
        this.balance = balance;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }
}
