package com.makemytrip.dto;

public class SearchRequest {
    private String origin;
    private String destination;
    private String travelDate;
    private String returnDate;
    private int travelers;
    private int days;
    private double budget;
    private String tripType; // BUDGET, COMFORT, LUXURY

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
    public double getBudget() { return budget; }
    public void setBudget(double budget) { this.budget = budget; }
    public String getTripType() { return tripType; }
    public void setTripType(String tripType) { this.tripType = tripType; }
}
