package com.makemytrip.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingReference;
    private String userEmail;
    private String userName;
    private String userPhone;

    // Trip details
    private String origin;
    private String destination;
    private String travelDate;
    private String returnDate;
    private int travelers;
    private int days;
    private double totalBudget;

    // Selected items
    private Long flightId;
    private String flightDetails;
    private Long hotelId;
    private String hotelDetails;
    private Long cabId;
    private String cabDetails;

    // Pricing
    private double flightCost;
    private double hotelCost;
    private double cabCost;
    private double totalCost;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private LocalDateTime createdAt;

    public enum BookingStatus { CONFIRMED, PENDING, CANCELLED }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = BookingStatus.CONFIRMED;
        if (bookingReference == null) {
            bookingReference = "MMT" + System.currentTimeMillis();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getUserPhone() { return userPhone; }
    public void setUserPhone(String userPhone) { this.userPhone = userPhone; }
    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getTravelDate() { return travelDate; }
    public void setTravelDate(String travelDate) { this.travelDate = travelDate; }
    public String getReturnDate() { return returnDate; }
    public void setReturnDate(String returnDate) { this.returnDate = returnDate; }
    public int getTravelers() { return travelers; }
    public void setTravelers(int travelers) { this.travelers = travelers; }
    public int getDays() { return days; }
    public void setDays(int days) { this.days = days; }
    public double getTotalBudget() { return totalBudget; }
    public void setTotalBudget(double totalBudget) { this.totalBudget = totalBudget; }
    public Long getFlightId() { return flightId; }
    public void setFlightId(Long flightId) { this.flightId = flightId; }
    public String getFlightDetails() { return flightDetails; }
    public void setFlightDetails(String flightDetails) { this.flightDetails = flightDetails; }
    public Long getHotelId() { return hotelId; }
    public void setHotelId(Long hotelId) { this.hotelId = hotelId; }
    public String getHotelDetails() { return hotelDetails; }
    public void setHotelDetails(String hotelDetails) { this.hotelDetails = hotelDetails; }
    public Long getCabId() { return cabId; }
    public void setCabId(Long cabId) { this.cabId = cabId; }
    public String getCabDetails() { return cabDetails; }
    public void setCabDetails(String cabDetails) { this.cabDetails = cabDetails; }
    public double getFlightCost() { return flightCost; }
    public void setFlightCost(double flightCost) { this.flightCost = flightCost; }
    public double getHotelCost() { return hotelCost; }
    public void setHotelCost(double hotelCost) { this.hotelCost = hotelCost; }
    public double getCabCost() { return cabCost; }
    public void setCabCost(double cabCost) { this.cabCost = cabCost; }
    public double getTotalCost() { return totalCost; }
    public void setTotalCost(double totalCost) { this.totalCost = totalCost; }
    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
