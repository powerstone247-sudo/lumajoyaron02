export interface Episode {
  id: string;
  season: number;
  episode: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  year: number;
  price: string;
  duration: string;
  genre: string[];
  trailerUrl: string;
  videoUrl?: string;
  type: 'movie' | 'series' | 'short';
  episodes?: Episode[];
  seasons?: number;
}

// Trending Now - Mix of popular movies and series
export const trendingNow: Content[] = [
  {
    id: 'trending-1',
    title: 'Monicas Fate',
    description: 'A gripping tale of destiny and choices, Monica finds herself at a crossroads where every decision leads to a different path. As she navigates through life\'s unexpected turns, she must confront her past and embrace the future that awaits. A powerful story about fate, family, and the courage to change one\'s destiny.',
    thumbnail: 'https://i.ibb.co/YB0K2mbL/Whats-App-Image-2026-02-02-at-11-54-12.jpg',
    year: 2024,
    price: 'K15',
    duration: '2h 15min',
    genre: ['Drama', 'Thriller', 'Mystery'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: 'https://drive.google.com/file/d/1cFt5DWrcg4S94-Lhujoi2JBGFxsQ2J_7/preview',
    type: 'movie'
  },
  {
    id: 'trending-2',
    title: 'Lost But Abandoned',
    description: 'Stranded in the wilderness with no way home, a group of survivors must band together to overcome impossible odds. As resources dwindle and tensions rise, they discover that the greatest threat isn\'t the harsh environment but the secrets they keep from each other. A haunting tale of survival and human nature.',
    thumbnail: 'https://i.ibb.co/9mY453fz/Whats-App-Image-2026-02-02-at-11-54-14.jpg',
    year: 2024,
    price: 'K15',
    duration: '1h 58min',
    genre: ['Drama', 'Adventure', 'Survival'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: 'https://drive.google.com/file/d/15rXbzvO13BwHtC2NTEuvCKztPDHRSpQh/preview',
    type: 'movie'
  },
  {
    id: 'trending-3',
    title: 'Unexplored Survival',
    description: 'Journey into the world\'s most dangerous uncharted territories where only the bravest dare to venture. From dense jungles to frozen wastelands, witness incredible stories of human endurance against nature\'s fiercest challenges. Each episode brings new adventures and heart-stopping moments of survival.',
    thumbnail: 'https://i.ibb.co/gbJ6Xd2s/FB-IMG-1770125708757.jpg',
    year: 2024,
    price: 'K50',
    duration: '50min/ep',
    genre: ['Adventure', 'Documentary', 'Survival'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'series',
    seasons: 2,
    episodes: [
      { id: 's1e1', season: 1, episode: 1, title: 'Into the Unknown', duration: '52min', description: 'The team ventures into an uncharted Amazon rainforest region never before seen by humans.', thumbnail: 'https://i.ibb.co/gbJ6Xd2s/FB-IMG-1770125708757.jpg' },
      { id: 's1e2', season: 1, episode: 2, title: 'Against the Elements', duration: '48min', description: 'Survival skills are tested when a sudden storm traps the team in a remote canyon.', thumbnail: 'https://i.ibb.co/gbJ6Xd2s/FB-IMG-1770125708757.jpg' },
      { id: 's1e3', season: 1, episode: 3, title: 'Deep Jungle', duration: '50min', description: 'Navigating through dense jungle, the team discovers ancient ruins hidden for centuries.', thumbnail: 'https://i.ibb.co/gbJ6Xd2s/FB-IMG-1770125708757.jpg' },
      { id: 's1e4', season: 1, episode: 4, title: 'River of Danger', duration: '45min', description: 'A treacherous river crossing becomes a life-or-death situation for the explorers.', thumbnail: 'https://i.ibb.co/gbJ6Xd2s/FB-IMG-1770125708757.jpg' },
      { id: 's1e5', season: 1, episode: 5, title: 'The Final Push', duration: '55min', description: 'The season finale as the team reaches their destination against all odds.', thumbnail: 'https://i.ibb.co/gbJ6Xd2s/FB-IMG-1770125708757.jpg' },
      { id: 's2e1', season: 2, episode: 1, title: 'Frozen Frontier', duration: '58min', description: 'A new adventure begins in the unexplored frozen wilderness of Antarctica.', thumbnail: 'https://i.ibb.co/gbJ6Xd2s/FB-IMG-1770125708757.jpg' },
      { id: 's2e2', season: 2, episode: 2, title: 'Ice Cave Secrets', duration: '52min', description: 'The team discovers an ice cave system with ancient secrets frozen in time.', thumbnail: 'https://i.ibb.co/gbJ6Xd2s/FB-IMG-1770125708757.jpg' },
    ]
  },
  {
    id: 'trending-4',
    title: 'Eternal Hearts',
    description: 'Two souls from opposite worlds find each other in this sweeping romantic epic. When a successful architect returns to her hometown after a decade away, she reunites with the one who got away. As they reconnect, they must confront old wounds and new obstacles that threaten to keep them apart once more.',
    thumbnail: '/thumbnails/eternal-hearts.jpg',
    year: 2024,
    price: 'K50',
    duration: '1h 58min',
    genre: ['Romance', 'Drama'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'trending-5',
    title: 'Dragon\'s Legacy',
    description: 'An orphan discovers she is the last heir to an ancient dragon-riding dynasty. As dark forces rise, she must embrace her destiny and learn to bond with the last surviving dragon before it\'s too late. This epic fantasy adventure combines stunning visuals with a heartfelt story of courage, identity, and the bonds that unite us.',
    thumbnail: '/thumbnails/dragons-legacy.jpg',
    year: 2024,
    price: 'K50',
    duration: '2h 45min',
    genre: ['Fantasy', 'Adventure', 'Action'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'trending-6',
    title: 'The Last Colony',
    description: 'After Earth becomes uninhabitable, humanity\'s last survivors struggle to build a new home on a hostile alien world. When mysterious events threaten their fragile colony, a group of unlikely heroes must uncover the planet\'s secrets before history repeats itself. A gripping sci-fi drama about survival, sacrifice, and hope.',
    thumbnail: '/thumbnails/last-colony.jpg',
    year: 2023,
    price: 'K50',
    duration: '50min/ep',
    genre: ['Sci-Fi', 'Drama', 'Survival'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'series',
    seasons: 1,
    episodes: [
      { id: 'lc-s1e1', season: 1, episode: 1, title: 'Arrival', duration: '58min', description: 'The colonists land on their new home and face immediate challenges.', thumbnail: '/thumbnails/last-colony.jpg' },
      { id: 'lc-s1e2', season: 1, episode: 2, title: 'First Light', duration: '52min', description: 'The colony\'s first night brings unexpected discoveries.', thumbnail: '/thumbnails/last-colony.jpg' },
      { id: 'lc-s1e3', season: 1, episode: 3, title: 'The Signal', duration: '48min', description: 'A mysterious transmission raises questions about who was here before.', thumbnail: '/thumbnails/last-colony.jpg' },
      { id: 'lc-s1e4', season: 1, episode: 4, title: 'Division', duration: '50min', description: 'Tensions rise as the colony splits on how to proceed.', thumbnail: '/thumbnails/last-colony.jpg' },
    ]
  }
];

// Featured Films - Premium movie selection
export const featuredFilms: Content[] = [
  {
    id: 'featured-1',
    title: 'Monicas Fate',
    description: 'A gripping tale of destiny and choices, Monica finds herself at a crossroads where every decision leads to a different path. As she navigates through life\'s unexpected turns, she must confront her past and embrace the future that awaits. A powerful story about fate, family, and the courage to change one\'s destiny.',
    thumbnail: 'https://i.ibb.co/YB0K2mbL/Whats-App-Image-2026-02-02-at-11-54-12.jpg',
    year: 2024,
    price: 'K15',
    duration: '2h 15min',
    genre: ['Drama', 'Thriller', 'Mystery'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: 'https://drive.google.com/file/d/1cFt5DWrcg4S94-Lhujoi2JBGFxsQ2J_7/preview',
    type: 'movie'
  },
  {
    id: 'featured-2',
    title: 'Lost But Abandoned',
    description: 'Stranded in the wilderness with no way home, a group of survivors must band together to overcome impossible odds. As resources dwindle and tensions rise, they discover that the greatest threat isn\'t the harsh environment but the secrets they keep from each other. A haunting tale of survival and human nature.',
    thumbnail: 'https://i.ibb.co/9mY453fz/Whats-App-Image-2026-02-02-at-11-54-14.jpg',
    year: 2024,
    price: 'K15',
    duration: '1h 58min',
    genre: ['Drama', 'Adventure', 'Survival'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: 'https://drive.google.com/file/d/15rXbzvO13BwHtC2NTEuvCKztPDHRSpQh/preview',
    type: 'movie'
  },
  {
    id: 'featured-3',
    title: 'Unexplored Survival',
    description: 'Journey into the world\'s most dangerous uncharted territories where only the bravest dare to venture. From dense jungles to frozen wastelands, witness incredible stories of human endurance against nature\'s fiercest challenges. An epic documentary adventure that will leave you breathless.',
    thumbnail: 'https://i.ibb.co/gbJ6Xd2s/FB-IMG-1770125708757.jpg',
    year: 2024,
    price: 'K50',
    duration: '2h 5min',
    genre: ['Adventure', 'Documentary', 'Survival'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'featured-4',
    title: 'AI Is AI',
    description: 'A thought-provoking exploration of artificial intelligence and its impact on human society. When a brilliant scientist creates an AI that begins to question its own existence, the boundaries between human and machine blur. A compelling sci-fi drama that challenges our understanding of consciousness and what it truly means to be alive.',
    thumbnail: 'https://i.ibb.co/wrBQQKpJ/Whats-App-Image-2026-02-02-at-11-54-12-1.jpg',
    year: 2024,
    price: 'K50',
    duration: '1h 52min',
    genre: ['Sci-Fi', 'Drama', 'Thriller'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'featured-5',
    title: 'Enough Dad',
    description: 'A heartwarming family drama about a father\'s unconditional love and the lengths he will go to protect his children. When faced with impossible choices, one man must find the strength to be the father his family needs. An emotional journey of sacrifice, redemption, and the unbreakable bonds of family.',
    thumbnail: 'https://i.ibb.co/N2dFGPSw/Whats-App-Image-2026-02-02-at-11-54-13-1.jpg',
    year: 2024,
    price: 'K50',
    duration: '2h 10min',
    genre: ['Drama', 'Family'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'featured-6',
    title: 'Yakaba Pa Zed',
    description: 'A vibrant and energetic tale set in the heart of Zambia, following the dreams and struggles of a young musician trying to make it big. With rhythm in his heart and determination in his soul, he navigates the challenges of life, love, and the pursuit of his musical destiny. A celebration of African culture and the power of following your dreams.',
    thumbnail: 'https://i.ibb.co/SXnNCWX4/Whats-App-Image-2026-02-02-at-11-54-13-2.jpg',
    year: 2024,
    price: 'K50',
    duration: '1h 48min',
    genre: ['Drama', 'Music', 'Comedy'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'featured-7',
    title: 'Three Chickens',
    description: 'A delightful comedy about three unlikely feathered friends who embark on an adventure beyond the farm. When their peaceful life is disrupted, these three chickens must work together to save their home. Full of laughs, heart, and memorable moments that will entertain the whole family.',
    thumbnail: 'https://i.ibb.co/DDfk87TD/In-Shot-20250829-125300436.jpg',
    year: 2024,
    price: 'K50',
    duration: '1h 35min',
    genre: ['Comedy', 'Family', 'Animation'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'featured-8',
    title: 'Happy Chaos',
    description: 'When a reserved accountant accidentally gets invited to the wildest party of the year, her life takes an unexpectedly chaotic turn. Filled with hilarious mishaps and heartwarming moments, this comedy proves that sometimes the best things in life come from embracing the unexpected.',
    thumbnail: '/thumbnails/happy-chaos.jpg',
    year: 2024,
    price: 'K50',
    duration: '1h 45min',
    genre: ['Comedy', 'Romance'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'featured-9',
    title: 'Storm Riders',
    description: 'A team of elite storm chasers race against time to deploy revolutionary technology that could prevent catastrophic weather events. But nature has its own plans, and they find themselves in the fight of their lives against the most powerful storm system ever recorded. Intense action meets scientific adventure.',
    thumbnail: '/thumbnails/storm-riders.jpg',
    year: 2024,
    price: 'K50',
    duration: '2h 5min',
    genre: ['Action', 'Adventure', 'Drama'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'featured-10',
    title: 'Nature\'s Wonders',
    description: 'Journey across Earth\'s most breathtaking landscapes in this stunning documentary. From towering mountain peaks to the depths of the ocean, discover the incredible diversity of life and the urgent need to protect our planet\'s natural treasures. Narrated by world-renowned naturalists.',
    thumbnail: '/thumbnails/natures-wonders.jpg',
    year: 2024,
    price: 'K50',
    duration: '1h 55min',
    genre: ['Documentary', 'Nature'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  },
  {
    id: 'featured-11',
    title: 'Stellar Dreams',
    description: 'A young girl\'s dream of becoming an astronaut comes true when she\'s selected for a mission to save a distant planet. Alongside a ragtag crew of lovable misfits, she discovers that friendship, courage, and imagination are the greatest tools for saving the universe. An animated adventure for all ages.',
    thumbnail: '/thumbnails/stellar-dreams.jpg',
    year: 2024,
    price: 'K50',
    duration: '1h 42min',
    genre: ['Animation', 'Adventure', 'Family'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'movie'
  }
];

// TV Series - Complete TV show collection
export const tvSeries: Content[] = [
  {
    id: 'series-1',
    title: 'Cyber Dynasty',
    description: 'In a neon-drenched megacity where corporations rule and hackers are the new rebels, a young programmer discovers she has the power to reshape the digital world. But with great power comes dangerous attention from those who would use her abilities for their own nefarious purposes. Season 1 follows her journey from street-level coder to legendary cyber-warrior.',
    thumbnail: '/thumbnails/cyber-dynasty.jpg',
    year: 2024,
    price: 'K50',
    duration: '45min/ep',
    genre: ['Sci-Fi', 'Drama', 'Cyberpunk'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'series',
    seasons: 2,
    episodes: [
      { id: 'cd-s1e1', season: 1, episode: 1, title: 'Digital Awakening', duration: '52min', description: 'Maya discovers her unique abilities while navigating the dangerous streets of Neo Tokyo.', thumbnail: '/thumbnails/cyber-dynasty.jpg' },
      { id: 'cd-s1e2', season: 1, episode: 2, title: 'The Network', duration: '48min', description: 'Introduction to the underground hacker collective that will change Maya\'s life forever.', thumbnail: '/thumbnails/cyber-dynasty.jpg' },
      { id: 'cd-s1e3', season: 1, episode: 3, title: 'Corporate Wars', duration: '50min', description: 'Maya takes on her first mission against a powerful megacorporation.', thumbnail: '/thumbnails/cyber-dynasty.jpg' },
      { id: 'cd-s1e4', season: 1, episode: 4, title: 'Ghost in the Machine', duration: '45min', description: 'A mysterious AI reaches out to Maya with cryptic warnings about the future.', thumbnail: '/thumbnails/cyber-dynasty.jpg' },
      { id: 'cd-s1e5', season: 1, episode: 5, title: 'Breach', duration: '55min', description: 'The season\'s thrilling mid-point as Maya\'s world is turned upside down.', thumbnail: '/thumbnails/cyber-dynasty.jpg' },
      { id: 'cd-s2e1', season: 2, episode: 1, title: 'Rebirth', duration: '58min', description: 'Maya returns stronger than ever, but new enemies lurk in the shadows.', thumbnail: '/thumbnails/cyber-dynasty.jpg' },
      { id: 'cd-s2e2', season: 2, episode: 2, title: 'The Oracle', duration: '52min', description: 'A legendary figure from cyberspace emerges with prophecies of doom.', thumbnail: '/thumbnails/cyber-dynasty.jpg' },
    ]
  },
  {
    id: 'series-2',
    title: 'Royal Intrigue',
    description: 'Behind the gilded walls of the royal palace, secrets and schemes lurk around every corner. When a commoner rises to power within the court, she must navigate treacherous political waters while uncovering a conspiracy that threatens the kingdom itself. Lavish costumes, stunning locations, and Machiavellian twists await.',
    thumbnail: '/thumbnails/royal-intrigue.jpg',
    year: 2023,
    price: 'K50',
    duration: '55min/ep',
    genre: ['Drama', 'History', 'Romance'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'series',
    seasons: 2,
    episodes: [
      { id: 'ri-s1e1', season: 1, episode: 1, title: 'The Arrival', duration: '58min', description: 'Lady Catherine arrives at court and immediately becomes entangled in palace intrigue.', thumbnail: '/thumbnails/royal-intrigue.jpg' },
      { id: 'ri-s1e2', season: 1, episode: 2, title: 'Secrets and Lies', duration: '52min', description: 'Catherine learns that everyone at court hides dangerous secrets.', thumbnail: '/thumbnails/royal-intrigue.jpg' },
      { id: 'ri-s1e3', season: 1, episode: 3, title: 'The Masquerade', duration: '55min', description: 'A grand ball provides cover for political machinations.', thumbnail: '/thumbnails/royal-intrigue.jpg' },
      { id: 'ri-s1e4', season: 1, episode: 4, title: 'Blood Ties', duration: '50min', description: 'Family loyalties are tested as the conspiracy deepens.', thumbnail: '/thumbnails/royal-intrigue.jpg' },
    ]
  },
  {
    id: 'series-3',
    title: 'The Last Colony',
    description: 'After Earth becomes uninhabitable, humanity\'s last survivors struggle to build a new home on a hostile alien world. When mysterious events threaten their fragile colony, a group of unlikely heroes must uncover the planet\'s secrets before history repeats itself. A gripping sci-fi drama about survival, sacrifice, and hope.',
    thumbnail: '/thumbnails/last-colony.jpg',
    year: 2023,
    price: 'K50',
    duration: '50min/ep',
    genre: ['Sci-Fi', 'Drama', 'Survival'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'series',
    seasons: 1,
    episodes: [
      { id: 'lc-s1e1', season: 1, episode: 1, title: 'Arrival', duration: '58min', description: 'The colonists land on their new home and face immediate challenges.', thumbnail: '/thumbnails/last-colony.jpg' },
      { id: 'lc-s1e2', season: 1, episode: 2, title: 'First Light', duration: '52min', description: 'The colony\'s first night brings unexpected discoveries.', thumbnail: '/thumbnails/last-colony.jpg' },
      { id: 'lc-s1e3', season: 1, episode: 3, title: 'The Signal', duration: '48min', description: 'A mysterious transmission raises questions about who was here before.', thumbnail: '/thumbnails/last-colony.jpg' },
      { id: 'lc-s1e4', season: 1, episode: 4, title: 'Division', duration: '50min', description: 'Tensions rise as the colony splits on how to proceed.', thumbnail: '/thumbnails/last-colony.jpg' },
    ]
  },
  {
    id: 'series-4',
    title: 'Medical Emergency',
    description: 'The dedicated staff of Metropolitan General Hospital face life-and-death decisions every day. From the emergency room to the operating theater, follow the personal and professional lives of doctors, nurses, and surgeons as they navigate the challenges of modern medicine and their own complicated relationships.',
    thumbnail: '/thumbnails/medical-emergency.jpg',
    year: 2024,
    price: 'K50',
    duration: '42min/ep',
    genre: ['Drama', 'Medical'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'series',
    seasons: 3,
    episodes: [
      { id: 'me-s1e1', season: 1, episode: 1, title: 'First Day', duration: '45min', description: 'New residents arrive at Metropolitan General for their first day.', thumbnail: '/thumbnails/medical-emergency.jpg' },
      { id: 'me-s1e2', season: 1, episode: 2, title: 'Code Blue', duration: '42min', description: 'The ER faces a mass casualty event that tests everyone.', thumbnail: '/thumbnails/medical-emergency.jpg' },
      { id: 'me-s1e3', season: 1, episode: 3, title: 'Second Opinions', duration: '44min', description: 'A difficult diagnosis forces the team to question their approach.', thumbnail: '/thumbnails/medical-emergency.jpg' },
      { id: 'me-s1e4', season: 1, episode: 4, title: 'The Waiting Room', duration: '40min', description: 'Personal stories unfold as families wait for news.', thumbnail: '/thumbnails/medical-emergency.jpg' },
    ]
  },
  {
    id: 'series-5',
    title: 'Love in Paris',
    description: 'When an American journalist moves to Paris for her dream job, she never expected to fall for the city\'s most eligible bachelor. But their romance faces obstacles from his powerful family and her own ambitions. A charming romantic comedy series set against the backdrop of the world\'s most beautiful city.',
    thumbnail: '/thumbnails/love-paris.jpg',
    year: 2024,
    price: 'K50',
    duration: '38min/ep',
    genre: ['Romance', 'Comedy', 'Drama'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'series',
    seasons: 1,
    episodes: [
      { id: 'lp-s1e1', season: 1, episode: 1, title: 'Bonjour Paris', duration: '40min', description: 'Emma arrives in Paris and has an unexpected first encounter.', thumbnail: '/thumbnails/love-paris.jpg' },
      { id: 'lp-s1e2', season: 1, episode: 2, title: 'The Café', duration: '36min', description: 'A chance meeting at a sidewalk café changes everything.', thumbnail: '/thumbnails/love-paris.jpg' },
      { id: 'lp-s1e3', season: 1, episode: 3, title: 'Family Dinner', duration: '42min', description: 'Emma meets the family and realizes the complications ahead.', thumbnail: '/thumbnails/love-paris.jpg' },
      { id: 'lp-s1e4', season: 1, episode: 4, title: 'Midnight in Paris', duration: '38min', description: 'A romantic evening under the stars brings new feelings.', thumbnail: '/thumbnails/love-paris.jpg' },
    ]
  }
];

// Tube It Now - Short-form content
export const tubeItNow: Content[] = [
  {
    id: 'tube-1',
    title: 'Quick Tips',
    description: 'Master essential life skills in under 5 minutes! From productivity hacks to tech tutorials, get expert advice that makes a real difference. New episodes daily.',
    thumbnail: '/thumbnails/quick-tips.jpg',
    year: 2024,
    price: 'K50',
    duration: '3-5min',
    genre: ['Educational', 'Lifestyle'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'short'
  },
  {
    id: 'tube-2',
    title: 'Viral Vibes',
    description: 'The internet\'s funniest and most viral moments compiled into bite-sized entertainment. Updated weekly with the best trending content from around the world.',
    thumbnail: '/thumbnails/viral-vibes.jpg',
    year: 2024,
    price: 'K50',
    duration: '5-10min',
    genre: ['Comedy', 'Entertainment'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'short'
  },
  {
    id: 'tube-3',
    title: 'Laugh Factory',
    description: 'Stand-up comedy clips, funny skits, and hilarious moments that will brighten your day. Warning: May cause uncontrollable laughter!',
    thumbnail: '/thumbnails/laugh-factory.jpg',
    year: 2024,
    price: 'K50',
    duration: '2-8min',
    genre: ['Comedy'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'short'
  },
  {
    id: 'tube-4',
    title: 'Chef\'s Secrets',
    description: 'Professional chefs share their most guarded cooking tips and recipes in quick, easy-to-follow videos. Elevate your home cooking game today!',
    thumbnail: '/thumbnails/chefs-secrets.jpg',
    year: 2024,
    price: 'K50',
    duration: '5-15min',
    genre: ['Food', 'Educational'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'short'
  },
  {
    id: 'tube-5',
    title: 'Beat Drop',
    description: 'Behind the scenes with music producers, artists, and DJs. Learn how your favorite songs are made and discover new sounds.',
    thumbnail: '/thumbnails/beat-drop.jpg',
    year: 2024,
    price: 'K50',
    duration: '5-12min',
    genre: ['Music', 'Entertainment'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'short'
  },
  {
    id: 'tube-6',
    title: 'Power Workout',
    description: 'High-intensity workout routines you can do anywhere in 15 minutes or less. Professional trainers guide you through effective exercises for real results.',
    thumbnail: '/thumbnails/power-workout.jpg',
    year: 2024,
    price: 'K50',
    duration: '10-20min',
    genre: ['Fitness', 'Health'],
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    type: 'short'
  }
];

// Hero content
export const heroContent: Content = {
  id: 'hero-1',
  title: 'Quantum Horizon',
  description: 'In the year 2157, humanity faces its greatest challenge when quantum anomalies begin tearing through reality. A team of elite scientists must navigate parallel dimensions to save existence itself. This groundbreaking sci-fi epic pushes the boundaries of imagination and visual storytelling.',
  thumbnail: '/thumbnails/hero-banner.jpg',
  year: 2024,
  price: 'K50',
  duration: '2h 28min',
  genre: ['Sci-Fi', 'Action', 'Thriller'],
  trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  type: 'movie'
};

// All content combined for search
export const allContent: Content[] = [
  ...trendingNow,
  ...featuredFilms,
  ...tvSeries,
  ...tubeItNow
];

// Search function
export function searchContent(query: string): Content[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  return allContent.filter(content => 
    content.title.toLowerCase().includes(lowerQuery) ||
    content.description.toLowerCase().includes(lowerQuery) ||
    content.genre.some(g => g.toLowerCase().includes(lowerQuery))
  );
}
