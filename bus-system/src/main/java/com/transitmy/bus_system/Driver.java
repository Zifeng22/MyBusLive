package com.transitmy.bus_system;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Driver")
public class Driver {

    @Id
    @GeneratedValue ( strategy=GenerationType.IDENTITY)
    private Long driverID;

    private String drivername;
    private String password;
    private String email;
    private String phone;

    public Driver(Long driverID, String drivername, String password, String email, String phone){
        this.driverID = driverID;
        this.drivername = drivername;
        this.password = password;
        this.email = email;
        this.phone = phone;
    }

    public Long getDriverID() {
        return driverID;
    }

    public void setDriverID(Long driverID) {
        this.driverID = driverID;
    }

    public String getDrivername() {
        return drivername;
    }

    public void setDrivername(String Drivername) {
        this.drivername = drivername;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

      public String getPhone(){
        return phone;
    }

    public void setPhone(String phone){
        this.phone = phone;
    }
    
    
}
