package com.transitmy.bus_system.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketID;

    private String qrCode;
    private LocalDateTime issueDate;
    private String ticketStatus;
    
    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    public Ticket(){

    }

    public Ticket(Long ticketID, String qrCode, LocalDateTime issueDate, String ticketStatus, Booking booking){
        this.ticketID = ticketID; 
        this.qrCode = qrCode; 
        this.issueDate = issueDate;
        this.ticketStatus = ticketStatus; 
        this.booking = booking;
    }

    public Long getTicketID(){
        return ticketID;
    }

    public void setTicketID(Long ticketID){
        this.ticketID = ticketID;
    }

    public String getQrCode(){
        return qrCode;
    }

    public void setQrCode(String qrCode){
        this.qrCode = qrCode;
    }

    public LocalDateTime getIssueDate(){
        return issueDate;
    }
    
    public void set(LocalDateTime issueDate){
        this.issueDate = issueDate;
    }

    public String getTicketStatus(){
        return ticketStatus;
    }

    public void setTicketStatus(String ticketStatus){
        this.ticketStatus = ticketStatus;
    }

    public Booking getBooking(){
        return booking;
    }

    public void setBooking(Booking booking){
        this.booking = booking;
    }
}
