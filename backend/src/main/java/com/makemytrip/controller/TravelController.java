package com.makemytrip.controller;

import com.makemytrip.dto.*;
import com.makemytrip.model.*;
import com.makemytrip.repository.*;
import com.makemytrip.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class TravelController {

  
    @Autowired private HotelRepository hotelRepository;
    @Autowired private CabRepository cabRepository;
    @Autowired private BookingRepository bookingRepository;
    @Autowired private BookingService bookingService;
    @Autowired private GeminiService geminiService;

    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "MakeMyTrip API is running!"));
    }

    
 
    
    @GetMapping("/hotels/search")
    public ResponseEntity<List<Hotel>> searchHotels(
            @RequestParam String city,
            @RequestParam(required = false) Double maxPrice) {
        List<Hotel> hotels;
        if (maxPrice != null) {
            hotels = hotelRepository.findByCityIgnoreCaseAndPricePerNightLessThanEqual(city, maxPrice);
        } else {
            hotels = hotelRepository.findByCityIgnoreCase(city);
        }
        return ResponseEntity.ok(hotels);
    }

    
    @GetMapping("/cabs/search")
    public ResponseEntity<List<Cab>> searchCabs(
            @RequestParam String city,
            @RequestParam(required = false) Double maxPrice) {
        List<Cab> cabs;
        if (maxPrice != null) {
            cabs = cabRepository.findByCityIgnoreCaseAndPricePerDayLessThanEqual(city, maxPrice);
        } else {
            cabs = cabRepository.findByCityIgnoreCase(city);
        }
        return ResponseEntity.ok(cabs);
    }

   
    @PostMapping("/trips/suggest")
    public ResponseEntity<Map<String, Object>> suggestTrip(@RequestBody SearchRequest req) {
        String suggestion = geminiService.generateTripSuggestion(
            req.getDestination(), req.getDays(), req.getBudget(),
            req.getTravelers(), req.getTripType() != null ? req.getTripType() : "COMFORT"
        );
        Map<String, Object> result = new HashMap<>();
        result.put("suggestion", suggestion);
        result.put("destination", req.getDestination());
        result.put("days", req.getDays());
        result.put("budget", req.getBudget());
        return ResponseEntity.ok(result);
    }

    
    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest req) {
        try {
            Booking booking = bookingService.createBooking(req);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Booking failed: " + e.getMessage()));
        }
    }

   
    @GetMapping("/bookings/{reference}")
    public ResponseEntity<?> getBooking(@PathVariable String reference) {
        return bookingRepository.findByBookingReference(reference)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/bookings/user/{email}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String email) {
        return ResponseEntity.ok(bookingRepository.findByUserEmailOrderByCreatedAtDesc(email));
    }

    
    @GetMapping("/cities")
    public ResponseEntity<List<String>> getCities() {
        return ResponseEntity.ok(List.of(
            "Mumbai", "Delhi", "Goa", "Bangalore",
            "Chennai", "Hyderabad", "Kolkata", "Jaipur",
            "Agra", "Pune", "Ahmedabad", "Kochi"
        ));
    }
}
