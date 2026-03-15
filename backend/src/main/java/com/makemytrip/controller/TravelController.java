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

    @Autowired private FlightRepository flightRepository;
    @Autowired private HotelRepository hotelRepository;
    @Autowired private CabRepository cabRepository;
    @Autowired private BookingRepository bookingRepository;
    @Autowired private BookingService bookingService;
    @Autowired private GeminiService geminiService;

    // ── Health ──────────────────────────────────────────
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "MakeMyTrip API is running!"));
    }

    // ── Search Flights ───────────────────────────────────
    @GetMapping("/flights/search")
    public ResponseEntity<List<Flight>> searchFlights(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam(required = false) Double maxPrice) {
        List<Flight> flights;
        if (maxPrice != null) {
            flights = flightRepository.findByOriginIgnoreCaseAndDestinationIgnoreCaseAndPriceLessThanEqual(
                origin, destination, maxPrice);
        } else {
            flights = flightRepository.findByOriginIgnoreCaseAndDestinationIgnoreCase(origin, destination);
        }
        return ResponseEntity.ok(flights);
    }

    // ── Search Hotels ────────────────────────────────────
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

    // ── Search Cabs ──────────────────────────────────────
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

    // ── AI Trip Suggestion ───────────────────────────────
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

    // ── Create Booking ───────────────────────────────────
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

    // ── Get Booking by Reference ─────────────────────────
    @GetMapping("/bookings/{reference}")
    public ResponseEntity<?> getBooking(@PathVariable String reference) {
        return bookingRepository.findByBookingReference(reference)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // ── Get Bookings by Email ────────────────────────────
    @GetMapping("/bookings/user/{email}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String email) {
        return ResponseEntity.ok(bookingRepository.findByUserEmailOrderByCreatedAtDesc(email));
    }

    // ── All Cities (for dropdowns) ───────────────────────
    @GetMapping("/cities")
    public ResponseEntity<List<String>> getCities() {
        return ResponseEntity.ok(List.of(
            "Mumbai", "Delhi", "Goa", "Bangalore",
            "Chennai", "Hyderabad", "Kolkata", "Jaipur",
            "Agra", "Pune", "Ahmedabad", "Kochi"
        ));
    }
}
