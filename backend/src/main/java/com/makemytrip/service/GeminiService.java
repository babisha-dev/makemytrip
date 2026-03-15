package com.makemytrip.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateTripSuggestion(String destination, int days, double budget, int travelers, String tripType) {
        try {
            String prompt = String.format("""
                You are an expert Indian travel planner for MakeMyTrip.
                
                Create a detailed %d-day travel plan for %s for %d traveler(s) with a total budget of ₹%.0f.
                Trip preference: %s
                
                Respond in this exact JSON format (no markdown, just JSON):
                {
                  "tripSummary": "2-3 sentence overview of the trip",
                  "highlights": ["highlight1", "highlight2", "highlight3"],
                  "itinerary": [
                    {"day": 1, "title": "Day title", "activities": ["activity1", "activity2", "activity3"], "meals": "Breakfast at X, Lunch at Y, Dinner at Z", "tips": "Helpful tip for the day"},
                    {"day": 2, "title": "Day title", "activities": ["activity1", "activity2"], "meals": "...", "tips": "..."}
                  ],
                  "budgetBreakdown": {
                    "flights": estimated_amount_number,
                    "hotels": estimated_amount_number,
                    "cabs": estimated_amount_number,
                    "food": estimated_amount_number,
                    "activities": estimated_amount_number
                  },
                  "bestTimeToVisit": "Month range",
                  "packingTips": ["tip1", "tip2", "tip3"],
                  "localFood": ["dish1", "dish2", "dish3"]
                }
                """, days, destination, travelers, budget, tripType);

            String url = apiUrl + "?key=" + apiKey;
            Map<String, Object> content = new HashMap<>();
            content.put("role", "user");
            content.put("parts", List.of(Map.of("text", prompt)));

            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("temperature", 0.7);
            generationConfig.put("maxOutputTokens", 2048);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", List.of(content));
            requestBody.put("generationConfig", generationConfig);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
List<?> candidates = (List<?>) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
                   Map<?, ?> contentMap = (Map<?, ?>) candidate.get("content");
        List<?> parts = (List<?>) contentMap.get("parts");
                    if (parts != null && !parts.isEmpty()) {
Map<?, ?> part = (Map<?, ?>) parts.get(0);
String text = (String) part.get("text");                       
                        text = text.replaceAll("```json\\s*", "").replaceAll("```\\s*", "").trim();
                        return text;
                    }
                }
            }
        } catch (Exception e) {
            return getDefaultSuggestion(destination, days, budget);
        }
        return getDefaultSuggestion(destination, days, budget);
    }

    private String getDefaultSuggestion(String destination, int days, double budget) {
        return String.format("""
            {
              "tripSummary": "Explore the beautiful %s over %d days with a budget of ₹%.0f. This trip covers the major attractions and local experiences.",
              "highlights": ["Local sightseeing", "Cultural experiences", "Local cuisine"],
              "itinerary": [{"day": 1, "title": "Arrival & Explore", "activities": ["Check-in", "Local market visit", "Evening stroll"], "meals": "Local restaurants", "tips": "Carry cash for local vendors"}],
              "budgetBreakdown": {"flights": %.0f, "hotels": %.0f, "cabs": %.0f, "food": %.0f, "activities": %.0f},
              "bestTimeToVisit": "October to March",
              "packingTips": ["Light clothes", "Comfortable shoes", "Sunscreen"],
              "localFood": ["Local specialties", "Street food", "Traditional sweets"]
            }
            """, destination, days, budget, budget*0.35, budget*0.30, budget*0.15, budget*0.12, budget*0.08);
    }
}
