package com.transitmy.bus_system.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "route")
public class Route {

    @Id
    @GeneratedValue (strategy=GenerationType.IDENTITY)
    private Long routeID;

    private String origin;
    private String destination;
    private Double fare;
    private Integer estimatedTime;
    
    public Route(){

    }
    
    public Route(Long routeID, String origin, String destination, Double fare, Integer estimatedTime){
        this.routeID = routeID;
        this.origin = origin;
        this.destination = destination;
        this.fare = fare;
        this.estimatedTime = estimatedTime;
    }

    public Long getRouteID() {
        return routeID;
    }

    public void setRouteID(Long routeID) {
        this.routeID = routeID;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getFare(){
        return fare;
    }

    public void setFare(Double fare){
        this.fare = fare;
    }

      public Integer getEstimatedTime(){
        return estimatedTime;
    }

    public void setEstimatedTime(Integer estimatedTime){
        this.estimatedTime = estimatedTime;
    }
    
    
}
