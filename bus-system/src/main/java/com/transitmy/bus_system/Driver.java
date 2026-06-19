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
    private Long DriverID;

    private String Drivername;
    private String password;
    private String email;
    private String phone;

    public Driver(Long DriverID, String Drivername, String password, String email, String phone){
        this.DriverID = DriverID;
        this.Drivername = Drivername;
        this.password = password;
        this.email = email;
        this.phone = phone;
    }

    public Long getDriverID() {
        return DriverID;
    }

    public void setDriverID(Long DriverID) {
        this.DriverID = DriverID;
    }

    public String getDrivername() {
        return Drivername;
    }

    public void setDrivername(String Drivername) {
        this.Drivername = Drivername;
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
