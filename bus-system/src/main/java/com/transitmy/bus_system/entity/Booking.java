package com.transitmy.bus_system.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingID;
    private int seatNumber;
    private LocalDateTime bookingTime;
    private String bookingStatus;

    //Relationships

    //One User can have many Bookings
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //One Bus can have many Bookings
    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;
    //Each Booking is associated with one User and one Bus
    public Booking() {
    }

    public Booking(Long bookingID, int seatNumber, LocalDateTime bookingTime, String bookingStatus, User user, Bus bus) {
        this.bookingID = bookingID;
        this.seatNumber = seatNumber;
        this.bookingTime = bookingTime;
        this.bookingStatus = bookingStatus;
        this.user = user;
        this.bus = bus;
    }

    public Long getBookingID() {
        return bookingID;
    }

    public void setBookingID(Long bookingID) {
        this.bookingID = bookingID;
    }

    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
        this.seatNumber = seatNumber;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public void updateBookingStatus(String newStatus) {
        this.bookingStatus = newStatus;
    }

}
