/* ==========================================================
   Eventra — content data
   EVENTS    : sample cultural events (fictional organisers; inspired by real traditions)
   HERITAGE  : long-form content for the Heritage page
   Facts (UNESCO counts, festival dates) were checked against public sources in Nov 2026.
   ========================================================== */
 
window.CATEGORIES = ["All", "Festival", "Dance", "Music", "Workshop", "Heritage Walk", "Craft & Food", "Literature"];
 
/* Shared FAQ items appended to every event page */
window.COMMON_FAQ = [
  ["Do I need to print my ticket?", "No. Show the Ticket ID from My Tickets on your phone at the entrance, or print it from the My Tickets page."],
  ["Is the venue accessible?", "Yes. Ramps, reserved seating and volunteer assistance are available. Mention any needs in your registration and we will help."],
  ["Can I cancel my registration?", "Yes. Open My Tickets and choose Cancel; your seat is released straight away."]
];
 
window.EVENTS = [
  {
    id: "deepotsav-2026",
    title: "Deepotsav — The Festival of Lights",
    category: "Festival", region: "Pan-India",
    date: "2026-11-08T17:30:00", end: "2026-11-08T22:00:00",
    venue: "Heritage Lawns", city: "Bhubaneswar",
    price: 0, seats: 900, featured: true,
    palette: ["#f59e0b", "#dc2626"],
    short: "Light ten thousand diyas, watch the rangoli walk and celebrate Diwali — now on UNESCO's Intangible Heritage list.",
    about: [
      "Diwali (Deepavali) falls on Sunday, 8 November 2026. Join us on the lawns as the whole campus is lit by thousands of earthen diyas, marigold garlands and hand-made rangoli. The evening begins with a community Lakshmi Puja and ends with a cultural showcase of folk songs and dance.",
      "Bring your family and friends: children can paint their own diya, elders share Diwali memories at the storytelling corner, and everyone ends the night with traditional sweets. The venue is cracker-free, in keeping with a cleaner, calmer and greener way to celebrate."
    ],
    significance: "Deepavali was inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity in 2025. It celebrates the victory of light over darkness and knowledge over ignorance, and is observed in many forms across India: Lakshmi Puja in much of the country, Kali Puja in Odisha, Bengal and Assam, the return of Rama to Ayodhya in the north, and the Jain commemoration of Mahavira's nirvana. In Odisha, families also light jute stalks (Kaunria Kathi) to call upon their ancestors.",
    highlights: ["10,000-diya installation & lamp-lighting ceremony", "Rangoli and Jhoti-chita floor-art walk", "Community Lakshmi Puja at dusk", "Kids' diya-painting corner", "Folk music and dance showcase", "Traditional sweets stalls: Rasabali, Chhena Poda, Laddoo"],
    expect: ["An evening of about 4.5 hours, outdoors on the lawns.", "Soft lighting and live music; the event is cracker-free.", "Food stalls open from 6:00 PM."],
    dress: "Festive traditional wear — saree, kurta, dhoti or any bright ethnic outfit.",
    bring: ["A light shawl for the evening", "Your own diya if you like", "A reusable water bottle"],
    speakers: ["Pandit Ramesh Mishra — Ritual Guide", "Smt. Lopa Behera — Rangoli Artist", "Eventra Folk Ensemble"],
    agenda: [["17:30", "Gates open & rangoli walk"], ["18:15", "Community Lakshmi Puja"], ["18:45", "Diya-lighting ceremony"], ["19:30", "Folk music & dance showcase"], ["21:00", "Sweets & storytelling circle"]],
    faq: [["Are crackers allowed?", "No. The venue is strictly cracker-free to protect people, animals and air quality."], ["Is it suitable for children?", "Absolutely — there is a dedicated children's corner."]],
    tags: ["diwali", "lights", "family", "unesco"]
  },
  {
    id: "rangoli-jhoti-workshop",
    title: "Rangoli, Alpana & Jhoti Chita Workshop",
    category: "Workshop", region: "Odisha · Pan-India",
    date: "2026-11-07T10:00:00", end: "2026-11-07T14:00:00",
    venue: "Kala Bhavan, Room 12", city: "Bhubaneswar",
    price: 149, seats: 60, featured: false,
    palette: ["#e11d48", "#f59e0b"],
    short: "Learn the floor-art traditions of India — rangoli, Bengal's alpana and Odisha's rice-paste Jhoti Chita.",
    about: [
      "Floor art welcomes guests and invites prosperity into the home. In this hands-on workshop, a practising folk artist walks you through basic geometry, dot-grid layouts, freehand lotus and paisley motifs, and the symbolism behind them.",
      "You will make three designs: a dot-grid rangoli with coloured powders, an alpana-style line pattern, and a Jhoti Chita panel using traditional rice-paste (pitha) on a prepared floor. Take your artwork home or leave it for the Deepotsav display the next day."
    ],
    significance: "Rangoli (Maharashtra, Gujarat, North India), Kolam (Tamil Nadu), Alpana (Bengal) and Jhoti Chita (Odisha) are regional names for one shared idea: art made fresh each day, then allowed to fade. In Odisha, Jhoti is drawn with rice paste, especially during Lakshmi Puja, and each motif — footprints, lotus, conch, fish — carries a blessing. Traditional materials are rice flour, flower petals and natural pigments.",
    highlights: ["Three finished designs", "Natural colours: rice flour, turmeric, flower petals", "Symbolism of lotus, conch, footprints and fish", "Materials included"],
    expect: ["Seated, hands-on session of 4 hours with a tea break.", "Beginners are very welcome."],
    dress: "Comfortable clothes you don't mind getting colourful.",
    bring: ["Nothing — all materials are provided", "A cloth to carry your artwork"],
    speakers: ["Smt. Lopa Behera — Folk Artist"],
    agenda: [["10:00", "Introduction & symbolism"], ["10:45", "Dot-grid rangoli"], ["12:00", "Alpana line patterns"], ["13:00", "Jhoti Chita panel"]],
    faq: [["Do I need drawing skills?", "No. We start from simple dots and lines."]],
    tags: ["rangoli", "jhoti", "art", "hands-on"]
  },
  {
    id: "annakut-bhog-mela",
    title: "Annakut Bhog & Govardhan Puja Mela",
    category: "Craft & Food", region: "North & West India",
    date: "2026-11-10T11:00:00", end: "2026-11-10T16:00:00",
    venue: "Community Courtyard", city: "Bhubaneswar",
    price: 99, seats: 250, featured: false,
    palette: ["#f97316", "#facc15"],
    short: "A mountain of vegetarian offerings and a regional food trail on Govardhan Puja day.",
    about: [
      "Govardhan Puja (Annakut) falls on Tuesday, 10 November 2026, the day after Diwali celebrations. Volunteers build a symbolic hill of grains, sweets and seasonal vegetables, which is offered and then shared as prasad with all guests.",
      "Wander through the regional food trail — Gujarati kadhi, Rajasthani dal-baati, Bengali mishti, Odia dalma — and watch live demonstrations on how seasonal and local ingredients are cooked."
    ],
    significance: "Annakut means \"a mountain of food\". It recalls the story of Krishna lifting Mount Govardhan to shelter his village and is a thanksgiving for the harvest. The idea behind it, abundance shared with everyone, is at the heart of India's community-meal traditions such as langar and the Jagannath temple's Mahaprasad.",
    highlights: ["Annakut offering and aarti", "Regional vegetarian food trail", "Live cooking demonstrations", "Millet and seasonal vegetable specials"],
    expect: ["Tasting coupons included with registration.", "All food is vegetarian."],
    dress: "Casual or traditional.",
    bring: ["Reusable plates or a steel tiffin if you can", "Appetite!"],
    speakers: ["Chef Sudhakar Nayak — Heritage Cuisine"],
    agenda: [["11:00", "Annakut set-up & aarti"], ["12:00", "Prasad distribution"], ["13:00", "Cooking demonstrations"], ["14:30", "Regional food trail"]],
    faq: [["Is the food vegetarian?", "Yes, entirely."], ["Do you cater to allergies?", "Ingredient cards are displayed at every stall; ask the volunteers for help."]],
    tags: ["food", "annakut", "prasad", "community"]
  },
  {
    id: "bharatanatyam-odissi-masterclass",
    title: "Classical Dance Masterclass: Odissi & Bharatanatyam",
    category: "Dance", region: "Odisha · Tamil Nadu",
    date: "2026-11-14T09:30:00", end: "2026-11-14T16:30:00",
    venue: "Kalamandap Studio", city: "Bhubaneswar",
    price: 299, seats: 50, featured: false,
    palette: ["#9333ea", "#ec4899"],
    short: "A full-day primer on two classical dance forms: posture, mudras, rhythm and storytelling.",
    about: [
      "Two senior performers introduce the grammar of Odissi and Bharatanatyam side by side. Learn basic stances, the hand gestures (hasta mudras) and footwork patterns, and see how each tradition uses the same emotions — the Navarasa — in its own style.",
      "The afternoon is devoted to Abhinaya (expressive storytelling): you will learn a short verse and perform it for the class. No prior experience is needed."
    ],
    significance: "India recognises eight classical dance forms: Bharatanatyam, Kathak, Kuchipudi, Odissi, Kathakali, Sattriya, Manipuri and Mohiniyattam. Their shared roots lie in the Natya Shastra, an ancient treatise on performing arts. Odissi grew out of Odisha's temple traditions and is known for its flowing Tribhangi (three-bend) posture and sculptural poses that echo temple carvings. Bharatanatyam, from Tamil Nadu, is known for its crisp geometry and precise footwork.",
    highlights: ["Tribhangi and Chauka (Odissi) vs. Araimandi (Bharatanatyam)", "24 basic hand gestures", "The nine emotions (Navarasa)", "Short Abhinaya piece and mini-performance"],
    expect: ["Active floor session with breaks.", "Wooden floor and mirrors provided."],
    dress: "Comfortable stretchable clothing; practice sarees or dupatta optional. Dance is performed barefoot.",
    bring: ["Water bottle", "Notebook", "Optional ghungroo (ankle bells)"],
    speakers: ["Vidushi Anuradha Rath — Odissi Exponent", "Kalaimamani Meenakshi Raman — Bharatanatyam Guru"],
    agenda: [["09:30", "Warm-up & posture"], ["11:00", "Odissi basics"], ["13:30", "Bharatanatyam basics"], ["15:00", "Abhinaya & mini-performance"]],
    faq: [["Can complete beginners join?", "Yes — the first session is designed for first-timers."]],
    tags: ["odissi", "bharatanatyam", "classical", "dance"]
  },
  {
    id: "pattachitra-sand-art",
    title: "Pattachitra & Sand Art Workshop",
    category: "Craft & Food", region: "Odisha",
    date: "2026-11-21T10:00:00", end: "2026-11-21T16:00:00",
    venue: "Craft Studio, Block B", city: "Bhubaneswar",
    price: 249, seats: 45, featured: false,
    palette: ["#b45309", "#16a34a"],
    short: "Paint on cloth in the style of Odisha's centuries-old Pattachitra and sculpt a mini sand artwork.",
    about: [
      "Pattachitra artists from the craft villages of Odisha demonstrate how a painting begins: a cloth canvas stiffened with tamarind-seed paste, outlines drawn first and colours applied from stone and shell pigments. You will paint a small panel with the traditional border, lotus-eyed faces and bold outlines.",
      "In the second session, a sand-art sculptor explains how fine-grained sand and water create temporary sculptures — Odisha's beaches are famous for them — and guides you in building your own."
    ],
    significance: "Pattachitra (\"cloth painting\") is closely associated with the worship of Lord Jagannath at Puri and the craft village of Raghurajpur. Its themes come from Jagannath and Vaishnava tales, the Ramayana and local folklore. Natural colours from minerals, plants and shells are still used by traditional painters. Supporting artisans keeps the knowledge alive and the villages thriving.",
    highlights: ["Natural pigments from stone, shell and plant", "Traditional borders and motifs", "Live demonstration by master painters", "Sand-sculpture mini session"],
    expect: ["Two sessions with lunch break.", "Take home your finished panel."],
    dress: "Comfortable clothes; aprons provided.",
    bring: ["Nothing — kits are provided"],
    speakers: ["Shri Gobinda Maharana — Pattachitra Artist", "Smt. Namita Sahoo — Sand Artist"],
    agenda: [["10:00", "History & demonstration"], ["11:00", "Paint your Pattachitra panel"], ["13:30", "Lunch"], ["14:30", "Sand art session"]],
    faq: [["Are the colours safe for kids?", "Yes, natural pigments are used; children above 10 may join with an adult."]],
    tags: ["pattachitra", "odisha", "craft", "painting"]
  },
  {
    id: "bali-jatra-boita-bandana",
    title: "Bali Jatra & Boita Bandana Evening",
    category: "Festival", region: "Odisha",
    date: "2026-11-24T16:00:00", end: "2026-11-24T21:30:00",
    venue: "Lakefront Ghat", city: "Bhubaneswar",
    price: 0, seats: 700, featured: true,
    palette: ["#0ea5e9", "#f59e0b"],
    short: "Float lit paper boats at dusk on Kartik Purnima to remember Odisha's seafaring merchants.",
    about: [
      "Kartik Purnima falls on Tuesday, 24 November 2026. At dawn and dusk on this day across Odisha, families float miniature boats made of paper, banana bark and sola pith, each carrying a lamp, betel nut and flowers. We recreate that scene on the lakefront with workshops, music and a fair.",
      "Arrive early to make your own boita (boat), hear a retelling of the sadhaba (merchant) tales, and join the Boita Bandana at sunset. Fair stalls will sell handicrafts, toys and street snacks in the spirit of the famous Cuttack Bali Jatra."
    ],
    significance: "Boita Bandana recalls Kalinga's ancient maritime trade: sailors known as sadhabas sailed from Odisha's ports to Bali, Java, Sumatra and beyond, setting out around Kartik Purnima when the winds were favourable. The name Bali Jatra means \"voyage to Bali\". The same full-moon day is Dev Deepawali, when ghats across the country, most famously in Varanasi, glow with lamps.",
    highlights: ["Paper and banana-bark boat-making", "Sunset Boita Bandana with lamps", "Sadhaba storytelling", "Handicraft & street-food fair", "Conch (shankha) and drum opening"],
    expect: ["Ghat-side programme in the open air; steps can be slippery.", "Lamps are floated only in the designated area; non-plastic boats only."],
    dress: "Light traditional wear; closed-toe or sturdy footwear for the ghat.",
    bring: ["A shawl", "Camera (no drones)"],
    speakers: ["Dr. Rashmi Dash — Maritime Historian", "Smt. Sandhya Pati — Folk Singer"],
    agenda: [["16:00", "Fair opens & boat-making"], ["17:00", "Sadhaba stories"], ["17:45", "Boita Bandana"], ["18:30", "Folk music"], ["20:00", "Closing aarti"]],
    faq: [["Are the boats eco-friendly?", "Yes. Only biodegradable materials are used and volunteers collect them after the ceremony."]],
    tags: ["balijatra", "kartik-purnima", "odisha", "maritime"]
  },
  {
    id: "temple-city-heritage-walk",
    title: "Temple City Heritage Walk",
    category: "Heritage Walk", region: "Odisha",
    date: "2026-11-28T06:30:00", end: "2026-11-28T10:30:00",
    venue: "Old Town Temple Trail", city: "Bhubaneswar",
    price: 0, seats: 40, featured: false,
    palette: ["#a16207", "#f97316"],
    short: "A guided sunrise walk through Kalinga temple architecture, carvings and legends.",
    about: [
      "Bhubaneswar is often called the Temple City of India, home to many ancient temples dating from roughly the 7th to the 13th century. Our historian guide leads a four-hour walk through some of the best-preserved examples, explaining how to read the carvings and the three parts of a Kalinga temple.",
      "Pause for tea in the old town and chat with the priests and craftspeople who still work around the temple tanks."
    ],
    significance: "Kalinga-style architecture has a tall curved tower (rekha deul), a porch (jagamohana) and a hall for dancing and offerings. The tradition reached its peak in the 13th-century Sun Temple at Konark, which is a UNESCO World Heritage Site (1984) built as a stone chariot of the Sun god with 24 wheels and seven horses. Walking the old temples is a lesson in how art, astronomy, dance and devotion were woven together.",
    highlights: ["Reading temple carvings and iconography", "Rekha deul and jagamohana explained", "Temple tank (kunda) tradition", "Sunrise photography tips"],
    expect: ["About 4 km of easy walking.", "Shoes are removed at temple thresholds; carry a cloth bag for them."],
    dress: "Modest clothing covering shoulders and knees; comfortable footwear that is easy to remove.",
    bring: ["Water", "Hat", "Camera", "Cloth bag for shoes"],
    speakers: ["Prof. Aditya Mohanty — Architectural Historian"],
    agenda: [["06:30", "Meet at the trail head"], ["07:00", "First temple group"], ["08:30", "Tea break"], ["09:00", "Second temple group & Q&A"]],
    faq: [["Are non-Hindus welcome?", "The walk covers exteriors and public premises only; inner sanctums have their own rules, which the guide will explain."]],
    tags: ["temples", "kalinga", "architecture", "walk"]
  },
  {
    id: "konark-tribute-odissi",
    title: "Odissi Under the Stars: A Konark Tribute",
    category: "Dance", region: "Odisha",
    date: "2026-12-03T18:00:00", end: "2026-12-03T21:00:00",
    venue: "Open Air Amphitheatre", city: "Bhubaneswar",
    price: 399, seats: 600, featured: true,
    palette: ["#7c3aed", "#f59e0b"],
    short: "A three-hour evening of Odissi and other classical dance, inspired by the Konark Dance Festival.",
    about: [
      "Every year from 1 to 5 December, classical dancers gather in Konark for the Konark Festival — a five-day classical dance carnival held since 1986 against the backdrop of the Sun Temple. This student-run evening is a tribute to that tradition, showcasing solo and group performances on one stage.",
      "Expect Odissi pieces such as Mangalacharan, Pallavi and Moksha, plus short items in Bharatanatyam, Kathak and Manipuri by guest artists. Programme notes explain each piece so even first-time viewers can follow."
    ],
    significance: "Odissi's poses resemble the sculptures on temple walls: the dancer's body forms the graceful Tribhangi, and the Gita Govinda — a 12th-century Sanskrit poem by Jayadeva — has long inspired its Abhinaya. The dance was nearly lost and was revived in the 20th century by dedicated gurus, and is now one of India's eight classical forms. This event is independent and not affiliated with the official Konark Festival.",
    highlights: ["Odissi solos and ensemble pieces", "Guest items in Bharatanatyam, Kathak, Manipuri", "Illustrated programme notes", "Meet-the-artists session"],
    expect: ["Open-air amphitheatre seating on stone steps; cushions available for hire.", "Photography without flash is allowed."],
    dress: "Smart traditional or smart casual; evenings are cool in December.",
    bring: ["A light jacket or shawl", "Seat cushion"],
    speakers: ["Vidushi Anuradha Rath — Odissi", "Guru Debashree Pal — Kathak", "Ensemble Nrityanjali"],
    agenda: [["18:00", "Mangalacharan"], ["18:30", "Solo Odissi: Pallavi"], ["19:15", "Guest items"], ["20:15", "Group finale: Moksha"], ["20:45", "Meet the artists"]],
    faq: [["Is this the official Konark Festival?", "No. It is a student tribute; the official festival is held at Konark every 1–5 December."]],
    tags: ["odissi", "konark", "classical", "stage"]
  },
  {
    id: "yoga-ayurveda-retreat",
    title: "Yoga & Ayurveda Heritage Morning",
    category: "Workshop", region: "Pan-India",
    date: "2026-12-06T06:00:00", end: "2026-12-06T12:00:00",
    venue: "Garden Pavilion", city: "Bhubaneswar",
    price: 199, seats: 100, featured: false,
    palette: ["#16a34a", "#facc15"],
    short: "Sunrise yoga, pranayama, an Ayurveda talk and a wholesome breakfast.",
    about: [
      "Start Sunday with a 75-minute guided yoga session — asanas, pranayama and meditation — suitable for all levels. A trained Ayurveda practitioner then explains the idea of the three doshas (Vata, Pitta, Kapha), seasonal routines and simple kitchen remedies.",
      "A light millet breakfast follows, with a short talk on traditional diets and sustainable eating."
    ],
    significance: "Yoga was inscribed on UNESCO's Intangible Cultural Heritage list in 2016. Rooted in ancient Indian philosophy, it joins body, breath and mind. Ayurveda, the \"science of life\", treats health as balance among body, mind and environment. Both are now part of a global conversation on preventive wellbeing, but their origins are Indian and have been passed on through gurus, texts and daily household practice.",
    highlights: ["Beginner-friendly yoga flow", "Pranayama and guided meditation", "Ayurveda talk: doshas and seasonal routines", "Millet breakfast"],
    expect: ["Mats provided; bring a towel.", "Please arrive 15 minutes early."],
    dress: "Loose, comfortable clothing.",
    bring: ["Towel", "Water bottle", "Own yoga mat if you prefer"],
    speakers: ["Yogacharya Surya Prakash — Yoga Teacher", "Vaidya Kamala Joshi — Ayurveda Practitioner"],
    agenda: [["06:00", "Yoga & pranayama"], ["07:30", "Meditation"], ["08:15", "Ayurveda talk"], ["09:30", "Millet breakfast"]],
    faq: [["Is this safe for beginners?", "Yes. Modifications are shown for every pose. Please inform the teacher about any injuries."]],
    tags: ["yoga", "ayurveda", "wellness", "unesco"]
  },
  {
    id: "handloom-handicraft-mela",
    title: "Handloom & Handicraft Mela",
    category: "Craft & Food", region: "Pan-India",
    date: "2026-12-12T10:00:00", end: "2026-12-13T20:00:00",
    venue: "Exhibition Ground", city: "Bhubaneswar",
    price: 0, seats: 1200, featured: true,
    palette: ["#dc2626", "#0f766e"],
    short: "Two days with weavers and artisans: Sambalpuri ikat, Pattachitra, dhokra, Banarasi and more.",
    about: [
      "Meet the makers behind India's most celebrated textiles and crafts. Weavers demonstrate Sambalpuri ikat (bandha) on handlooms, metalworkers show the lost-wax dhokra technique, and painters create Madhubani and Pattachitra pieces live.",
      "A saree-draping corner shows regional styles, and a children's craft zone lets young visitors try block printing. Each stall displays the craft's story and origin so you buy knowing what you are supporting."
    ],
    significance: "Handloom and handicraft are among India's largest sources of rural livelihoods and carry skills handed down over generations. Sambalpuri ikat, Banarasi brocade, Kanjeevaram silk, Chikankari embroidery and Madhubani painting are only a few. The Thatheras of Jandiala Guru in Punjab, who make brass and copper utensils by hand, are listed on UNESCO's Intangible Heritage list (2014). Choosing handmade products helps artisan families and keeps living traditions alive.",
    highlights: ["Live weaving and dyeing demonstrations", "Saree-draping corner", "Block-printing for children", "Artisan talks and Q&A", "Fair-price direct-from-maker stalls"],
    expect: ["Entry is free; shopping optional.", "UPI and card payments accepted at most stalls."],
    dress: "Casual; comfortable footwear.",
    bring: ["A cloth bag for your purchases"],
    speakers: ["Master Weaver Bhagaban Meher", "Shri Kailash Sharma — Banarasi Weaver", "Smt. Geeta Devi — Madhubani Artist"],
    agenda: [["Day 1 · 10:00", "Inauguration & lamp-lighting"], ["Day 1 · 12:00", "Weaving demonstrations"], ["Day 2 · 11:00", "Dhokra and Madhubani live"], ["Day 2 · 17:00", "Fashion walk: handloom"]],
    faq: [["Are the products genuine handloom?", "Every stall is verified by the organisers; ask for the weaver's card."]],
    tags: ["handloom", "ikat", "crafts", "shopping"]
  },
  {
    id: "odia-thali-food-festival",
    title: "Odia Thali & Street Food Heritage Festival",
    category: "Craft & Food", region: "Odisha",
    date: "2026-12-19T12:00:00", end: "2026-12-19T21:00:00",
    venue: "Food Court Plaza", city: "Bhubaneswar",
    price: 199, seats: 300, featured: false,
    palette: ["#ea580c", "#65a30d"],
    short: "Dalma, pakhala, chhena poda and rasabali — a tasting journey through Odisha's kitchen.",
    about: [
      "From temple prasad to street-side snacks, Odia cuisine is simple, seasonal and balanced. Our day-long festival features home cooks and chefs serving a full thali — dalma (lentils with vegetables), santula, badi chura and saga bhaja — along with street favourites like dahibara aloodum and gupchup.",
      "Dessert lovers can compare chhena poda (a baked cheese dessert), rasabali and chenna jhili; a master cook shows how pakhala (fermented rice) becomes a summer staple."
    ],
    significance: "The Mahaprasad of the Jagannath Temple in Puri is among India's most famous communal meals, cooked in earthen pots over wood fires. The temple tradition influences Odia home cooking, which favours mustard oil, panch phutana spice mix and few chillies. Millets, once a staple, have returned to modern tables; the UN declared 2023 the International Year of Millets. Eating regionally and seasonally is itself a form of preserving heritage.",
    highlights: ["Full Odia thali tasting", "Street-food trail", "Dessert comparison: chhena poda, rasabali", "Cooking demo: pakhala", "Recipe booklet for every visitor"],
    expect: ["Entry includes tasting coupons worth ₹150.", "Vegetarian and non-vegetarian sections are separate."],
    dress: "Casual.",
    bring: ["Reusable cutlery if you have it"],
    speakers: ["Chef Sudhakar Nayak", "Smt. Pushpa Mohanty — Home Cook"],
    agenda: [["12:00", "Doors & tasting begins"], ["14:00", "Pakhala demonstration"], ["16:00", "Dessert showdown"], ["18:00", "Live folk music"]],
    faq: [["Are there vegetarian options?", "Yes. Most Odia dishes featured are vegetarian."]],
    tags: ["odisha", "food", "thali", "street-food"]
  },
  {
    id: "raga-sandhya",
    title: "Raga Sandhya: Hindustani Classical Evening",
    category: "Music", region: "North India · Odisha",
    date: "2026-12-20T18:00:00", end: "2026-12-20T21:30:00",
    venue: "Grand Auditorium", city: "Bhubaneswar",
    price: 349, seats: 450, featured: false,
    palette: ["#1d4ed8", "#f59e0b"],
    short: "Sitar, bansuri, tabla and vocal — an evening of ragas for the twilight hours.",
    about: [
      "Three musicians present ragas traditionally associated with the evening: Yaman, Puriya Dhanashri and a closing bhajan. Before each piece, a short note explains the raga's mood, its notes and the story it tells.",
      "A tabla accompanist leads a short rhythm session so the audience can learn to keep time with claps and waves (tali and khali)."
    ],
    significance: "Hindustani classical music is built on raga (melodic framework) and tala (rhythmic cycle). Traditionally, each raga is linked to a time of day or season, and improvisation within the framework is central. It is taught through the guru–shishya parampara, from teacher to student, often over many years. The same ancient roots give rise to Odissi music and the southern Carnatic tradition.",
    highlights: ["Evening ragas explained", "Sitar and bansuri duet", "Tabla rhythm lesson for the audience", "Closing bhajan"],
    expect: ["Seated concert; please be seated by 17:55.", "Phones on silent."],
    dress: "Smart or traditional.",
    bring: ["Curiosity"],
    speakers: ["Pt. Soumya Panigrahi — Sitar", "Vidushi Kavya Rao — Vocal", "Ustad Imran Khan Sahab — Tabla"],
    agenda: [["18:00", "Raga Yaman"], ["19:00", "Rhythm lesson"], ["19:30", "Raga Puriya Dhanashri"], ["20:30", "Closing bhajan"]],
    faq: [["Do I need to understand classical music?", "Not at all. Programme notes and short intros guide you."]],
    tags: ["hindustani", "raga", "sitar", "classical"]
  },
  {
    id: "folk-fusion-night",
    title: "Lok Rang: Folk Fusion Night",
    category: "Music", region: "Pan-India",
    date: "2026-12-26T18:30:00", end: "2026-12-26T22:30:00",
    venue: "Central Quadrangle", city: "Bhubaneswar",
    price: 249, seats: 800, featured: false,
    palette: ["#e11d48", "#f97316"],
    short: "Chhau, Dalkhai, Garba and Bhangra on one stage, with a live folk-rock band.",
    about: [
      "India's folk traditions come alive in a single evening: Mayurbhanj Chhau from Odisha, Dalkhai from the west, Garba from Gujarat, Bhangra from Punjab, Kalbelia from Rajasthan and Ghoomura. Between sets, a live band blends folk melodies with contemporary beats.",
      "Everyone is invited to learn a simple Garba step and join the circle dance."
    ],
    significance: "Chhau (inscribed on UNESCO's list in 2010), Kalbelia (2010) and Garba (2023) are among India's recognised living traditions. Folk performance carries history, harvest and community identity through rhythm and movement. Mayurbhanj Chhau, unusually, is performed without masks, while the Purulia and Seraikella styles use them.",
    highlights: ["Chhau martial-dance showcase", "Garba circle dance workshop", "Folk-rock fusion band", "Costume and instrument display"],
    expect: ["Standing and dancing area; some seats at the sides.", "Loud music — earplugs available."],
    dress: "Colourful ethnic wear; comfortable shoes for dancing.",
    bring: ["Dancing shoes", "Energy"],
    speakers: ["Guru Haraprasad Das — Chhau", "Band Dhwani Collective"],
    agenda: [["18:30", "Chhau showcase"], ["19:30", "Folk dance medley"], ["20:30", "Garba workshop"], ["21:15", "Fusion band"]],
    faq: [["Can children attend?", "Yes, with a guardian; early session suits young children."]],
    tags: ["folk", "chhau", "garba", "bhangra"]
  },
  {
    id: "makar-sankranti-mela",
    title: "Makar Sankranti Harvest & Kite Mela",
    category: "Festival", region: "Pan-India",
    date: "2027-01-15T08:00:00", end: "2027-01-15T17:00:00",
    venue: "Sports Ground", city: "Bhubaneswar",
    price: 0, seats: 1000, featured: true,
    palette: ["#f59e0b", "#0ea5e9"],
    short: "Kites, sesame sweets and harvest feasts on Makar Sankranti — Pongal, Lohri and Uttarayan under one sky.",
    about: [
      "Makar Sankranti is on Friday, 15 January 2027 (Lohri is on 14 January and Pongal's main day falls on 15 January). Begin the day with a community Makara Chaula offering of new rice, jaggery, banana, coconut and sesame, then fill the sky with kites.",
      "Different regional corners explain Pongal (Tamil Nadu), Lohri (Punjab), Uttarayan (Gujarat), Bhogali Bihu (Assam) and Makara Mela (Odisha), with matching foods and games."
    ],
    significance: "Makar Sankranti marks the Sun's entry into Makara (Capricorn) and the start of Uttarayana, its northward journey. It is a harvest thanksgiving celebrated under many names across India. Til-gud (sesame and jaggery) sweets share warmth for winter and sweetness in relationships. The festival shows how a single astronomical event gives rise to a rich variety of local customs.",
    highlights: ["Makara Chaula offering", "Kite-flying with experts", "Regional harvest corners", "Til-gud and pitha stalls", "Bonfire and folk songs in the evening"],
    expect: ["Outdoor event; bring sun protection.", "Kites provided; avoid glass-coated (manja) string — we supply cotton thread."],
    dress: "Comfortable clothes in yellow or orange; sun hat.",
    bring: ["Sunscreen", "Sunglasses", "Water"],
    speakers: ["Shri Mahesh Patel — Kite Master", "Smt. Revathi Iyer — Pongal Traditions"],
    agenda: [["08:00", "Makara Chaula offering"], ["09:30", "Kite-flying begins"], ["12:00", "Regional harvest lunch"], ["16:00", "Folk songs & closing"]],
    faq: [["Is it safe for birds?", "Yes. Only cotton thread is used and flying ends before dusk to protect birds."]],
    tags: ["sankranti", "kites", "harvest", "pongal"]
  },
  {
    id: "bharat-parv-republic-day",
    title: "Bharat Parv: Unity in Diversity",
    category: "Festival", region: "Pan-India",
    date: "2027-01-26T09:00:00", end: "2027-01-26T14:00:00",
    venue: "Central Quadrangle", city: "Bhubaneswar",
    price: 0, seats: 1200, featured: false,
    palette: ["#f97316", "#15803d"],
    short: "Flag hoisting, a parade of states, costumes, languages and cuisines on Republic Day.",
    about: [
      "On 26 January, India celebrates the day its Constitution came into force in 1950. Our Republic Day programme opens with the flag-hoisting and national anthem, followed by a parade of tableaux, each representing a state or union territory with its costumes, music and food.",
      "Visitors can try writing their name in different scripts, taste snacks from across the country and play traditional games at the Bharat Gali stalls."
    ],
    significance: "India's cultural diversity is formally recognised: the Constitution lists 22 languages in its Eighth Schedule, and the country has 28 states and 8 union territories, each with distinct food, dress and folk arts. Heritage here is not one story but many, and the constitutional promise of unity respects all of them. Knowing and celebrating each other's traditions is how that diversity becomes strength.",
    highlights: ["Flag hoisting & anthem", "State tableaux parade", "Script and language corners", "Traditional games: gilli-danda, pallanguzhi, lagori", "Regional snacks trail"],
    expect: ["Morning programme, mostly outdoors.", "Please be seated by 08:45 for the flag hoisting."],
    dress: "Tricolour theme or traditional wear.",
    bring: ["A small flag if you have one"],
    speakers: ["Chief Guest: a distinguished educationist", "Student cultural troupes"],
    agenda: [["09:00", "Flag hoisting & anthem"], ["09:45", "State tableaux parade"], ["11:30", "Bharat Gali stalls"], ["13:00", "Cultural finale"]],
    faq: [["Is registration compulsory?", "Free registration helps us plan seating and refreshments."]],
    tags: ["republic-day", "unity", "diversity", "tricolour"]
  },
  {
    id: "katha-utsav-literature",
    title: "Katha Utsav: Stories, Epics & Odia Literature",
    category: "Literature", region: "Pan-India · Odisha",
    date: "2027-01-30T10:00:00", end: "2027-01-30T17:00:00",
    venue: "Library Auditorium", city: "Bhubaneswar",
    price: 99, seats: 250, featured: false,
    palette: ["#92400e", "#fbbf24"],
    short: "A day of storytelling, epic recitation, poetry and a palm-leaf manuscript exhibit.",
    about: [
      "Tellers of tales from different traditions share the Ramayana and Mahabharata, Panchatantra fables, Odia folk stories and modern poetry. Hear how Sarala Das's 15th-century Odia Mahabharata retold the epic in the language of the people, and discover the satire of Fakir Mohan Senapati.",
      "An exhibition of palm-leaf manuscripts shows how stories were once written with an iron stylus. Try writing your name in Odia, Devanagari and Tamil script."
    ],
    significance: "India's literary heritage spans Sanskrit, Tamil and many other languages. Odia has been recognised as a classical language since 2014, and several others — including Sanskrit, Tamil and Bengali — hold the same status. Rabindranath Tagore won the Nobel Prize in Literature in 1913. Oral traditions, such as Vedic chanting (UNESCO 2008) and Ramlila (UNESCO 2008), kept knowledge alive for millennia before print.",
    highlights: ["Epic retellings by storytellers", "Palm-leaf manuscript exhibition", "Poetry open mic in multiple languages", "Script-writing corner", "Children's story hour"],
    expect: ["Talks and performances across the day; free entry to the exhibition.", "Light lunch provided."],
    dress: "Smart casual or traditional.",
    bring: ["A notebook"],
    speakers: ["Dr. Jyotirmayee Nanda — Odia Literature", "Shri Venkat Raman — Storyteller", "Smt. Sneha Mishra — Poet"],
    agenda: [["10:00", "Opening: why stories matter"], ["11:00", "Epic retellings"], ["13:30", "Palm-leaf exhibit tour"], ["15:00", "Poetry open mic"]],
    faq: [["Can I perform at the open mic?", "Yes. Add your language and poem title in the registration note."]],
    tags: ["literature", "odia", "epics", "storytelling"]
  }
];
 
/* =============== Heritage page content =============== */
window.HERITAGE = {
  facts: [
    { n: 44, l: "UNESCO World Heritage Sites", s: "36 cultural · 7 natural · 1 mixed" },
    { n: 16, l: "Intangible Heritage elements", s: "Latest: Deepavali (2025)" },
    { n: 8, l: "Classical dance forms", s: "From Odissi to Kathakali" },
    { n: 22, l: "Scheduled languages", s: "Eighth Schedule of the Constitution" }
  ],
  why: [
    ["Identity & belonging", "Heritage tells a community who it is. The songs we hum, the festivals we mark and the food we cook link us to ancestors we may never have met and give children a sense of roots in a fast-changing world."],
    ["A living library of knowledge", "India's heritage is not only stone and bronze; it is also knowledge. Yoga, Ayurveda, the decimal place-value system and the concept of zero, Vedic chanting, textile chemistry and temple engineering were refined across centuries and handed down through families and gurus."],
    ["Unity in diversity", "With 22 scheduled languages, 28 states and countless local customs, India's heritage is plural. Learning one another's traditions builds respect and turns diversity into a shared strength."],
    ["Livelihoods & the economy", "Handloom weavers, painters, metalworkers, priests, musicians and guides earn their living from heritage. Cultural tourism and handmade goods support rural and urban families alike."],
    ["Sustainability & wellbeing", "Traditional practices often have sustainability built in: natural dyes, stepwells, millet farming, clay lamps, seasonal food and community festivals. Many are now being rediscovered as models for greener living and healthier minds."],
    ["India's gift to the world", "Buddhism and Jainism began in India, as did yoga, chess's ancestor chaturanga and the number system used worldwide. Protecting heritage protects a contribution to all humanity."]
  ],
  tabs: [
    { id: "dance", name: "Dance & Music", title: "Rhythm as devotion",
      intro: "Indian performing arts trace their theory to the Natya Shastra, an ancient treatise on drama, dance and music. They treat performance as both entertainment and a path to the divine, using gesture, rhythm and emotion (rasa) to tell stories.",
      points: ["Eight classical dances: Bharatanatyam, Kathak, Kuchipudi, Odissi, Kathakali, Sattriya, Manipuri and Mohiniyattam.", "Two great classical music streams: Hindustani (north) and Carnatic (south), both built on raga and tala.", "Folk forms carry local history: Chhau, Dalkhai, Garba, Bhangra, Kalbelia, Ghoomura and hundreds more.", "Odissi is known for its Tribhangi posture and temple-sculpture poses."],
      fact: "The Navarasa, or nine emotions — love, laughter, compassion, anger, heroism, fear, disgust, wonder and peace — form the emotional palette of Indian classical dance." },
    { id: "festivals", name: "Festivals & Rituals", title: "A calendar of celebration",
      intro: "Most Indian festivals follow the lunisolar calendar and mark harvests, seasons, myths and community bonds. They are living heritage: each year, people recreate customs that are generations old.",
      points: ["Deepavali, Durga Puja in Kolkata, Kumbh Mela, Navroz, Garba and Ramlila are all on UNESCO's Intangible Heritage list.", "Odisha's calendar includes Rath Yatra, Bali Jatra, Raja Parba (celebrating womanhood and the earth) and Nuakhai (the first-rice harvest festival of western Odisha).", "Harvest festivals — Makar Sankranti, Pongal, Lohri, Bihu — share gratitude for the land.", "Rangoli, lamps and communal feasting are common threads across regions."],
      fact: "India has festivals for every month, and many communities share them across religions — from Diwali sweets to Eid sheer khurma." },
    { id: "architecture", name: "Architecture", title: "Stone that remembers",
      intro: "India's built heritage ranges from the Harappan city of Dholavira to rock-cut caves, soaring temples, stepwells, forts and Indo-Islamic tombs. It shows the engineering skill and aesthetics of each age.",
      points: ["Temple styles include Nagara (north), Dravida (south) and Kalinga (Odisha), with the Sun Temple at Konark as a masterpiece.", "Rock-cut wonders: Ajanta and Ellora (1983), the Buddhist stupa at Sanchi (1989).", "Stepwells like Rani-ki-Vav (UNESCO 2014) show water engineering as art.", "Newer inscriptions: Dholavira (2021), Santiniketan (2023), Moidams of Assam (2024) and the Maratha Military Landscapes (2025)."],
      fact: "India has 44 World Heritage Sites, the latest being the Maratha Military Landscapes of India, a group of 12 forts, added in 2025." },
    { id: "wellbeing", name: "Yoga, Ayurveda & Philosophy", title: "The science of living well",
      intro: "Indian thought explores the mind, body and cosmos together. Yoga, Ayurveda and meditation emerged from this inquiry and are practised worldwide today.",
      points: ["Yoga was inscribed on UNESCO's Intangible Heritage list in 2016.", "Ayurveda, 'the science of life', stresses balance, diet and daily routine.", "Six classical schools of philosophy — Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa and Vedanta — debated ideas about knowledge and reality.", "Vedic chanting, recognised by UNESCO in 2008, preserves texts orally with exact intonation."],
      fact: "The ideas of ahimsa (non-violence) and vasudhaiva kutumbakam (the world is one family) are rooted in Indian philosophy." },
    { id: "crafts", name: "Textiles & Crafts", title: "Hands that carry history",
      intro: "India's weaving, painting, metalwork and embroidery traditions are among the world's richest, usually practised by families who have refined their skill for generations.",
      points: ["Textiles: Sambalpuri ikat, Banarasi brocade, Kanjeevaram silk, Pashmina, Chikankari.", "Paintings: Pattachitra (Odisha), Madhubani (Bihar), Warli (Maharashtra), Pichwai (Rajasthan).", "Metalwork: dhokra casting; the Thatheras of Jandiala Guru, Punjab, are on UNESCO's list (2014).", "Natural dyes, hand-looms and local materials make many crafts low-carbon."],
      fact: "Buying directly from artisans or from certified cooperatives ensures a fair price and helps the craft survive." },
    { id: "cuisine", name: "Cuisine", title: "Food as culture",
      intro: "Indian regional cuisines reflect climate, trade and belief. Meals are often built on seasonality, balance of six tastes and the idea that food nourishes both body and mind.",
      points: ["Odisha: dalma, pakhala, chhena poda, rasabali and the temple Mahaprasad of Puri.", "Millets, once widely eaten, are returning as a healthy and climate-resilient grain.", "Spice blends such as panch phutana (Odisha/Bengal) and garam masala vary house to house.", "Community meals like langar and prasad turn eating into service."],
      fact: "The thali is more than a plate: the order of dishes reflects balance and digestion in traditional thought." },
    { id: "language", name: "Language & Literature", title: "Voices across millennia",
      intro: "India's multilingual literature spans oral epics, Sanskrit drama, devotional poetry, modern novels and film songs. Many languages carry unbroken literary traditions over more than a thousand years.",
      points: ["The Ramayana and Mahabharata exist in hundreds of retellings, including Sarala Das's Odia Mahabharata (15th century).", "Odia, Sanskrit, Tamil, Bengali and several other languages hold classical-language status.", "Rabindranath Tagore received the Nobel Prize in Literature in 1913.", "Oral traditions such as Ramlila (UNESCO 2008) keep stories alive through performance."],
      fact: "Palm-leaf manuscripts, inscribed with an iron stylus, preserved texts in Odisha for centuries." }
  ],
  worldHeritage: [
    ["Ajanta Caves", "1983", "Maharashtra"], ["Ellora Caves", "1983", "Maharashtra"], ["Agra Fort", "1983", "Uttar Pradesh"], ["Taj Mahal", "1983", "Uttar Pradesh"],
    ["Sun Temple, Konark", "1984", "Odisha"], ["Mahabalipuram Monuments", "1984", "Tamil Nadu"], ["Khajuraho Monuments", "1986", "Madhya Pradesh"], ["Hampi", "1986", "Karnataka"],
    ["Sanchi Stupas", "1989", "Madhya Pradesh"], ["Qutb Minar", "1993", "Delhi"], ["Rani-ki-Vav", "2014", "Gujarat"], ["Dholavira", "2021", "Gujarat"],
    ["Santiniketan", "2023", "West Bengal"], ["Moidams", "2024", "Assam"], ["Maratha Military Landscapes", "2025", "Maharashtra & Tamil Nadu"]
  ],
  ich: [
    ["Deepavali", "2025"], ["Garba of Gujarat", "2023"], ["Durga Puja in Kolkata", "2021"], ["Kumbh Mela", "2017"],
    ["Navroz", "2016"], ["Yoga", "2016"], ["Brass & copper craft of Thatheras, Jandiala Guru", "2014"], ["Sankirtana of Manipur", "2013"],
    ["Buddhist chanting of Ladakh", "2012"], ["Chhau dance", "2010"], ["Kalbelia folk songs & dances", "2010"], ["Mudiyettu of Kerala", "2010"],
    ["Ramman of Garhwal Himalayas", "2009"], ["Kutiyattam Sanskrit theatre", "2008"], ["Vedic chanting", "2008"], ["Ramlila", "2008"]
  ],
  calendar: [
    { d: "8 Nov", y: "2026", t: "Diwali", n: "Festival of lights; UNESCO-listed in 2025.", ev: "deepotsav-2026" },
    { d: "10 Nov", y: "2026", t: "Govardhan Puja", n: "Annakut — a mountain of food offerings.", ev: "annakut-bhog-mela" },
    { d: "11 Nov", y: "2026", t: "Bhai Dooj", n: "Celebrates the bond of brothers and sisters." },
    { d: "15 Nov", y: "2026", t: "Chhath Puja", n: "Offerings to the setting and rising sun." },
    { d: "24 Nov", y: "2026", t: "Kartik Purnima · Bali Jatra", n: "Boita Bandana, Dev Deepawali.", ev: "bali-jatra-boita-bandana" },
    { d: "1–5 Dec", y: "2026", t: "Konark Festival", n: "Five-day classical dance carnival at Konark.", ev: "konark-tribute-odissi" },
    { d: "14 Jan", y: "2027", t: "Lohri", n: "Punjab's winter bonfire festival." },
    { d: "15 Jan", y: "2027", t: "Makar Sankranti", n: "Also Pongal and Uttarayan.", ev: "makar-sankranti-mela" },
    { d: "26 Jan", y: "2027", t: "Republic Day", n: "Constitution came into force in 1950.", ev: "bharat-parv-republic-day" }
  ],
  etiquette: [
    ["Remove footwear", "Leave shoes outside temples, homes and many cultural venues."],
    ["Dress modestly", "Cover shoulders and knees at religious sites; carry a light scarf."],
    ["Greet with Namaste", "Palms together and a slight bow is a warm, universal greeting."],
    ["Ask before photographing", "Seek permission for portraits and inside sanctums; some places prohibit photos."],
    ["Respect the ritual", "Keep silent during aarti and prayer; don't step over offerings."],
    ["Do not touch carvings", "Oils from skin damage stone. Never climb or write on monuments."],
    ["Right hand for giving", "Offer and receive food or gifts with your right hand or both hands."],
    ["Go plastic-light", "Carry a bottle and cloth bag; it keeps heritage sites and ghats clean."]
  ],
  preserve: [
    "Learn one traditional art form, language or recipe from an elder.",
    "Buy handmade and GI-tagged goods directly from artisans.",
    "Record family stories and songs before they are forgotten.",
    "Visit monuments responsibly: no graffiti, no littering, follow the rules.",
    "Volunteer for ghat, temple-tank and heritage-site clean-ups.",
    "Attend local performances; audiences keep art forms alive."
  ]
};