package com.makemytrip.repository;

import com.makemytrip.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByOriginIgnoreCaseAndDestinationIgnoreCase(String origin, String destination);
    List<Flight> findByOriginIgnoreCaseAndDestinationIgnoreCaseAndPriceLessThanEqual(
        String origin, String destination, double maxPrice);
}
