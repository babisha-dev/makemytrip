package com.makemytrip.dto;

public class BookingRequest {
    private String userName;
    private String userEmail;
    private String userPhone;
    private String origin;
    private String destination;
    private String travelDate;
    private String returnDate;
    private int travelers;
    private int days;
    private double totalBudget;
    private Long flightId;
    private Long hotelId;
    private Long cabId;
    private double flightCost;
    private double hotelCost;
    private double cabCost;
    private double totalCost;

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
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
    public Long getHotelId() { return hotelId; }
    public void setHotelId(Long hotelId) { this.hotelId = hotelId; }
    public Long getCabId() { return cabId; }
    public void setCabId(Long cabId) { this.cabId = cabId; }
    public double getFlightCost() { return flightCost; }
    public void setFlightCost(double flightCost) { this.flightCost = flightCost; }
    public double getHotelCost() { return hotelCost; }
    public void setHotelCost(double hotelCost) { this.hotelCost = hotelCost; }
    public double getCabCost() { return cabCost; }
    public void setCabCost(double cabCost) { this.cabCost = cabCost; }
    public double getTotalCost() { return totalCost; }
    public void setTotalCost(double totalCost) { this.totalCost = totalCost; }
}
