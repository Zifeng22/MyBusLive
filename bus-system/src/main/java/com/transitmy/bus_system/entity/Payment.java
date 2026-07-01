package com.transitmy.bus_system.entity;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

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

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    public Payment(){
        
    }

    public Payment(Long paymentID, BigDecimal amount, String paymentMethod, String paymentStatus, LocalDateTime transactionDate, Booking booking){
        this.paymentID = paymentID;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.transactionDate = transactionDate;
        this.booking = booking;
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

    public Booking getBooking(){
        return booking;
    }

    public void setBooking(Booking booking){
        this.booking = booking;
    }
}
