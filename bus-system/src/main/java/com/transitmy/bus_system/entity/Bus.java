
package com.transitmy.bus_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "buses")
public class Bus {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long busID;
    private String busNumber;
    private int totalSeats;
    private int availableSeats;
    private String status;

    //Relationships
    
    //One Route can have many Buses
    //Each Bus is associated with one Route
    @ManyToOne
    @JoinColumn(name = "route_id")
    private Route route;

    public Bus() {
    }

    public Bus(Long busID, String busNumber, int totalSeats, int availableSeats, String status, Route route) {
        this.busID = busID;
        this.busNumber = busNumber;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
        this.status = status;
        this.route = route;
    }

    public Long getBusID() {
        return busID;
    }
    public void setBusID(Long busID) {
        this.busID = busID;
    }

    public String getBusNumber() {
        return busNumber;
    }
    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public int getTotalSeats() {
        return totalSeats;
    }
    public void setTotalSeats(int totalSeats) {
        this.totalSeats = totalSeats;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }
    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public Route getRoute() {
        return route;
    }
    public void setRoute(Route route) {
        this.route = route;
    }

    public void updateAvailableSeats(int seatsBooked) {
        this.availableSeats -= seatsBooked;
    }
    public void updateStatus(String newStatus) {
        this.status = newStatus;
    }

}
