package com.makemytrip.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cabs")
public class Cab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cabType;
    private String provider;
    private String city;
    private double pricePerDay;
    private int capacity;
    private boolean ac;
    private String description;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCabType() { return cabType; }
    public void setCabType(String cabType) { this.cabType = cabType; }
    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(double pricePerDay) { this.pricePerDay = pricePerDay; }
    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public boolean isAc() { return ac; }
    public void setAc(boolean ac) { this.ac = ac; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
