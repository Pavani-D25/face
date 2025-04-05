import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import NeonText from "./NeonText";
import "./SongRecommendation.css"; // Ensure this import exists at the top of your component file

// Extensive mood-based song database
  // const moodSongs = {
  //   happy: [
  //     {
  //       id: "happy1",
  //       title: "Uptown Funk",
  //       artist: "Bruno Mars",
  //       videoId: "OPf0YbXqDm0",
  //       genre: "FUNK",
  //     },
  //     {
  //       id: "happy2",
  //       title: "Can't Stop the Feeling",
  //       artist: "Justin Timberlake",
  //       videoId: "ru0K8uYEZWw",
  //       genre: "POP",
  //     },
  //     {
  //       id: "happy3",
  //       title: "Happy",
  //       artist: "Pharrell Williams",
  //       videoId: "ZbZSe6N_BXs",
  //       genre: "POP",
  //     },
  //     {
  //       id: "happy4",
  //       title: "Dynamite",
  //       artist: "BTS",
  //       videoId: "gdZLi9oWNZg",
  //       genre: "K-POP",
  //     },
  //     {
  //       id: "happy5",
  //       title: "Levitating",
  //       artist: "Dua Lipa",
  //       videoId: "TUVcZfQe-Kw",
  //       genre: "POP",
  //     },
  //     {
  //       id: "happy6",
  //       title: "Don't Start Now",
  //       artist: "Dua Lipa",
  //       videoId: "oygrmJFKYZY",
  //       genre: "POP",
  //     },
  //   ],
  //   sad: [
  //     {
  //       id: "sad1",
  //       title: "Someone Like You",
  //       artist: "Adele",
  //       videoId: "hLQl3WQQoQ0",
  //       genre: "POP",
  //     },
  //     {
  //       id: "sad2",
  //       title: "Fix You",
  //       artist: "Coldplay",
  //       videoId: "k4V3Mo61fJM",
  //       genre: "ROCK",
  //     },
  //     {
  //       id: "sad3",
  //       title: "All I Want",
  //       artist: "Kodaline",
  //       videoId: "vJto6ahp+UY",
  //       genre: "INDIE",
  //     },
  //     {
  //       id: "sad4",
  //       title: "When I Was Your Man",
  //       artist: "Bruno Mars",
  //       videoId: "ekzHIouo8Q4",
  //       genre: "POP",
  //     },
  //     {
  //       id: "sad5",
  //       title: "Say Something",
  //       artist: "A Great Big World",
  //       videoId: "-2U0Ivkn2Ds",
  //       genre: "POP",
  //     },
  //   ],
  //   angry: [
  //     {
  //       id: "angry1",
  //       title: "Break Stuff",
  //       artist: "Limp Bizkit",
  //       videoId: "XM7sE3g7J4k",
  //       genre: "ROCK",
  //     },
  //     {
  //       id: "angry2",
  //       title: "Du Hast",
  //       artist: "Rammstein",
  //       videoId: "W3q8Od5qJio",
  //       genre: "METAL",
  //     },
  //     {
  //       id: "angry3",
  //       title: "Killing in the Name",
  //       artist: "Rage Against the Machine",
  //       videoId: "bWXazVhlyxQ",
  //       genre: "ROCK",
  //     },
  //     {
  //       id: "angry4",
  //       title: "Bodies",
  //       artist: "Drowning Pool",
  //       videoId: "04F4xlWSFh0",
  //       genre: "METAL",
  //     },
  //     {
  //       id: "angry5",
  //       title: "Last Resort",
  //       artist: "Papa Roach",
  //       videoId: "j0lSpNtjPM8",
  //       genre: "ROCK",
  //     },
  //   ],
  //   surprised: [
  //     {
  //       id: "surprised1",
  //       title: "Bad Guy",
  //       artist: "Billie Eilish",
  //       videoId: "DyDfgMOUjCI",
  //       genre: "POP",
  //     },
  //     {
  //       id: "surprised2",
  //       title: "Thunderstruck",
  //       artist: "AC/DC",
  //       videoId: "v2AC41dglnM",
  //       genre: "ROCK",
  //     },
  //     {
  //       id: "surprised3",
  //       title: "Gangnam Style",
  //       artist: "PSY",
  //       videoId: "9bZkp7q19f0",
  //       genre: "K-POP",
  //     },
  //     {
  //       id: "surprised4",
  //       title: "Take on Me",
  //       artist: "a-ha",
  //       videoId: "djV11Xbc914",
  //       genre: "POP",
  //     },
  //     {
  //       id: "surprised5",
  //       title: "Sweet Dreams",
  //       artist: "Eurythmics",
  //       videoId: "qeMFqkcPYcg",
  //       genre: "POP",
  //     },
  //   ],
  //   neutral: [
  //     {
  //       id: "neutral1",
  //       title: "Blinding Lights",
  //       artist: "The Weeknd",
  //       videoId: "4NRXx6U8ABQ",
  //       genre: "POP",
  //     },
  //     {
  //       id: "neutral2",
  //       title: "Shape of You",
  //       artist: "Ed Sheeran",
  //       videoId: "JGwWNGJdvx8",
  //       genre: "POP",
  //     },
  //     {
  //       id: "neutral3",
  //       title: "Levitating",
  //       artist: "Dua Lipa",
  //       videoId: "TUVcZfQe-Kw",
  //       genre: "POP",
  //     },
  //     {
  //       id: "neutral4",
  //       title: "Watermelon Sugar",
  //       artist: "Harry Styles",
  //       videoId: "E07s5ZYygMg",
  //       genre: "POP",
  //     },
  //     {
  //       id: "neutral5",
  //       title: "Stay",
  //       artist: "The Kid LAROI, Justin Bieber",
  //       videoId: "kTJczUoc26U",
  //       genre: "POP",
  //     },
  //   ],
  // };

  // const moodSongs = {
  //   happy: {
  //     english: [
  //       {
  //         id: "happy1_en",
  //         title: "Uptown Funk",
  //         artist: "Bruno Mars",
  //         videoId: "OPf0YbXqDm0",
  //         genre: "Funk"
  //       },
  //       {
  //         id: "happy2_en",
  //         title: "Can't Stop the Feeling",
  //         artist: "Justin Timberlake",
  //         videoId: "ru0K8uYEZWw",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "happy3_en",
  //         title: "Happy",
  //         artist: "Pharrell Williams",
  //         videoId: "ZbZSe6N_BXs",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "happy4_en",
  //         title: "Dynamite",
  //         artist: "BTS",
  //         videoId: "gdZLi9oWNZg",
  //         genre: "K-Pop"
  //       },
  //       {
  //         id: "happy5_en",
  //         title: "Levitating",
  //         artist: "Dua Lipa",
  //         videoId: "TUVcZfQe-Kw",
  //         genre: "Pop"
  //       }
  //     ],
  //     tamil: [
  //       {
  //         id: "happy1_ta",
  //         title: "Vaathi Coming",
  //         artist: "Anirudh Ravichander",
  //         videoId: "wKzYEQH6X_c",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "happy2_ta",
  //         title: "Enjoy Enjaami",
  //         artist: "Dhee, Arivu",
  //         videoId: "eT9i0N8lD6w",
  //         genre: "Folk Fusion"
  //       },
  //       {
  //         id: "happy3_ta",
  //         title: "Jalabulajangu",
  //         artist: "Anirudh Ravichander",
  //         videoId: "8PkRbA0QwQU",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "happy4_ta",
  //         title: "Rowdy Baby",
  //         artist: "Yuvan Shankar Raja",
  //         videoId: "1prRKMlGFoI",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "happy5_ta",
  //         title: "Why This Kolaveri Di",
  //         artist: "Dhanush",
  //         videoId: "YR12Z8f1Dh8",
  //         genre: "Pop"
  //       }
  //     ],
  //     hindi: [
  //       {
  //         id: "happy1_hi",
  //         title: "Badtameez Dil",
  //         artist: "Benny Dayal",
  //         videoId: "w5ZW5uZ2JjQ",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "happy2_hi",
  //         title: "Gallan Goodiyaan",
  //         artist: "Various Artists",
  //         videoId: "9UQpvoBA6gI",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "happy3_hi",
  //         title: "Balam Pichkari",
  //         artist: "Vishal Dadlani",
  //         videoId: "9D_P7BbqW5Y",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "happy4_hi",
  //         title: "Kar Gayi Chull",
  //         artist: "Badshah",
  //         videoId: "SbGwCb6D8Q0",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "happy5_hi",
  //         title: "Lungi Dance",
  //         artist: "Yo Yo Honey Singh",
  //         videoId: "dxytyRy-O1k",
  //         genre: "Film Music"
  //       }
  //     ]
  //   },
  //   sad: {
  //     english: [
  //       {
  //         id: "sad1_en",
  //         title: "Someone Like You",
  //         artist: "Adele",
  //         videoId: "hLQl3WQQoQ0",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "sad2_en",
  //         title: "Fix You",
  //         artist: "Coldplay",
  //         videoId: "k4V3Mo61fJM",
  //         genre: "Rock"
  //       },
  //       {
  //         id: "sad3_en",
  //         title: "All I Want",
  //         artist: "Kodaline",
  //         videoId: "vJto6ahp+UY",
  //         genre: "Indie"
  //       },
  //       {
  //         id: "sad4_en",
  //         title: "When I Was Your Man",
  //         artist: "Bruno Mars",
  //         videoId: "ekzHIouo8Q4",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "sad5_en",
  //         title: "Say Something",
  //         artist: "A Great Big World",
  //         videoId: "-2U0Ivkn2Ds",
  //         genre: "Pop"
  //       }
  //     ],
  //     tamil: [
  //       {
  //         id: "sad1_ta",
  //         title: "Vizhiyil Vizhundhu",
  //         artist: "Hariharan",
  //         videoId: "Y3ZR8Qn6JY8",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "sad2_ta",
  //         title: "Munbe Vaa",
  //         artist: "Shreya Ghoshal",
  //         videoId: "4q5bVCf6hW4",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "sad3_ta",
  //         title: "Avalukenna",
  //         artist: "Sid Sriram",
  //         videoId: "y0X8Vz5B3kE",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "sad4_ta",
  //         title: "En Kadhal Solla",
  //         artist: "Yuvan Shankar Raja",
  //         videoId: "ZvGxZQp0Q2w",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "sad5_ta",
  //         title: "Kannukkul Pothivaippen",
  //         artist: "Hariharan",
  //         videoId: "9QZQbZQZQZQ",
  //         genre: "Film Music"
  //       }
  //     ],
  //     hindi: [
  //       {
  //         id: "sad1_hi",
  //         title: "Tum Hi Ho",
  //         artist: "Arijit Singh",
  //         videoId: "7Htz9Y4H-8w",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "sad2_hi",
  //         title: "Channa Mereya",
  //         artist: "Arijit Singh",
  //         videoId: "G1d4Qb0l6i4",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "sad3_hi",
  //         title: "Teri Mitti",
  //         artist: "B Praak",
  //         videoId: "wF_B_aagLfI",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "sad4_hi",
  //         title: "Agar Tum Saath Ho",
  //         artist: "Alka Yagnik",
  //         videoId: "6FURuLYrR_Q",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "sad5_hi",
  //         title: "Kal Ho Naa Ho",
  //         artist: "Sonu Nigam",
  //         videoId: "Y9nR1hY9lLM",
  //         genre: "Film Music"
  //       }
  //     ]
  //   },
  //   angry: {
  //     english: [
  //       {
  //         id: "angry1_en",
  //         title: "Break Stuff",
  //         artist: "Limp Bizkit",
  //         videoId: "XM7sE3g7J4k",
  //         genre: "Rock"
  //       },
  //       {
  //         id: "angry2_en",
  //         title: "Du Hast",
  //         artist: "Rammstein",
  //         videoId: "W3q8Od5qJio",
  //         genre: "Metal"
  //       },
  //       {
  //         id: "angry3_en",
  //         title: "Killing in the Name",
  //         artist: "Rage Against the Machine",
  //         videoId: "bWXazVhlyxQ",
  //         genre: "Rock"
  //       },
  //       {
  //         id: "angry4_en",
  //         title: "Bodies",
  //         artist: "Drowning Pool",
  //         videoId: "04F4xlWSFh0",
  //         genre: "Metal"
  //       },
  //       {
  //         id: "angry5_en",
  //         title: "Last Resort",
  //         artist: "Papa Roach",
  //         videoId: "j0lSpNtjPM8",
  //         genre: "Rock"
  //       }
  //     ],
  //     tamil: [
  //       {
  //         id: "angry1_ta",
  //         title: "Thee Thalapathy",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "angry2_ta",
  //         title: "Petta Paraak",
  //         artist: "Anirudh Ravichander",
  //         videoId: "1y6smk6qpo0",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "angry3_ta",
  //         title: "Beast Mode",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "angry4_ta",
  //         title: "Vikram Title Track",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "angry5_ta",
  //         title: "Kutti Story",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       }
  //     ],
  //     hindi: [
  //       {
  //         id: "angry1_hi",
  //         title: "Dangal",
  //         artist: "Daler Mehndi",
  //         videoId: "xQOO2xGQ1Pc",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "angry2_hi",
  //         title: "Kar Har Maidan Fateh",
  //         artist: "Sukhwinder Singh",
  //         videoId: "sY9H5ZtJMBE",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "angry3_hi",
  //         title: "Brothers Anthem",
  //         artist: "Vishal Dadlani",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "angry4_hi",
  //         title: "Singham Theme",
  //         artist: "Ajay-Atul",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "angry5_hi",
  //         title: "Malhari",
  //         artist: "Vishal Dadlani",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       }
  //     ]
  //   },
  //   surprised: {
  //     english: [
  //       {
  //         id: "surprised1_en",
  //         title: "Bad Guy",
  //         artist: "Billie Eilish",
  //         videoId: "DyDfgMOUjCI",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "surprised2_en",
  //         title: "Thunderstruck",
  //         artist: "AC/DC",
  //         videoId: "v2AC41dglnM",
  //         genre: "Rock"
  //       },
  //       {
  //         id: "surprised3_en",
  //         title: "Gangnam Style",
  //         artist: "PSY",
  //         videoId: "9bZkp7q19f0",
  //         genre: "K-Pop"
  //       },
  //       {
  //         id: "surprised4_en",
  //         title: "Take on Me",
  //         artist: "a-ha",
  //         videoId: "djV11Xbc914",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "surprised5_en",
  //         title: "Sweet Dreams",
  //         artist: "Eurythmics",
  //         videoId: "qeMFqkcPYcg",
  //         genre: "Pop"
  //       }
  //     ],
  //     tamil: [
  //       {
  //         id: "surprised1_ta",
  //         title: "Why This Kolaveri Di",
  //         artist: "Dhanush",
  //         videoId: "YR12Z8f1Dh8",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "surprised2_ta",
  //         title: "Kutty Story",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "surprised3_ta",
  //         title: "Vaathi Kabaddi",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "surprised4_ta",
  //         title: "Kutti Puli",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "surprised5_ta",
  //         title: "Master the Blaster",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       }
  //     ],
  //     hindi: [
  //       {
  //         id: "surprised1_hi",
  //         title: "Bom Diggy Diggy",
  //         artist: "Zack Knight",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "surprised2_hi",
  //         title: "Tunak Tunak Tun",
  //         artist: "Daler Mehndi",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "surprised3_hi",
  //         title: "Mundian To Bach Ke",
  //         artist: "Panjabi MC",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "surprised4_hi",
  //         title: "Jai Ho",
  //         artist: "A.R. Rahman",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "surprised5_hi",
  //         title: "Chaiyya Chaiyya",
  //         artist: "Sukhwinder Singh",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       }
  //     ]
  //   },
  //   neutral: {
  //     english: [
  //       {
  //         id: "neutral1_en",
  //         title: "Blinding Lights",
  //         artist: "The Weeknd",
  //         videoId: "4NRXx6U8ABQ",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "neutral2_en",
  //         title: "Shape of You",
  //         artist: "Ed Sheeran",
  //         videoId: "JGwWNGJdvx8",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "neutral3_en",
  //         title: "Levitating",
  //         artist: "Dua Lipa",
  //         videoId: "TUVcZfQe-Kw",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "neutral4_en",
  //         title: "Watermelon Sugar",
  //         artist: "Harry Styles",
  //         videoId: "E07s5ZYygMg",
  //         genre: "Pop"
  //       },
  //       {
  //         id: "neutral5_en",
  //         title: "Stay",
  //         artist: "The Kid LAROI, Justin Bieber",
  //         videoId: "kTJczUoc26U",
  //         genre: "Pop"
  //       }
  //     ],
  //     tamil: [
  //       {
  //         id: "neutral1_ta",
  //         title: "Kannazhaga",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "neutral2_ta",
  //         title: "Mental Manadhil",
  //         artist: "A.R. Rahman",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "neutral3_ta",
  //         title: "Maruvaarthai",
  //         artist: "Sid Sriram",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "neutral4_ta",
  //         title: "Kadhal Psycho",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "neutral5_ta",
  //         title: "Kadhal Cricket",
  //         artist: "Anirudh Ravichander",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       }
  //     ],
  //     hindi: [
  //       {
  //         id: "neutral1_hi",
  //         title: "Pasoori Nu",
  //         artist: "Arijit Singh",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "neutral2_hi",
  //         title: "Kesariya",
  //         artist: "Arijit Singh",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "neutral3_hi",
  //         title: "Raatan Lambiyan",
  //         artist: "Jubin Nautiyal",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "neutral4_hi",
  //         title: "Tum Hi Aana",
  //         artist: "Jubin Nautiyal",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       },
  //       {
  //         id: "neutral5_hi",
  //         title: "Tere Vaaste",
  //         artist: "Vishal Mishra",
  //         videoId: "5QfG7Xl8X4k",
  //         genre: "Film Music"
  //       }
  //     ]
  //   }
  // };

  const moodSongs = {
    happy: {
      english: [
        {
          id: "happy1_en",
          title: "Uptown Funk",
          artist: "Bruno Mars",
          videoId: "OPf0YbXqDm0",
          genre: "Funk"
        },
        {
          id: "happy2_en",
          title: "Can't Stop the Feeling",
          artist: "Justin Timberlake",
          videoId: "ru0K8uYEZWw",
          genre: "Pop"
        },
        {
          id: "happy3_en",
          title: "Happy",
          artist: "Pharrell Williams",
          videoId: "ZbZSe6N_BXs",
          genre: "Pop"
        },
        {
          id: "happy4_en",
          title: "Dynamite",
          artist: "BTS",
          videoId: "gdZLi9oWNZg",
          genre: "K-Pop"
        },
        {
          id: "happy5_en",
          title: "Levitating",
          artist: "Dua Lipa",
          videoId: "1j_XvebOg4c",
          genre: "Pop"
        }
      ],
      tamil: [
        {
          id: "happy1_ta",
          title: "Vaathi Coming",
          artist: "Anirudh Ravichander",
          videoId: "fRD_3vJagxk",
          genre: "Film Music"
        },
        {
          id: "happy2_ta",
          title: "Chillanjirukkiye",
          artist: "Sam",
          videoId: "dvWdFMCC1-I",
          genre: "Folk Fusion"
        },
        {
          id: "happy3_ta",
          title: "Jalabulajangu",
          artist: "Anirudh Ravichander",
          videoId: "2VOL-VWXMnQ",
          genre: "Film Music"
        },
        {
          id: "happy4_ta",
          title: "Rowdy Baby",
          artist: "Yuvan Shankar Raja",
          videoId: "x6Q7c9RyMzk",
          genre: "Film Music"
        },
        {
          id: "happy5_ta",
          title: "Ullaallaa",
          artist: "Anirudh Ravichander",
          videoId: "oLgzs8nut3A",
          genre: "Pop"
        }
      ],
      hindi: [
        {
          id: "happy1_hi",
          title: "Kashmir Main Tu Kanyakumari",
          artist: "Benny Dayal",
          videoId: "WxtJqyIyThU",
          genre: "Film Music"
        },
        {
          id: "happy2_hi",
          title: "Saree Ke Fall Sa",
          artist: "Various Artists",
          videoId: "A04WawrDblo",
          genre: "Film Music"
        },
        {
          id: "happy3_hi",
          title: "Chikni Chameli",
          artist: "Vishal Dadlani",
          videoId: "QcQpqWhTBCE",
          genre: "Film Music"
        },
        {
          id: "happy4_hi",
          title: "Chammak Challo",
          artist: "Badshah",
          videoId: "oAVhUAaVCVQ",
          genre: "Film Music"
        },
        {
          id: "happy5_hi",
          title: "Lungi Dance",
          artist: "Yo Yo Honey Singh",
          videoId: "69CEiHfS_mc",
          genre: "Film Music"
        }
      ]
    },
    sad: {
      english: [
        {
          id: "sad1_en",
          title: "Someone Like You",
          artist: "Adele",
          videoId: "hLQl3WQQoQ0",
          genre: "Pop"
        },
        {
          id: "sad2_en",
          title: "Fix You",
          artist: "Coldplay",
          videoId: "k4V3Mo61fJM",
          genre: "Rock"
        },
        {
          id: "sad3_en",
          title: "All I Want",
          artist: "Kodaline",
          videoId: "vJto6ahp+UY",
          genre: "Indie"
        },
        {
          id: "sad4_en",
          title: "When I Was Your Man",
          artist: "Bruno Mars",
          videoId: "ekzHIouo8Q4",
          genre: "Pop"
        },
        {
          id: "sad5_en",
          title: "Say Something",
          artist: "A Great Big World",
          videoId: "-2U0Ivkn2Ds",
          genre: "Pop"
        }
      ],
      tamil: [
        {
          id: "sad1_ta",
          title: "Thaensudare",
          artist: "Hariharan",
          videoId: "ubk_MzyPVrY",
          genre: "Film Music"
        },
        {
          id: "sad2_ta",
          title: "Munbe Vaa",
          artist: "Shreya Ghoshal",
          videoId: "UPQZ4vuvW2s",
          genre: "Film Music"
        },
        {
          id: "sad3_ta",
          title: "Avalukenna",
          artist: "Sid Sriram",
          videoId: "DKXO08CeFjQ",
          genre: "Film Music"
        },
        {
          id: "sad4_ta",
          title: "En Kadhal Solla",
          artist: "Yuvan Shankar Raja",
          videoId: "thtAxtEuX6c",
          genre: "Film Music"
        },
        {
          id: "sad5_ta",
          title: "Megamo Aval ",
          artist: "Hariharan",
          videoId: "mVubYBRajfw",
          genre: "Film Music"
        }
      ],
      hindi: [
        {
          id: "sad1_hi",
          title: "Tum Hi Ho",
          artist: "Arijit Singh",
          videoId: "IJq0yyWug1k",
          genre: "Film Music"
        },
        {
          id: "sad2_hi",
          title: "Channa Mereya",
          artist: "Arijit Singh",
          videoId: "284Ov7ysmfA",
          genre: "Film Music"
        },
        {
          id: "sad3_hi",
          title: "KHAIRIYAT",
          artist: "B Praak",
          videoId: "hoNb6HuNmU0",
          genre: "Film Music"
        },
        {
          id: "sad4_hi",
          title: "Agar Tum Saath Ho",
          artist: "Alka Yagnik",
          videoId: "pon8irRa8II",
          genre: "Film Music"
        },
        {
          id: "sad5_hi",
          title: "Kabira",
          artist: "Sonu Nigam",
          videoId: "jHNNMj5bNQw",
          genre: "Film Music"
        }
      ]
    },
    angry: {
      english: [
        {
          id: "angry1_en",
          title: "Break Stuff",
          artist: "Limp Bizkit",
          videoId: "XM7sE3g7J4k",
          genre: "Rock"
        },
        {
          id: "angry2_en",
          title: "Du Hast",
          artist: "Rammstein",
          videoId: "W3q8Od5qJio",
          genre: "Metal"
        },
        {
          id: "angry3_en",
          title: "Killing in the Name",
          artist: "Rage Against the Machine",
          videoId: "bWXazVhlyxQ",
          genre: "Rock"
        },
        {
          id: "angry4_en",
          title: "Bodies",
          artist: "Drowning Pool",
          videoId: "04F4xlWSFh0",
          genre: "Metal"
        },
        {
          id: "angry5_en",
          title: "Last Resort",
          artist: "Papa Roach",
          videoId: "j0lSpNtjPM8",
          genre: "Rock"
        }
      ],
      tamil: [
        {
          id: "angry1_ta",
          title: "Thee Thalapathy",
          artist: "Anirudh Ravichander",
          videoId: "eqBrHvdGbOY",
          genre: "Film Music"
        },
        {
          id: "angry2_ta",
          title: "Petta Paraak",
          artist: "Anirudh Ravichander",
          videoId: "GlJBrOzIzAM",
          genre: "Film Music"
        },
        {
          id: "angry3_ta",
          title: "Beast Mode",
          artist: "Anirudh Ravichander",
          videoId: "Fyj5wbzRPC8",
          genre: "Film Music"
        },
        {
          id: "angry4_ta",
          title: "Vikram Title Track",
          artist: "Anirudh Ravichander",
          videoId: "OsLCY3vz3t8",
          genre: "Film Music"
        },
        {
          id: "angry5_ta",
          title: "Dheera Dheera",
          artist: "Anirudh Ravichander",
          videoId: "gWcILbCt1zA",
          genre: "Film Music"
        }
      ],
      hindi: [
        {
          id: "angry1_hi",
          title: "Dangal",
          artist: "Daler Mehndi",
          videoId: "jMfvlh0tjyo",
          genre: "Film Music"
        },
        {
          id: "angry2_hi",
          title: "Kar Har Maidan Fateh",
          artist: "Sukhwinder Singh",
          videoId: "9iIX4PBplAY",
          genre: "Film Music"
        },
        {
          id: "angry3_hi",
          title: "Brothers Anthem",
          artist: "Vishal Dadlani",
          videoId: "lcs_GXu8IA0",
          genre: "Film Music"
        },
        {
          id: "angry4_hi",
          title: "Singham Theme",
          artist: "Ajay-Atul",
          videoId: "BM0PnqV5-iM",
          genre: "Film Music"
        },
        {
          id: "angry5_hi",
          title: "Malhari",
          artist: "Vishal Dadlani",
          videoId: "l_MyUGq7pgs",
          genre: "Film Music"
        }
      ]
    },
    surprised: {
      english: [
        {
          id: "surprised1_en",
          title: "Bad Guy",
          artist: "Billie Eilish",
          videoId: "DyDfgMOUjCI",
          genre: "Pop"
        },
        {
          id: "surprised2_en",
          title: "Thunderstruck",
          artist: "AC/DC",
          videoId: "v2AC41dglnM",
          genre: "Rock"
        },
        {
          id: "surprised3_en",
          title: "Gangnam Style",
          artist: "PSY",
          videoId: "9bZkp7q19f0",
          genre: "K-Pop"
        },
        {
          id: "surprised4_en",
          title: "Take on Me",
          artist: "a-ha",
          videoId: "djV11Xbc914",
          genre: "Pop"
        },
        {
          id: "surprised5_en",
          title: "Sweet Dreams",
          artist: "Eurythmics",
          videoId: "qeMFqkcPYcg",
          genre: "Pop"
        }
      ],
      tamil: [
        {
          id: "surprised1_ta",
          title: "Why This Kolaveri Di",
          artist: "Dhanush",
          videoId: "Ja168gMpb3o",
          genre: "Pop"
        },
        {
          id: "surprised2_ta",
          title: "Kutty Story",
          artist: "Anirudh Ravichander",
          videoId: "nCNqPgXDYhY",
          genre: "Film Music"
        },
        {
          id: "surprised3_ta",
          title: "Vaathi Kabaddi",
          artist: "Anirudh Ravichander",
          videoId: "5QfG7Xl8X4k",
          genre: "Film Music"
        },
        {
          id: "surprised4_ta",
          title: "Boomi Enna Suthudhe",
          artist: "Anirudh Ravichander",
          videoId: "nLaeDsf0UVI",
          genre: "Film Music"
        },
        {
          id: "surprised5_ta",
          title: "Aathangara Orathil ",
          artist: "Anirudh Ravichander",
          videoId: "cUSV8MCOLY",
          genre: "Film Music"
        }
      ],
      hindi: [
        {
          id: "surprised1_hi",
          title: "Bom Diggy Diggy",
          artist: "Zack Knight",
          videoId: "yIIGQB6EMAM",
          genre: "Pop"
        },
        {
          id: "surprised2_hi",
          title: "Main Tera Boyfriend",
          artist: "Daler Mehndi",
          videoId: "1ac9FLyQo88",
          genre: "Pop"
        },
        {
          id: "surprised3_hi",
          title: "Param Sundari",
          artist: "Panjabi MC",
          videoId: "7Hhg6bXOZnQ",
          genre: "Pop"
        },
        {
          id: "surprised4_hi",
          title: "Jai Ho",
          artist: "A.R. Rahman",
          videoId: "C5bGmwuVx2I",
          genre: "Film Music"
        },
        {
          id: "surprised5_hi",
          title: "Chaiyya Chaiyya",
          artist: "Sukhwinder Singh",
          videoId: "aoS4Alr4DLk",
          genre: "Film Music"
        }
      ]
    },
    neutral: {
      english: [
        {
          id: "neutral1_en",
          title: "Blinding Lights",
          artist: "The Weeknd",
          videoId: "4NRXx6U8ABQ",
          genre: "Pop"
        },
        {
          id: "neutral2_en",
          title: "Shape of You",
          artist: "Ed Sheeran",
          videoId: "JGwWNGJdvx8",
          genre: "Pop"
        },
        {
          id: "neutral3_en",
          title: "Levitating",
          artist: "Dua Lipa",
          videoId: "TUVcZfQe-Kw",
          genre: "Pop"
        },
        {
          id: "neutral4_en",
          title: "Watermelon Sugar",
          artist: "Harry Styles",
          videoId: "E07s5ZYygMg",
          genre: "Pop"
        },
        {
          id: "neutral5_en",
          title: "Stay",
          artist: "The Kid LAROI, Justin Bieber",
          videoId: "kTJczUoc26U",
          genre: "Pop"
        }
      ],
      tamil: [
        {
          id: "neutral1_ta",
          title: "Kannazhaga",
          artist: "Anirudh Ravichander",
          videoId: "0tX2ck4Rmzk",
          genre: "Film Music"
        },
        {
          id: "neutral2_ta",
          title: "Mental Manadhil",
          artist: "A.R. Rahman",
          videoId: "ryD8BqVexJI",
          genre: "Film Music"
        },
        {
          id: "neutral3_ta",
          title: "Maruvaarthai",
          artist: "Sid Sriram",
          videoId: "U3lyojCm6jA",
          genre: "Film Music"
        },
        {
          id: "neutral4_ta",
          title: "Kadhal Psycho",
          artist: "Anirudh Ravichander",
          videoId: "I94Bs9BSg90",
          genre: "Film Music"
        },
        {
          id: "neutral5_ta",
          title: "Kadhal Cricket",
          artist: "Anirudh Ravichander",
          videoId: "tFX2UvkQj44",
          genre: "Film Music"
        }
      ],
      hindi: [
        {
          id: "neutral1_hi",
          title: "Pasoori Nu",
          artist: "Arijit Singh",
          videoId: "Yiw354fkSOs",
          genre: "Film Music"
        },
        {
          id: "neutral2_hi",
          title: "Kesariya",
          artist: "Arijit Singh",
          videoId: "BddP6PYo2gs",
          genre: "Film Music"
        },
        {
          id: "neutral3_hi",
          title: "Raatan Lambiyan",
          artist: "Jubin Nautiyal",
          videoId: "gvyUuxdRdR4",
          genre: "Film Music"
        },
        {
          id: "neutral4_hi",
          title: "KAUN TUJHE",
          artist: "Jubin Nautiyal",
          videoId: "Ov0YGGSY6gY",
          genre: "Film Music"
        },
        {
          id: "neutral5_hi",
          title: "Chaleya",
          artist: "Vishal Mishra",
          videoId: "VAdGW7QDJiU",
          genre: "Film Music"
        }
      ]
    }
  };


  
const SongRecommendation = ({ age, gender, emotion }) => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoized recommendation function
  // const getRandomRecommendations = useCallback(() => {
  //   setLoading(true);

  //   const emotionTracks = moodSongs[emotion.toLowerCase()] || moodSongs.neutral;
  //   let filteredTracks = [...emotionTracks];

  //   // Age-based filtering
  //   if (age < 18) {
  //     filteredTracks = filteredTracks.filter(
  //       (song) => !["METAL", "ROCK"].includes(song.genre)
  //     );
  //   } else if (age > 40) {
  //     filteredTracks = filteredTracks.filter(
  //       (song) => !["K-POP", "METAL"].includes(song.genre)
  //     );
  //   }

  //   // Gender-based filtering
  //   if (gender.toLowerCase().includes("female")) {
  //     filteredTracks = filteredTracks.filter(
  //       (song) => !song.title.includes("Break Stuff")
  //     );
  //   }

  //   // Shuffle and pick 3 random songs
  //   const shuffled = [...filteredTracks].sort(() => 0.5 - Math.random());
  //   setRecommendations(shuffled.slice(0, 3));
  //   setLoading(false);
  // }, [age, gender, emotion]);



  const getRandomRecommendations = useCallback(() => {
    setLoading(true);
  
    const emotionTracks = moodSongs[emotion.toLowerCase()] || moodSongs.neutral;
    
    // Combine all language tracks into one array
    let allTracks = [];
    for (const language in emotionTracks) {
      allTracks = [...allTracks, ...emotionTracks[language]];
    }
  
    let filteredTracks = [...allTracks];
  
    // Age-based filtering
    if (age < 18) {
      filteredTracks = filteredTracks.filter(
        (song) => !["METAL", "ROCK"].includes(song.genre.toUpperCase())
      );
    } else if (age > 40) {
      filteredTracks = filteredTracks.filter(
        (song) => !["K-POP", "METAL"].includes(song.genre.toUpperCase())
      );
    }
  
    // Gender-based filtering
    if (gender.toLowerCase().includes("female")) {
      filteredTracks = filteredTracks.filter(
        (song) => !song.title.toLowerCase().includes("break stuff")
      );
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
    setNowPlaying((prev) => (prev === videoId ? null : videoId));
  };

  return (
    <div className="song-recommendation-container ">
      <div className="recommendation-header">
        <NeonText text={`${emotion.toUpperCase()} MOOD MIX`} size="lg" />
        <button
          className="shuffle-button"
          onClick={getRandomRecommendations}
          disabled={loading}
        >
          {loading ? "♻️ LOADING..." : "♻️ SHUFFLE"}
        </button>
      </div>

      <p className="user-profile">
        For {age} year old {gender.toLowerCase()} • {recommendations.length}{" "}
        tracks
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
              key={song.id} // Using stable ID instead of Date.now()
              className={`song-card ${
                nowPlaying === song.videoId ? "playing" : ""
              }`}
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
                  {nowPlaying === song.videoId ? "■ STOP" : "▶ PLAY"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Audio Player */}
      {/* <div className={`audio-player ${nowPlaying ? 'visible' : ''}`}>
        {nowPlaying && (
          <iframe
            title="YouTube Audio Player"
            width="290"
            height="200"
            src={`https://www.youtube.com/embed/${nowPlaying}?autoplay=1&controls=1&modestbranding=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope"
          />
        )}
      </div> */}

      {/* Audio Player */}
      <div className={`audio-player ${nowPlaying ? "visible" : ""}`}>
        {nowPlaying && (
          <>
            <button
              className="close-player"
              onClick={() => setNowPlaying(null)}
              aria-label="Close player"
            >
              ✕
            </button>
            <div className="player-container">
              <iframe
                title="YouTube Audio Player"
                width="290"
                height="200"
                src={`https://www.youtube.com/embed/${nowPlaying}?autoplay=1&controls=1&modestbranding=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SongRecommendation;



