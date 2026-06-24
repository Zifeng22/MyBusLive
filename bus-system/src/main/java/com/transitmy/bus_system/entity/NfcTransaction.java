package com.transitmy.bus_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nfc_transactions")
public class NfcTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionID;

    private LocalDateTime timestamp;
    private String validationStatus;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    public NfcTransaction() {

    }

    public NfcTransaction(Long transactionID,LocalDateTime timestamp, String validationStatus,User user, Bus bus, Ticket ticket){
        this.transactionID = transactionID;
        this.timestamp = timestamp;
        this.validationStatus = validationStatus;
        this.user = user;
        this.bus = bus;
        this.ticket = ticket;
    }

    public Long getTransactionID(){
        return transactionID;
    }

    public void setTransactionID(Long transactionID){
        this.transactionID = transactionID;
    }

    public LocalDateTime getTimeStamp(){
        return timestamp;
    }

    public void setTimeStamp(LocalDateTime timestamp){
        this.timestamp = timestamp;
    }

    public String getValidationStatus(){
        return validationStatus;
    }

    public void setValidationStatus(String validationStatus){
        this.validationStatus = validationStatus;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

    public Bus getBus(){
        return bus;
    }

    public void setBus(Bus bus){
        this.bus = bus;
    }

    public Ticket getTicket(){
        return ticket;
    }

    public void setTicket(Ticket ticket){
        this.ticket = ticket;
    }
}
