package com.makemytrip.repository;

import com.makemytrip.model.Cab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CabRepository extends JpaRepository<Cab, Long> {
    List<Cab> findByCityIgnoreCase(String city);
    List<Cab> findByCityIgnoreCaseAndPricePerDayLessThanEqual(String city, double maxPrice);
}
