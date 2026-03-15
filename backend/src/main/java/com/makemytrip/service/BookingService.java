package com.makemytrip.service;

import com.makemytrip.dto.BookingRequest;
import com.makemytrip.model.*;
import com.makemytrip.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired private BookingRepository bookingRepository;

    @Autowired private HotelRepository hotelRepository;
    @Autowired private CabRepository cabRepository;
    @Autowired private EmailService emailService;

    public Booking createBooking(BookingRequest req) {
        Booking booking = new Booking();
        booking.setUserName(req.getUserName());
        booking.setUserEmail(req.getUserEmail());
        booking.setUserPhone(req.getUserPhone());
        booking.setOrigin(req.getOrigin());
        booking.setDestination(req.getDestination());
        booking.setTravelDate(req.getTravelDate());
        booking.setReturnDate(req.getReturnDate());
        booking.setTravelers(req.getTravelers());
        booking.setDays(req.getDays());
        booking.setTotalBudget(req.getTotalBudget());
        booking.setFlightId(req.getFlightId());
        booking.setHotelId(req.getHotelId());
        booking.setCabId(req.getCabId());
        booking.setFlightCost(req.getFlightCost());
        booking.setHotelCost(req.getHotelCost());
        booking.setCabCost(req.getCabCost());
        booking.setTotalCost(req.getTotalCost());
 
       
        if (req.getHotelId() != null) {
            hotelRepository.findById(req.getHotelId()).ifPresent(h ->
                booking.setHotelDetails(h.getName() + ", " + h.getCity())
            );
        }
        if (req.getCabId() != null) {
            cabRepository.findById(req.getCabId()).ifPresent(c ->
                booking.setCabDetails(c.getProvider() + " " + c.getCabType() +
                    " | ₹" + (int)c.getPricePerDay() + "/day")
            );
        }

        Booking saved = bookingRepository.save(booking);

        new Thread(() -> emailService.sendBookingConfirmation(saved)).start();

        return saved;
    }
}
