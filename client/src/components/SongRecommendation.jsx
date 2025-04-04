// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import NeonText from './NeonText'; // Your existing component

// const SongRecommendation = ({ age, gender, emotion }) => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedSong, setSelectedSong] = useState(null);

//   // Mock recommendation engine based on facial analysis
//   useEffect(() => {
//     const getRecommendations = () => {
//       setIsLoading(true);
      
//       // Simulate API call
//       setTimeout(() => {
//         const moodMap = {
//           happy: ['Pop', 'Dance', 'Disco'],
//           sad: ['Blues', 'Slow Rock', 'Ambient'],
//           angry: ['Rock', 'Metal', 'Punk'],
//           surprised: ['Electronic', 'Experimental', 'World'],
//           fearful: ['Classical', 'Soundtrack', 'Jazz'],
//           disgusted: ['Alternative', 'Indie', 'Folk'],
//           neutral: ['Chill', 'Lo-fi', 'Acoustic']
//         };

//         const ageGroup = age < 25 ? 'GenZ' : age < 40 ? 'Millennial' : 'Classic';
//         const genderPrefix = gender.toLowerCase().includes('female') ? 'Female' : 'Male';
        
//         const mood = emotion.toLowerCase();
//         const genres = moodMap[mood] || ['Pop', 'Rock', 'Electronic'];
        
//         // Generate mock recommendations
//         const mockRecommendations = Array.from({ length: 5 }, (_, i) => ({
//           id: `song-${i}`,
//           title: `${genderPrefix} ${ageGroup} ${genres[i % genres.length]} ${i+1}`,
//           artist: `AI-Generated Artist ${Math.floor(Math.random() * 1000)}`,
//           album: `${mood.toUpperCase()} M00D`,
//           genre: genres[i % genres.length],
//           bpm: Math.floor(Math.random() * 60) + 80,
//           mood,
//           coverArt: `https://source.unsplash.com/random/300x300/?${genres[i % genres.length]},music&sig=${Math.random()}`
//         }));

//         setRecommendations(mockRecommendations);
//         setIsLoading(false);
//       }, 1500);
//     };

//     getRecommendations();
//   }, [age, gender, emotion]);

//   return (
//     <div className="song-recommendation-container">
//       <NeonText text="AI MUSIC RECOMMENDATIONS" size="lg" />
//       <div className="user-profile-summary">
//         <div className="profile-badge">
//           <span className="emoji">{getEmoji(emotion)}</span>
//           <span className="age">{age}</span>
//           <span className="gender">{gender}</span>
//         </div>
//         <div className="mood-indicator">
//           <span className="mood-label">CURRENT MOOD:</span>
//           <span className="mood-value">{emotion.toUpperCase()}</span>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="loading-songs">
//           <div className="pulse-animation"></div>
//           <NeonText text="ANALYZING MUSIC DATABASE..." size="md" />
//         </div>
//       ) : (
//         <>
//           <div className="song-grid">
//             <AnimatePresence>
//               {recommendations.map((song) => (
//                 <motion.div
//                   key={song.id}
//                   className={`song-card ${selectedSong?.id === song.id ? 'active' : ''}`}
//                   whileHover={{ y: -5 }}
//                   whileTap={{ scale: 0.98 }}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   onClick={() => setSelectedSong(song)}
//                 >
//                   <div className="album-art" style={{ backgroundImage: `url(${song.coverArt})` }}>
//                     <div className="genre-tag">{song.genre}</div>
//                   </div>
//                   <div className="song-info">
//                     <h4 className="song-title">{song.title}</h4>
//                     <p className="song-artist">{song.artist}</p>
//                     <div className="song-stats">
//                       <span className="bpm">{song.bpm} BPM</span>
//                       <span className="mood">{song.mood}</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           <AnimatePresence>
//             {selectedSong && (
//               <motion.div 
//                 className="song-detail-view"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <button 
//                   className="close-detail"
//                   onClick={() => setSelectedSong(null)}
//                 >
//                   &times;
//                 </button>
//                 <div className="detail-content">
//                   <div 
//                     className="detail-album-art"
//                     style={{ backgroundImage: `url(${selectedSong.coverArt})` }}
//                   ></div>
//                   <div className="detail-text">
//                     <h3>{selectedSong.title}</h3>
//                     <p className="artist">{selectedSong.artist}</p>
//                     <p className="album">{selectedSong.album}</p>
//                     <div className="audio-visualizer">
//                       {Array.from({ length: 20 }).map((_, i) => (
//                         <div 
//                           key={i}
//                           className="bar"
//                           style={{
//                             height: `${Math.random() * 60 + 20}%`,
//                             animationDelay: `${i * 0.05}s`
//                           }}
//                         ></div>
//                       ))}
//                     </div>
//                     <button className="play-button">
//                       ▶ PLAY RECOMMENDATION
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </>
//       )}
//     </div>
//   );
// };

// // Helper function to get emoji based on emotion
// const getEmoji = (emotion) => {
//   const emojis = {
//     happy: '😊',
//     sad: '😢',
//     angry: '😠',
//     surprised: '😲',
//     fearful: '😨',
//     disgusted: '🤢',
//     neutral: '😐'
//   };
//   return emojis[emotion.toLowerCase()] || '🎵';
// };

// export default SongRecommendation;



































import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import NeonText from './NeonText';

// Extensive mood-based song database
const moodSongs = {
  happy: [
    { id: 'happy1', title: "Uptown Funk", artist: "Bruno Mars", videoId: "OPf0YbXqDm0", genre: "FUNK" },
    { id: 'happy2', title: "Can't Stop the Feeling", artist: "Justin Timberlake", videoId: "ru0K8uYEZWw", genre: "POP" },
    { id: 'happy3', title: "Happy", artist: "Pharrell Williams", videoId: "ZbZSe6N_BXs", genre: "POP" },
    { id: 'happy4', title: "Dynamite", artist: "BTS", videoId: "gdZLi9oWNZg", genre: "K-POP" },
    { id: 'happy5', title: "Levitating", artist: "Dua Lipa", videoId: "TUVcZfQe-Kw", genre: "POP" },
    { id: 'happy6', title: "Don't Start Now", artist: "Dua Lipa", videoId: "oygrmJFKYZY", genre: "POP" }
  ],
  sad: [
    { id: 'sad1', title: "Someone Like You", artist: "Adele", videoId: "hLQl3WQQoQ0", genre: "POP" },
    { id: 'sad2', title: "Fix You", artist: "Coldplay", videoId: "k4V3Mo61fJM", genre: "ROCK" },
    { id: 'sad3', title: "All I Want", artist: "Kodaline", videoId: "vJto6ahp+UY", genre: "INDIE" },
    { id: 'sad4', title: "When I Was Your Man", artist: "Bruno Mars", videoId: "ekzHIouo8Q4", genre: "POP" },
    { id: 'sad5', title: "Say Something", artist: "A Great Big World", videoId: "-2U0Ivkn2Ds", genre: "POP" }
  ],
  angry: [
    { id: 'angry1', title: "Break Stuff", artist: "Limp Bizkit", videoId: "XM7sE3g7J4k", genre: "ROCK" },
    { id: 'angry2', title: "Du Hast", artist: "Rammstein", videoId: "W3q8Od5qJio", genre: "METAL" },
    { id: 'angry3', title: "Killing in the Name", artist: "Rage Against the Machine", videoId: "bWXazVhlyxQ", genre: "ROCK" },
    { id: 'angry4', title: "Bodies", artist: "Drowning Pool", videoId: "04F4xlWSFh0", genre: "METAL" },
    { id: 'angry5', title: "Last Resort", artist: "Papa Roach", videoId: "j0lSpNtjPM8", genre: "ROCK" }
  ],
  surprised: [
    { id: 'surprised1', title: "Bad Guy", artist: "Billie Eilish", videoId: "DyDfgMOUjCI", genre: "POP" },
    { id: 'surprised2', title: "Thunderstruck", artist: "AC/DC", videoId: "v2AC41dglnM", genre: "ROCK" },
    { id: 'surprised3', title: "Gangnam Style", artist: "PSY", videoId: "9bZkp7q19f0", genre: "K-POP" },
    { id: 'surprised4', title: "Take on Me", artist: "a-ha", videoId: "djV11Xbc914", genre: "POP" },
    { id: 'surprised5', title: "Sweet Dreams", artist: "Eurythmics", videoId: "qeMFqkcPYcg", genre: "POP" }
  ],
  neutral: [
    { id: 'neutral1', title: "Blinding Lights", artist: "The Weeknd", videoId: "4NRXx6U8ABQ", genre: "POP" },
    { id: 'neutral2', title: "Shape of You", artist: "Ed Sheeran", videoId: "JGwWNGJdvx8", genre: "POP" },
    { id: 'neutral3', title: "Levitating", artist: "Dua Lipa", videoId: "TUVcZfQe-Kw", genre: "POP" },
    { id: 'neutral4', title: "Watermelon Sugar", artist: "Harry Styles", videoId: "E07s5ZYygMg", genre: "POP" },
    { id: 'neutral5', title: "Stay", artist: "The Kid LAROI, Justin Bieber", videoId: "kTJczUoc26U", genre: "POP" }
  ]
};

const SongRecommendation = ({ age, gender, emotion }) => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoized recommendation function
  const getRandomRecommendations = useCallback(() => {
    setLoading(true);
    
    const emotionTracks = moodSongs[emotion.toLowerCase()] || moodSongs.neutral;
    let filteredTracks = [...emotionTracks];
    
    // Age-based filtering
    if (age < 18) {
      filteredTracks = filteredTracks.filter(song => !['METAL', 'ROCK'].includes(song.genre));
    } else if (age > 40) {
      filteredTracks = filteredTracks.filter(song => !['K-POP', 'METAL'].includes(song.genre));
    }
    
    // Gender-based filtering
    if (gender.toLowerCase().includes('female')) {
      filteredTracks = filteredTracks.filter(song => !song.title.includes("Break Stuff"));
    }
    
    // Shuffle and pick 3 random songs
    const shuffled = [...filteredTracks].sort(() => 0.5 - Math.random());
    setRecommendations(shuffled.slice(0, 3));
    setLoading(false);
  }, [age, gender, emotion]);

  // Initial load and when dependencies change
  useEffect(() => {
    getRandomRecommendations();
  }, [getRandomRecommendations]);

  const playSong = (videoId) => {
    setNowPlaying(prev => prev === videoId ? null : videoId);
  };

  return (
    <div className="song-recommendation-container">
      <div className="recommendation-header">
        <NeonText text={`${emotion.toUpperCase()} MOOD MIX`} size="lg" />
        <button 
          className="shuffle-button"
          onClick={getRandomRecommendations}
          disabled={loading}
        >
          {loading ? '♻️ LOADING...' : '♻️ SHUFFLE'}
        </button>
      </div>
      
      <p className="user-profile">
        For {age} year old {gender.toLowerCase()} • {recommendations.length} tracks
      </p>
      
      {loading ? (
        <div className="loading-state">
          <div className="pulse-loader"></div>
          <NeonText text="GENERATING YOUR MIX..." size="md" />
        </div>
      ) : (
        <div className="song-grid">
          {recommendations.map((song) => (
            <motion.div 
              key={song.id}  // Using stable ID instead of Date.now()
              className={`song-card ${nowPlaying === song.videoId ? 'playing' : ''}`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="song-info">
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
                <div className="song-meta">
                  <span>{song.genre}</span>
                </div>
                <button 
                  className="play-button"
                  onClick={() => playSong(song.videoId)}
                >
                  {nowPlaying === song.videoId ? '■ STOP' : '▶ PLAY'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Audio Player */}
      <div className={`audio-player ${nowPlaying ? 'visible' : ''}`}>
        {nowPlaying && (
          <iframe
            title="YouTube Audio Player"
            width="300"
            height="60"
            src={`https://www.youtube.com/embed/${nowPlaying}?autoplay=1&controls=1&modestbranding=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope"
          />
        )}
      </div>
    </div>
  );
};

export default SongRecommendation;