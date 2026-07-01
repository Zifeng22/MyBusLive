package com.transitmy.bus_system.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "nfc_transactions")
public class NfcTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionID;

    private LocalDateTime timestamp;
    private String validationStatus;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    public NfcTransaction() {

    }

    public NfcTransaction(Long transactionID,LocalDateTime timestamp, String validationStatus,User user, Bus bus, Ticket ticket){
        this.transactionID = transactionID;
        this.timestamp = timestamp;
        this.validationStatus = validationStatus;
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

    public Ticket getTicket(){
        return ticket;
    }

    public void setTicket(Ticket ticket){
        this.ticket = ticket;
    }
}
