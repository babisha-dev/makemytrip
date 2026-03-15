-- MakeMyTrip Clone - Seed Data
-- Run this AFTER the app starts for the first time (tables auto-created by JPA)

-- ─────────────────────────────────────────────
-- FLIGHTS
-- ─────────────────────────────────────────────
INSERT IGNORE INTO flights (id, airline, flight_number, origin, destination, departure_time, arrival_time, price, seats_available, flight_class) VALUES
(1,  'IndiGo',       '6E-201',  'Mumbai',    'Delhi',     '06:00', '08:10', 4500,  120, 'ECONOMY'),
(2,  'Air India',    'AI-101',  'Mumbai',    'Delhi',     '09:30', '11:45', 6200,  80,  'ECONOMY'),
(3,  'SpiceJet',     'SG-301',  'Mumbai',    'Delhi',     '14:00', '16:15', 3800,  95,  'ECONOMY'),
(4,  'Vistara',      'UK-801',  'Mumbai',    'Delhi',     '18:00', '20:10', 8500,  40,  'BUSINESS'),
(5,  'IndiGo',       '6E-505',  'Delhi',     'Mumbai',    '07:00', '09:10', 4800,  110, 'ECONOMY'),
(6,  'Air India',    'AI-202',  'Delhi',     'Mumbai',    '12:00', '14:15', 6500,  75,  'ECONOMY'),
(7,  'IndiGo',       '6E-601',  'Mumbai',    'Goa',       '08:00', '09:20', 3200,  130, 'ECONOMY'),
(8,  'SpiceJet',     'SG-701',  'Mumbai',    'Goa',       '11:00', '12:25', 2900,  100, 'ECONOMY'),
(9,  'IndiGo',       '6E-702',  'Delhi',     'Goa',       '07:30', '09:30', 4200,  115, 'ECONOMY'),
(10, 'Air India',    'AI-301',  'Delhi',     'Goa',       '13:00', '15:05', 5500,  60,  'ECONOMY'),
(11, 'IndiGo',       '6E-801',  'Mumbai',    'Bangalore', '06:30', '08:00', 3500,  120, 'ECONOMY'),
(12, 'Vistara',      'UK-901',  'Mumbai',    'Bangalore', '10:00', '11:35', 7200,  45,  'BUSINESS'),
(13, 'IndiGo',       '6E-901',  'Delhi',     'Bangalore', '08:00', '10:30', 4900,  100, 'ECONOMY'),
(14, 'SpiceJet',     'SG-401',  'Delhi',     'Bangalore', '15:00', '17:30', 4100,  85,  'ECONOMY'),
(15, 'IndiGo',       '6E-111',  'Mumbai',    'Chennai',   '07:00', '08:45', 3800,  110, 'ECONOMY'),
(16, 'Air India',    'AI-501',  'Delhi',     'Chennai',   '09:00', '11:30', 5200,  70,  'ECONOMY'),
(17, 'IndiGo',       '6E-222',  'Mumbai',    'Hyderabad', '06:00', '07:30', 3200,  125, 'ECONOMY'),
(18, 'SpiceJet',     'SG-501',  'Delhi',     'Hyderabad', '08:30', '10:45', 4400,  90,  'ECONOMY'),
(19, 'IndiGo',       '6E-333',  'Mumbai',    'Kolkata',   '07:00', '09:30', 4600,  100, 'ECONOMY'),
(20, 'Air India',    'AI-601',  'Delhi',     'Kolkata',   '06:30', '08:45', 4800,  80,  'ECONOMY');

-- ─────────────────────────────────────────────
-- HOTELS
-- ─────────────────────────────────────────────
INSERT IGNORE INTO hotels (id, name, city, address, price_per_night, rating, amenities, hotel_type, image_url) VALUES
(1,  'The Taj Mahal Palace',     'Mumbai',    'Apollo Bunder, Colaba',         18000, 5.0, 'Pool,Spa,Restaurant,WiFi,Gym',        'LUXURY',   'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'),
(2,  'Trident Nariman Point',    'Mumbai',    'Nariman Point',                  9500, 4.5, 'Pool,Restaurant,WiFi,Bar',            'PREMIUM',  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400'),
(3,  'Ibis Mumbai Airport',      'Mumbai',    'Andheri East',                   3200, 3.5, 'WiFi,Restaurant,Gym',                 'BUDGET',   'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'),
(4,  'Hotel Residency',          'Mumbai',    'Fort Area',                      2200, 3.0, 'WiFi,Restaurant',                     'BUDGET',   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'),
(5,  'The Imperial New Delhi',   'Delhi',     'Janpath',                       15000, 5.0, 'Pool,Spa,Restaurant,WiFi,Gym,Bar',    'LUXURY',   'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400'),
(6,  'Hyatt Regency Delhi',      'Delhi',     'Bhikaji Cama Place',             8500, 4.5, 'Pool,Restaurant,WiFi,Gym,Bar',        'PREMIUM',  'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=400'),
(7,  'Hotel Broadway',           'Delhi',     'Asaf Ali Road',                  2800, 3.5, 'WiFi,Restaurant,AC',                  'BUDGET',   'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400'),
(8,  'Zostel Delhi',             'Delhi',     'Paharganj',                       900, 3.0, 'WiFi,Common Kitchen,Lounge',          'HOSTEL',   'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'),
(9,  'Taj Holiday Village',      'Goa',       'Sinquerim, Candolim',            12000, 5.0, 'Beach,Pool,Spa,Restaurant,WiFi',      'LUXURY',   'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'),
(10, 'Alila Diwa Goa',           'Goa',       'Majorda, South Goa',             7500, 4.5, 'Pool,Restaurant,WiFi,Gym,Spa',        'PREMIUM',  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400'),
(11, 'Zostel Goa',               'Goa',       'Anjuna Beach Road',              1200, 3.5, 'WiFi,Beach Access,Bar,Pool',          'HOSTEL',   'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400'),
(12, 'Hotel Baga Residency',     'Goa',       'Baga Beach',                     2500, 3.0, 'WiFi,Restaurant,Pool',                'BUDGET',   'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400'),
(13, 'The Leela Palace',         'Bangalore', 'Old Airport Road',              14000, 5.0, 'Pool,Spa,Restaurant,WiFi,Gym,Bar',    'LUXURY',   'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=400'),
(14, 'Marriott Whitefield',      'Bangalore', 'Whitefield ITPL Road',           7000, 4.5, 'Pool,Restaurant,WiFi,Gym',            'PREMIUM',  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400'),
(15, 'Hotel Ajantha',            'Bangalore', 'MG Road',                        2400, 3.5, 'WiFi,Restaurant,AC',                  'BUDGET',   'https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=400'),
(16, 'ITC Grand Chola',          'Chennai',   'Mount Road',                    12000, 5.0, 'Pool,Spa,Restaurant,WiFi,Gym',        'LUXURY',   'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=400'),
(17, 'Taj Coromandel',           'Chennai',   'Nungambakkam',                   8000, 4.5, 'Pool,Restaurant,WiFi,Gym,Bar',        'PREMIUM',  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400'),
(18, 'Hotel Pandian',            'Chennai',   'Egmore',                         2000, 3.0, 'WiFi,Restaurant,AC',                  'BUDGET',   'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?w=400'),
(19, 'Park Hyatt Hyderabad',     'Hyderabad', 'Banjara Hills',                 10000, 5.0, 'Pool,Spa,Restaurant,WiFi,Gym',        'LUXURY',   'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400'),
(20, 'Taj Krishna',              'Hyderabad', 'Banjara Hills Road No.1',        7500, 4.5, 'Pool,Restaurant,WiFi,Gym,Bar',        'PREMIUM',  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400');

-- ─────────────────────────────────────────────
-- CABS
-- ─────────────────────────────────────────────
INSERT IGNORE INTO cabs (id, cab_type, provider, city, price_per_day, capacity, ac, description) VALUES
(1,  'Hatchback',  'Ola',   'Mumbai',    1200, 4, true,  'Swift / WagonR — ideal for city travel'),
(2,  'Sedan',      'Uber',  'Mumbai',    1600, 4, true,  'Honda City / Toyota Etios — comfortable sedan'),
(3,  'SUV',        'Ola',   'Mumbai',    2400, 6, true,  'Innova Crysta — spacious for families'),
(4,  'Tempo',      'Local', 'Mumbai',    3500, 12,true,  'Tempo Traveller — for large groups'),
(5,  'Hatchback',  'Ola',   'Delhi',     1100, 4, true,  'Swift / i20 — city rides'),
(6,  'Sedan',      'Uber',  'Delhi',     1500, 4, true,  'Dzire / Etios — comfortable'),
(7,  'SUV',        'Ola',   'Delhi',     2200, 6, true,  'Innova — family trips'),
(8,  'Luxury',     'Uber',  'Delhi',     4500, 4, true,  'Mercedes E-Class — premium travel'),
(9,  'Hatchback',  'Goa Cabs', 'Goa',   1000, 4, true,  'Swift — beach hopping'),
(10, 'Sedan',      'Ola',   'Goa',       1400, 4, true,  'Dzire — comfortable sightseeing'),
(11, 'SUV',        'Uber',  'Goa',       2000, 6, true,  'Innova — full Goa tour'),
(12, 'Scooty',     'Rental','Goa',        400, 2, false, 'Activa — explore beaches on your own'),
(13, 'Hatchback',  'Ola',   'Bangalore', 1100, 4, true,  'i10 — city travel'),
(14, 'Sedan',      'Uber',  'Bangalore', 1500, 4, true,  'Etios — tech park transfers'),
(15, 'SUV',        'Ola',   'Bangalore', 2100, 6, true,  'Innova — airport transfers'),
(16, 'Hatchback',  'Ola',   'Chennai',   1000, 4, true,  'Swift — Marina Beach rides'),
(17, 'Sedan',      'Uber',  'Chennai',   1400, 4, true,  'Dzire — comfortable'),
(18, 'SUV',        'Ola',   'Chennai',   2000, 6, true,  'Innova — full day trips'),
(19, 'Hatchback',  'Ola',   'Hyderabad', 1000, 4, true,  'i20 — Charminar area rides'),
(20, 'SUV',        'Uber',  'Hyderabad', 2000, 6, true,  'Innova — Ramoji Film City tours');
