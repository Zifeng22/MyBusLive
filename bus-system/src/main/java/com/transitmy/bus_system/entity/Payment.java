package com.transitmy.bus_system.entity;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentID;
    
    private BigDecimal amount;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime transactionDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Payment(){
        
    }

    public Payment(Long paymentID, BigDecimal amount, String paymentMethod, String paymentStatus, LocalDateTime transactionDate, User user){
        this.paymentID = paymentID;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.transactionDate = transactionDate;
        this.user = user;
    }

    public Long getPaymentID(){
        return paymentID;
    }

    public void setPaymentID(Long paymentID){
        this.paymentID = paymentID;
    }

    public BigDecimal getAmount(){
        return amount;
    }

    public void setAmount(BigDecimal amount){
        this.amount = amount;
    }

    public String getPaymentMethod(){
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod){
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus(){
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus){
        this.paymentStatus = paymentStatus;
    }

    public LocalDateTime getTransactionDate(){
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate){
        this.transactionDate =  transactionDate;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }
}
