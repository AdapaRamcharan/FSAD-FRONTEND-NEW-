export const cityData = [
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    tagline: 'City of Pearls & Innovation',
    description: 'Hyderabad, the capital of Telangana, is a vibrant metropolis known for its rich history, iconic Charminar, delectable Biryani, and thriving IT industry in HITEC City. The city beautifully blends Mughal heritage with cutting-edge technology.',
    population: '10.5 Million',
    area: '650 km²',
    language: 'Telugu, Hindi, Urdu',
    climate: 'Tropical wet and dry',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80',
    coverGradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
    color: '#dc2626',
    coordinates: { lat: 17.385, lng: 78.4867 },
    weather: { temp: 32, condition: 'Partly Cloudy', humidity: 55, wind: 12 },
    aqi: { value: 78, level: 'Moderate', color: '#f59e0b' },
    famousPlaces: [
      { name: 'Charminar', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80', description: 'Iconic 16th-century mosque and monument, symbol of Hyderabad' },
      { name: 'Golconda Fort', image: 'https://images.unsplash.com/photo-1590067531908-e2fdb8d1d093?w=400&q=80', description: 'Historic fort known for its acoustic architecture' },
      { name: 'Hussain Sagar Lake', image: 'https://images.unsplash.com/photo-1564507592214-5e0e52c3c318?w=400&q=80', description: 'Heart-shaped lake with a monolithic Buddha statue' },
      { name: 'Ramoji Film City', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&q=80', description: 'World\'s largest integrated film studio complex' },
      { name: 'Birla Mandir', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80', description: 'Beautiful white marble temple on Naubath Pahad hill' },
      { name: 'HITEC City', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', description: 'India\'s leading IT hub and technology corridor' }
    ],
    popularFoods: [
      { name: 'Hyderabadi Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
      { name: 'Haleem', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80' },
      { name: 'Irani Chai & Osmania Biscuit', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
      { name: 'Double Ka Meetha', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80' }
    ],
    emergencyContacts: [
      { name: 'Police', number: '100', icon: '🚔' },
      { name: 'Fire Department', number: '101', icon: '🚒' },
      { name: 'Ambulance', number: '108', icon: '🚑' },
      { name: 'Women Helpline', number: '181', icon: '👩' },
      { name: 'GHMC Helpline', number: '040-21111111', icon: '🏛️' },
      { name: 'Traffic Helpline', number: '8712670100', icon: '🚦' }
    ],
    amenities: {
      hospitals: [
        { name: 'NIMS Hospital', lat: 17.3950, lng: 78.4722, address: 'Panjagutta, Hyderabad' },
        { name: 'Gandhi Hospital', lat: 17.3981, lng: 78.4755, address: 'Musheerabad, Hyderabad' },
        { name: 'Apollo Hospital', lat: 17.4232, lng: 78.4536, address: 'Jubilee Hills, Hyderabad' },
        { name: 'KIMS Hospital', lat: 17.4014, lng: 78.4423, address: 'Secunderabad, Hyderabad' }
      ],
      parks: [
        { name: 'KBR National Park', lat: 17.4156, lng: 78.4424, address: 'Jubilee Hills' },
        { name: 'Lumbini Park', lat: 17.3920, lng: 78.4729, address: 'Near Hussain Sagar' },
        { name: 'NTR Gardens', lat: 17.3885, lng: 78.4726, address: 'Tank Bund Road' },
        { name: 'Botanical Garden', lat: 17.4566, lng: 78.3627, address: 'Kondapur' }
      ],
      policeStations: [
        { name: 'Banjara Hills PS', lat: 17.4106, lng: 78.4374, address: 'Road No. 12, Banjara Hills' },
        { name: 'SR Nagar PS', lat: 17.4350, lng: 78.4480, address: 'SR Nagar' },
        { name: 'Madhapur PS', lat: 17.4486, lng: 78.3908, address: 'HITEC City' }
      ],
      petrolBunks: [
        { name: 'HP Petrol Bunk', lat: 17.4250, lng: 78.4550, address: 'Jubilee Hills Junction' },
        { name: 'Indian Oil Station', lat: 17.4400, lng: 78.3950, address: 'HITEC City Main Road' },
        { name: 'BPCL Station', lat: 17.3900, lng: 78.4700, address: 'Nampally' }
      ],
      hotels: [
        { name: 'Taj Falaknuma Palace', lat: 17.3314, lng: 78.4675, address: 'Falaknuma' },
        { name: 'ITC Kohenur', lat: 17.4411, lng: 78.3814, address: 'HITEC City' },
        { name: 'Novotel HICC', lat: 17.4558, lng: 78.3714, address: 'Madhapur' }
      ]
    },
    news: [
      { title: 'Hyderabad Metro expansion Phase 2 approved', time: '2 hours ago', category: 'Infrastructure' },
      { title: 'GHMC launches new smart waste management system', time: '4 hours ago', category: 'Services' },
      { title: 'IT exports from Hyderabad cross ₹2 lakh crore', time: '6 hours ago', category: 'Economy' },
      { title: 'New flyover at Biodiversity Junction inaugurated', time: '8 hours ago', category: 'Infrastructure' },
      { title: 'Hussain Sagar lake cleaning drive completed', time: '10 hours ago', category: 'Environment' }
    ],
    trafficInfo: [
      { road: 'HITEC City Main Road', status: 'heavy', delay: '25 min' },
      { road: 'Tank Bund Road', status: 'moderate', delay: '10 min' },
      { road: 'Jubilee Hills Road No. 36', status: 'light', delay: '5 min' },
      { road: 'Gachibowli ORR', status: 'heavy', delay: '30 min' }
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'Gateway to South India',
    description: 'Chennai, formerly Madras, is a major cultural and economic hub on the Bay of Bengal coast. Known for its classical dance heritage, ancient temples, beautiful Marina Beach, and as the Detroit of India for its automobile industry.',
    population: '11.5 Million',
    area: '426 km²',
    language: 'Tamil, English',
    climate: 'Tropical wet and dry',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
    coverGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f5576c',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    weather: { temp: 34, condition: 'Sunny', humidity: 72, wind: 18 },
    aqi: { value: 65, level: 'Moderate', color: '#f59e0b' },
    famousPlaces: [
      { name: 'Marina Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80', description: 'India\'s longest urban beach stretching 13 km' },
      { name: 'Kapaleeshwarar Temple', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80', description: '7th-century Dravidian-style Shiva temple' },
      { name: 'Fort St. George', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80', description: 'First English fortress in India, built in 1644' },
      { name: 'Mahabalipuram', image: 'https://images.unsplash.com/photo-1610489344745-3c4c7472a4d6?w=400&q=80', description: 'UNESCO Heritage shore temple complex' },
      { name: 'Government Museum', image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&q=80', description: 'Second oldest museum in India with rare collections' },
      { name: 'Valluvar Kottam', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80', description: 'Monument to Tamil poet Thiruvalluvar' }
    ],
    popularFoods: [
      { name: 'Filter Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80' },
      { name: 'Idli Sambar', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80' },
      { name: 'Chettinad Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80' },
      { name: 'Dosa Varieties', image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80' }
    ],
    emergencyContacts: [
      { name: 'Police', number: '100', icon: '🚔' },
      { name: 'Fire Department', number: '101', icon: '🚒' },
      { name: 'Ambulance', number: '108', icon: '🚑' },
      { name: 'Women Helpline', number: '181', icon: '👩' },
      { name: 'GCC Helpline', number: '1913', icon: '🏛️' },
      { name: 'Flood Control', number: '044-25619206', icon: '🌊' }
    ],
    amenities: {
      hospitals: [
        { name: 'Apollo Hospital', lat: 13.0105, lng: 80.2283, address: 'Greams Road, Chennai' },
        { name: 'Government General Hospital', lat: 13.0785, lng: 80.2742, address: 'Park Town, Chennai' },
        { name: 'MIOT International', lat: 13.0165, lng: 80.1987, address: 'Manapakkam, Chennai' },
        { name: 'Stanley Medical College', lat: 13.1076, lng: 80.2852, address: 'Royapuram, Chennai' }
      ],
      parks: [
        { name: 'Guindy National Park', lat: 13.0067, lng: 80.2206, address: 'Guindy' },
        { name: 'Semmozhi Poonga', lat: 13.0478, lng: 80.2537, address: 'Cathedral Road' },
        { name: 'Tholkappia Poonga', lat: 13.0285, lng: 80.2746, address: 'Adyar' },
        { name: 'Anna Nagar Tower Park', lat: 13.0867, lng: 80.2116, address: 'Anna Nagar' }
      ],
      policeStations: [
        { name: 'Mylapore PS', lat: 13.0368, lng: 80.2676, address: 'Mylapore' },
        { name: 'T Nagar PS', lat: 13.0400, lng: 80.2340, address: 'T Nagar' },
        { name: 'Adyar PS', lat: 13.0012, lng: 80.2565, address: 'Adyar' }
      ],
      petrolBunks: [
        { name: 'IOCL T Nagar', lat: 13.0380, lng: 80.2350, address: 'T Nagar Main Road' },
        { name: 'HP Adyar', lat: 13.0050, lng: 80.2550, address: 'Adyar Bridge' },
        { name: 'BPCL Anna Salai', lat: 13.0600, lng: 80.2620, address: 'Anna Salai' }
      ],
      hotels: [
        { name: 'ITC Grand Chola', lat: 13.0100, lng: 80.2290, address: 'Guindy' },
        { name: 'The Leela Palace', lat: 13.0455, lng: 80.2511, address: 'MRC Nagar' },
        { name: 'Taj Coromandel', lat: 13.0498, lng: 80.2516, address: 'Nungambakkam' }
      ]
    },
    news: [
      { title: 'Chennai Metro Phase 2 work progressing rapidly', time: '1 hour ago', category: 'Infrastructure' },
      { title: 'Smart street lighting project covers 500+ roads', time: '3 hours ago', category: 'Services' },
      { title: 'Marina Beach awarded cleanest urban beach', time: '5 hours ago', category: 'Environment' },
      { title: 'New IT corridor planned along OMR extension', time: '7 hours ago', category: 'Economy' },
      { title: 'GCC launches citizen app for complaint tracking', time: '9 hours ago', category: 'Technology' }
    ],
    trafficInfo: [
      { road: 'Anna Salai', status: 'heavy', delay: '30 min' },
      { road: 'OMR (IT Expressway)', status: 'moderate', delay: '15 min' },
      { road: 'ECR', status: 'light', delay: '5 min' },
      { road: 'Inner Ring Road', status: 'heavy', delay: '25 min' }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'City of Dreams',
    description: 'Mumbai, the financial capital of India, is a city of dreams, Bollywood glamour, and relentless energy. From the iconic Gateway of India to the bustling local trains, Mumbai offers an unparalleled urban experience with its rich blend of colonial heritage and modern skyline.',
    population: '21 Million',
    area: '603 km²',
    language: 'Marathi, Hindi, English',
    climate: 'Tropical monsoon',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80',
    coverGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    weather: { temp: 30, condition: 'Humid', humidity: 80, wind: 22 },
    aqi: { value: 95, level: 'Moderate', color: '#f59e0b' },
    famousPlaces: [
      { name: 'Gateway of India', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80', description: 'Iconic arch monument overlooking the Arabian Sea' },
      { name: 'Marine Drive', image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=400&q=80', description: 'Famous 3.6 km promenade known as Queen\'s Necklace' },
      { name: 'Chhatrapati Shivaji Terminus', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=400&q=80', description: 'UNESCO World Heritage Victorian Gothic railway station' },
      { name: 'Bandra-Worli Sea Link', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=80', description: 'Engineering marvel cable-stayed bridge' },
      { name: 'Elephanta Caves', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80', description: 'UNESCO Heritage rock-cut cave temples' },
      { name: 'Juhu Beach', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80', description: 'Famous beach known for street food and Bollywood homes' }
    ],
    popularFoods: [
      { name: 'Vada Pav', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&q=80' },
      { name: 'Pav Bhaji', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&q=80' },
      { name: 'Mumbai Street Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80' },
      { name: 'Bombay Duck Fry', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' }
    ],
    emergencyContacts: [
      { name: 'Police', number: '100', icon: '🚔' },
      { name: 'Fire Brigade', number: '101', icon: '🚒' },
      { name: 'Ambulance', number: '108', icon: '🚑' },
      { name: 'Women Helpline', number: '181', icon: '👩' },
      { name: 'BMC Helpline', number: '1916', icon: '🏛️' },
      { name: 'Disaster Management', number: '022-22694725', icon: '⚠️' }
    ],
    amenities: {
      hospitals: [
        { name: 'Lilavati Hospital', lat: 19.0509, lng: 72.8294, address: 'Bandra West, Mumbai' },
        { name: 'KEM Hospital', lat: 19.0006, lng: 72.8416, address: 'Parel, Mumbai' },
        { name: 'Breach Candy Hospital', lat: 18.9728, lng: 72.8054, address: 'Breach Candy, Mumbai' },
        { name: 'Nanavati Hospital', lat: 19.0934, lng: 72.8413, address: 'Vile Parle, Mumbai' }
      ],
      parks: [
        { name: 'Sanjay Gandhi National Park', lat: 19.2147, lng: 72.9106, address: 'Borivali' },
        { name: 'Hanging Gardens', lat: 18.9561, lng: 72.8050, address: 'Malabar Hill' },
        { name: 'Aarey Colony', lat: 19.1526, lng: 72.8716, address: 'Goregaon' },
        { name: 'Priyadarshini Park', lat: 18.9700, lng: 72.8090, address: 'Nepean Sea Road' }
      ],
      policeStations: [
        { name: 'Bandra PS', lat: 19.0596, lng: 72.8295, address: 'Bandra West' },
        { name: 'Colaba PS', lat: 18.9067, lng: 72.8147, address: 'Colaba' },
        { name: 'Andheri PS', lat: 19.1197, lng: 72.8464, address: 'Andheri West' }
      ],
      petrolBunks: [
        { name: 'HP Dadar', lat: 19.0178, lng: 72.8478, address: 'Dadar TT Circle' },
        { name: 'IOCL Bandra', lat: 19.0544, lng: 72.8402, address: 'Bandra East' },
        { name: 'BPCL Andheri', lat: 19.1136, lng: 72.8697, address: 'Andheri East' }
      ],
      hotels: [
        { name: 'Taj Mahal Palace', lat: 18.9220, lng: 72.8332, address: 'Colaba' },
        { name: 'The Oberoi Mumbai', lat: 18.9275, lng: 72.8214, address: 'Nariman Point' },
        { name: 'JW Marriott Juhu', lat: 19.0953, lng: 72.8268, address: 'Juhu' }
      ]
    },
    news: [
      { title: 'Mumbai Coastal Road opens for public', time: '1 hour ago', category: 'Infrastructure' },
      { title: 'BMC deploys 500 smart dustbins across city', time: '3 hours ago', category: 'Services' },
      { title: 'Navi Mumbai Airport completion date announced', time: '5 hours ago', category: 'Infrastructure' },
      { title: 'Marine Drive beautification project completed', time: '7 hours ago', category: 'Development' },
      { title: 'Mumbai local trains add 50 new AC coaches', time: '9 hours ago', category: 'Transport' }
    ],
    trafficInfo: [
      { road: 'Western Express Highway', status: 'heavy', delay: '35 min' },
      { road: 'Eastern Express Highway', status: 'heavy', delay: '30 min' },
      { road: 'Bandra-Worli Sea Link', status: 'moderate', delay: '15 min' },
      { road: 'Marine Drive', status: 'light', delay: '5 min' }
    ]
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'NCT',
    tagline: 'Heart of India',
    description: 'Delhi, India\'s capital territory, is a massive metropolitan area that seamlessly merges the ancient with the modern. From Mughal-era Red Fort to modern Connaught Place, Delhi is a treasure trove of history, culture, politics, and vibrant street life.',
    population: '32 Million',
    area: '1,484 km²',
    language: 'Hindi, English, Punjabi, Urdu',
    climate: 'Humid subtropical',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    coverGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: '#43e97b',
    coordinates: { lat: 28.7041, lng: 77.1025 },
    weather: { temp: 28, condition: 'Clear', humidity: 45, wind: 15 },
    aqi: { value: 155, level: 'Unhealthy', color: '#ef4444' },
    famousPlaces: [
      { name: 'Red Fort', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80', description: 'UNESCO World Heritage Mughal-era fort complex' },
      { name: 'India Gate', image: 'https://images.unsplash.com/photo-1597040663342-45b6ba68c88c?w=400&q=80', description: 'War memorial and iconic landmark of Delhi' },
      { name: 'Qutub Minar', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80', description: 'Tallest brick minaret in the world at 72.5m' },
      { name: 'Lotus Temple', image: 'https://images.unsplash.com/photo-1564507592214-5e0e52c3c318?w=400&q=80', description: 'Lotus-shaped Bahá\'í House of Worship' },
      { name: 'Humayun\'s Tomb', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80', description: 'Precursor to the Taj Mahal architecture' },
      { name: 'Connaught Place', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', description: 'Iconic colonial-era commercial district' }
    ],
    popularFoods: [
      { name: 'Chole Bhature', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&q=80' },
      { name: 'Butter Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80' },
      { name: 'Paranthe Wali Gali', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
      { name: 'Chaat (Street Food)', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' }
    ],
    emergencyContacts: [
      { name: 'Police', number: '100', icon: '🚔' },
      { name: 'Fire Department', number: '101', icon: '🚒' },
      { name: 'Ambulance', number: '102', icon: '🚑' },
      { name: 'Women Helpline', number: '1091', icon: '👩' },
      { name: 'MCD Helpline', number: '155305', icon: '🏛️' },
      { name: 'Anti-Pollution', number: '011-22307100', icon: '🌿' }
    ],
    amenities: {
      hospitals: [
        { name: 'AIIMS', lat: 28.5672, lng: 77.2100, address: 'Ansari Nagar, New Delhi' },
        { name: 'Safdarjung Hospital', lat: 28.5685, lng: 77.2072, address: 'Ring Road, New Delhi' },
        { name: 'Max Super Speciality', lat: 28.5672, lng: 77.1661, address: 'Saket, New Delhi' },
        { name: 'Fortis Hospital', lat: 28.5437, lng: 77.1592, address: 'Vasant Kunj, New Delhi' }
      ],
      parks: [
        { name: 'Lodhi Garden', lat: 28.5933, lng: 77.2197, address: 'Lodhi Road' },
        { name: 'Garden of Five Senses', lat: 28.5133, lng: 77.1983, address: 'Saket' },
        { name: 'Nehru Park', lat: 28.5922, lng: 77.1810, address: 'Chanakyapuri' },
        { name: 'Deer Park', lat: 28.5592, lng: 77.2050, address: 'Hauz Khas' }
      ],
      policeStations: [
        { name: 'Connaught Place PS', lat: 28.6315, lng: 77.2167, address: 'Connaught Place' },
        { name: 'Saket PS', lat: 28.5244, lng: 77.2002, address: 'Saket' },
        { name: 'Hauz Khas PS', lat: 28.5584, lng: 77.2005, address: 'Hauz Khas' }
      ],
      petrolBunks: [
        { name: 'IOCL CP', lat: 28.6320, lng: 77.2190, address: 'Connaught Place' },
        { name: 'HP Nehru Place', lat: 28.5489, lng: 77.2532, address: 'Nehru Place' },
        { name: 'BPCL Lajpat Nagar', lat: 28.5689, lng: 77.2430, address: 'Lajpat Nagar' }
      ],
      hotels: [
        { name: 'The Imperial', lat: 28.6268, lng: 77.2173, address: 'Janpath' },
        { name: 'Taj Palace Delhi', lat: 28.5964, lng: 77.1733, address: 'Sardar Patel Marg' },
        { name: 'The Leela Palace', lat: 28.5971, lng: 77.1700, address: 'Chanakyapuri' }
      ]
    },
    news: [
      { title: 'Delhi Metro adds 3 new stations on Grey Line', time: '2 hours ago', category: 'Infrastructure' },
      { title: 'Air quality monitoring stations increased to 100', time: '4 hours ago', category: 'Environment' },
      { title: 'Smart traffic management on Outer Ring Road', time: '6 hours ago', category: 'Transport' },
      { title: 'New Yamuna riverfront development project', time: '8 hours ago', category: 'Development' },
      { title: 'Delhi govt launches electric bus fleet of 1500', time: '10 hours ago', category: 'Transport' }
    ],
    trafficInfo: [
      { road: 'Outer Ring Road', status: 'heavy', delay: '40 min' },
      { road: 'Vikas Marg', status: 'moderate', delay: '20 min' },
      { road: 'Rajpath (Kartavya Path)', status: 'light', delay: '5 min' },
      { road: 'NH-48 (Gurugram)', status: 'heavy', delay: '45 min' }
    ]
  }
];
