package com.makemytrip.repository;

import com.makemytrip.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserEmailOrderByCreatedAtDesc(String email);
    Optional<Booking> findByBookingReference(String bookingReference);
}
