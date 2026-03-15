package com.makemytrip.service;

import com.makemytrip.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${app.name}")
    private String appName;

    public void sendBookingConfirmation(Booking booking) {
        // 1. Send confirmation email to user
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(booking.getUserEmail());
            helper.setSubject("Booking Confirmed! " + booking.getBookingReference() + " — " + appName);
            helper.setText(buildUserEmailHtml(booking), true);
            mailSender.send(message);
            System.out.println("Confirmation email sent to user: " + booking.getUserEmail());
        } catch (Exception e) {
            System.err.println("User email failed: " + e.getMessage());
        }

        // 2. Send notification email to admin
        try {
            MimeMessage adminMsg = mailSender.createMimeMessage();
            MimeMessageHelper adminHelper = new MimeMessageHelper(adminMsg, true, "UTF-8");
            adminHelper.setFrom(fromEmail);
            adminHelper.setTo(fromEmail);
            adminHelper.setSubject("New Booking Received: " + booking.getBookingReference() + " from " + booking.getUserName());
            adminHelper.setText(buildAdminEmailHtml(booking), true);
            mailSender.send(adminMsg);
            System.out.println("Admin notification sent to: " + fromEmail);
        } catch (Exception e) {
            System.err.println("Admin email failed: " + e.getMessage());
        }
    }

    private String buildAdminEmailHtml(Booking booking) {
        return "<html><body style='font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;'>" +
            "<div style='max-width:600px;margin:0 auto;background:white;border-radius:10px;overflow:hidden;'>" +
            "<div style='background:#2c3e50;padding:20px;text-align:center;'>" +
            "<h2 style='color:white;margin:0;'>New Booking Notification</h2>" +
            "<p style='color:#bdc3c7;margin:6px 0 0;font-size:13px;'>A customer has made a new booking</p></div>" +
            "<div style='padding:24px;'>" +
            "<div style='background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:12px 16px;margin-bottom:20px;font-size:14px;color:#856404;'>" +
            "Booking Reference: <strong>" + booking.getBookingReference() + "</strong></div>" +
            row("Customer Name", booking.getUserName()) +
            row("Email", booking.getUserEmail()) +
            row("Phone", booking.getUserPhone()) +
            row("Destination", booking.getDestination()) +
            row("Travel Date", booking.getTravelDate()) +
            row("Return Date", booking.getReturnDate()) +
            row("Duration", booking.getDays() + " days") +
            row("Travelers", booking.getTravelers() + " person(s)") +
            row("Hotel", booking.getHotelDetails() != null ? booking.getHotelDetails() : "N/A") +
            row("Cab", booking.getCabDetails() != null ? booking.getCabDetails() : "N/A") +
            "<div style='background:#fef2f2;border-radius:8px;padding:16px;text-align:right;margin-top:16px;'>" +
            "<span style='font-size:13px;color:#888;'>Total Amount</span><br>" +
            "<span style='font-size:24px;font-weight:bold;color:#e63946;'>Rs." + String.format("%.0f", booking.getTotalCost()) + "</span></div>" +
            "</div><div style='background:#f8f9fa;padding:14px;text-align:center;font-size:12px;color:#999;'>" +
            "MakeMyTrip Clone — Admin Notification</div></div></body></html>";
    }

    private String row(String label, String value) {
        return "<div style='display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:14px;'>" +
            "<span style='color:#888;'>" + label + "</span>" +
            "<span style='font-weight:600;color:#333;'>" + value + "</span></div>";
    }

    private String buildUserEmailHtml(Booking booking) {
        return "<!DOCTYPE html><html><head><meta charset='UTF-8'>" +
            "<style>body{font-family:Arial,sans-serif;margin:0;padding:0;background:#f5f5f5;}" +
            ".container{max-width:600px;margin:0 auto;background:white;}" +
            ".header{background:linear-gradient(135deg,#e63946,#c1121f);padding:30px;text-align:center;}" +
            ".badge{background:#22c55e;color:white;padding:8px 20px;border-radius:20px;display:inline-block;font-size:14px;font-weight:bold;margin-top:15px;}" +
            ".body{padding:30px;}" +
            ".ref-box{background:#fef2f2;border:2px dashed #e63946;border-radius:10px;padding:15px;text-align:center;margin-bottom:25px;}" +
            ".detail-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:14px;}" +
            ".cost-box{background:#f8f9fa;border-radius:10px;padding:20px;}" +
            ".cost-total{border-top:2px solid #e63946;margin-top:10px;padding-top:10px;font-size:18px;font-weight:bold;color:#e63946;}" +
            ".footer{background:#333;color:#aaa;padding:20px;text-align:center;font-size:12px;}</style></head>" +
            "<body><div class='container'>" +
            "<div class='header'><h1 style='color:white;margin:0;font-size:26px;'>MakeMyTrip Clone</h1>" +
            "<p style='color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;'>Your booking is confirmed!</p>" +
            "<div class='badge'>Booking Confirmed</div></div>" +
            "<div class='body'><p style='font-size:16px;color:#333;'>Dear <strong>" + booking.getUserName() + "</strong>,</p>" +
            "<p style='color:#666;font-size:14px;'>Your booking has been confirmed. Here are your trip details.</p>" +
            "<div class='ref-box'><div style='font-size:24px;font-weight:bold;color:#e63946;letter-spacing:2px;'>" + booking.getBookingReference() + "</div>" +
            "<p style='color:#666;margin:5px 0 0;font-size:13px;'>Your Booking Reference</p></div>" +
            "<div style='margin-bottom:20px;'><h3 style='color:#e63946;font-size:15px;border-bottom:2px solid #fef2f2;padding-bottom:8px;'>Trip Details</h3>" +
            "<div class='detail-row'><span style='color:#666;'>Destination</span><span style='font-weight:600;'>" + booking.getDestination() + "</span></div>" +
            "<div class='detail-row'><span style='color:#666;'>Travel Date</span><span style='font-weight:600;'>" + booking.getTravelDate() + "</span></div>" +
            "<div class='detail-row'><span style='color:#666;'>Return Date</span><span style='font-weight:600;'>" + booking.getReturnDate() + "</span></div>" +
            "<div class='detail-row'><span style='color:#666;'>Travelers</span><span style='font-weight:600;'>" + booking.getTravelers() + " person(s)</span></div>" +
            "<div class='detail-row'><span style='color:#666;'>Duration</span><span style='font-weight:600;'>" + booking.getDays() + " days</span></div></div>" +
            "<div style='margin-bottom:20px;'><h3 style='color:#e63946;font-size:15px;border-bottom:2px solid #fef2f2;padding-bottom:8px;'>What's Included</h3>" +
            "<div class='detail-row'><span style='color:#666;'>Hotel</span><span style='font-weight:600;'>" + (booking.getHotelDetails() != null ? booking.getHotelDetails() : "N/A") + "</span></div>" +
            "<div class='detail-row'><span style='color:#666;'>Cab</span><span style='font-weight:600;'>" + (booking.getCabDetails() != null ? booking.getCabDetails() : "N/A") + "</span></div></div>" +
            "<div class='cost-box'>" +
            "<div style='display:flex;justify-content:space-between;padding:6px 0;font-size:14px;'><span>Hotel Cost</span><span>Rs." + String.format("%.0f", booking.getHotelCost()) + "</span></div>" +
            "<div style='display:flex;justify-content:space-between;padding:6px 0;font-size:14px;'><span>Cab Cost</span><span>Rs." + String.format("%.0f", booking.getCabCost()) + "</span></div>" +
            "<div class='cost-total' style='display:flex;justify-content:space-between;'><span>Total Amount</span><span>Rs." + String.format("%.0f", booking.getTotalCost()) + "</span></div></div>" +
            "<div style='background:#f0fdf4;border-radius:10px;padding:15px;font-size:13px;color:#166534;margin-top:20px;'>" +
            "Please carry a valid ID proof and this confirmation when you travel.</div></div>" +
            "<div class='footer'><p>MakeMyTrip Clone — Internship Project</p></div>" +
            "</div></body></html>";
    }
}
