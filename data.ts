import { Project, VideoItem } from './types';

import imgHost2012 from './assets/AUG 2012 I was the host of English Drama Contest in Nankuang High School.jpg';
import imgVocal2015 from './assets/AUG 2015, in the Orientation Camp of Tainan Alumni Association of National Taiwan University, I was one of the main Vocal in welcome night show.jpg.jpg';
import imgDrama2014 from "./assets/DEC 2014 National Taiwan University Department of Foreign Language's night, I acted as a pot vender in a script drama.jpg";
import imgBand2014 from "./assets/DEC 2014 National Taiwan University Department of Foreign Language's night, I was the vocal in my band.jpg";
import imgWinterCamp2015 from "./assets/FEB 2015, I acted in an interactive drama in a Winter Camp for students in Dingzhou elementary school, I play the role'A-Hua', who is the attendant of the Princess.jpg";
import imgGeoDrama2016 from "./assets/MAY 2016, I playrd the role'Chi-Huo', who is a boss that fell out of love, in Department of Geography's night of National Taiwan University.jpg";
import imgKaraoke2016 from './assets/NOV 2016, I was the organizer of the Karaoke Competition of the department of Geography in National Taiwan University.JPG';
import videoBowl2025 from './assets/MAY 2025,.我在尼泊爾學習頌缽，打開身體感官，感受能量經由頌缽的震動流經身體。旁邊那位是我的頌缽老師，他是一位薩滿，同時也有在寺院長期修行的經歷，有多元的宗教背景.mp4';

export const projects: Project[] = [
  {
    id: '1',
    title: 'English Drama Contest Host',
    category: 'Hosting',
    year: 'Aug 2012',
    description: 'Hosted the English Drama Contest at Nankuang High School.',
    imageUrl: imgHost2012,
    details: 'I served as the host for the English Drama Contest held at Nankuang High School, guiding the audience through the performances.',
    tags: ['Hosting', 'High School', 'English Drama']
  },
  {
    id: '2',
    title: 'NTU Tainan Alumni Orientation Camp',
    category: 'Performance / Vocal',
    year: 'Aug 2015',
    description: 'Main vocalist in the welcome night show.',
    imageUrl: imgVocal2015,
    details: 'Performed as one of the main vocalists during the welcome night show for the Orientation Camp of the Tainan Alumni Association of National Taiwan University.',
    tags: ['Vocal', 'Orientation Camp', 'Performance']
  },
  {
    id: '3',
    title: 'NTU Foreign Language Dept Night',
    category: 'Drama Performance',
    year: 'Dec 2014',
    description: 'Acted as a pot vendor in a script drama.',
    imageUrl: imgDrama2014,
    details: "Took on the role of a pot vendor in a scripted drama performance during the Department of Foreign Language's night at National Taiwan University.",
    tags: ['Drama', 'Acting', 'University']
  },
  {
    id: '4',
    title: 'NTU Foreign Language Dept Night Band',
    category: 'Music Performance',
    year: 'Dec 2014',
    description: 'Vocalist in a band performance.',
    imageUrl: imgBand2014,
    details: "Performed as the vocalist for my band during the Department of Foreign Language's night at National Taiwan University.",
    tags: ['Band', 'Vocal', 'Music']
  },
  {
    id: '5',
    title: 'Dingzhou Elementary Winter Camp Drama',
    category: 'Interactive Drama',
    year: 'Feb 2015',
    description: "Acted as 'A-Hua' in an interactive drama for students.",
    imageUrl: imgWinterCamp2015,
    details: "Played the role of 'A-Hua', the princess's attendant, in an interactive drama designed for students at Dingzhou Elementary School's Winter Camp.",
    tags: ['Interactive Drama', 'Children', 'Education']
  },
  {
    id: '6',
    title: 'NTU Geography Dept Night Drama',
    category: 'Drama Performance',
    year: 'May 2016',
    description: "Played 'Chi-Huo', a heartbroken boss.",
    imageUrl: imgGeoDrama2016,
    details: "Portrayed the character 'Chi-Huo', a boss dealing with heartbreak, in a drama performance for the Department of Geography's night at National Taiwan University.",
    tags: ['Drama', 'Acting', 'University']
  },
  {
    id: '7',
    title: 'NTU Geography Dept Karaoke Competition',
    category: 'Event Organizing',
    year: 'Nov 2016',
    description: 'Organizer of the Karaoke Competition.',
    imageUrl: imgKaraoke2016,
    details: 'Served as the organizer for the Karaoke Competition held by the Department of Geography at National Taiwan University.',
    tags: ['Organizing', 'Event', 'Karaoke']
  }
];

export const videos: VideoItem[] = [
  {
    id: 'v1',
    source: 'youtube',
    url: 'https://www.youtube.com/embed/jthtJwyW0lY',
    title: 'Cinemnemay Indigenous Community',
    date: 'JUN 2017',
    description: 'Film essay for the \'Culture, Society, and Nature\' course. Visited Cinemnemay to document how urbanisation affects indigenous children\'s connection to their language and culture.'
  },
  {
    id: 'v2',
    source: 'youtube',
    url: 'https://www.youtube.com/embed/tnB_tb7UXI8',
    title: 'Wulai Hot Spring Documentary',
    date: 'JUN 2018',
    description: 'Documentary \'Where did the hot spring come from?\' for the \'Regional Geography\' course. Investigated the impact of the hot spring supply chain development on the Atayal community in Wulai.'
  },
  {
    id: 'v3',
    source: 'youtube',
    url: 'https://www.youtube.com/embed/UPCgd6CAsmA',
    title: 'Geographic Thoughts - Trailer',
    date: 'JUN 2018',
    description: 'Trailer for a film created for the \'Geographic Thoughts\' course. Explored the concept of \'Representation\' through a story of online identity and deception.'
  },
  {
    id: 'v4',
    source: 'youtube',
    url: 'https://www.youtube.com/embed/9LGHYpNDJbk',
    title: 'Geographic Thoughts - Reveal',
    date: 'JUN 2018',
    description: 'The reveal film for the trailer. I played \'Ming-Rou\', a high school girl bullied by the male lead. She created an alternate identity online to make him fall in love with her, culminating in his murder.'
  },
  {
    id: 'v5',
    source: 'instagram',
    url: 'https://www.instagram.com/reel/CzgLOa1PaG9/',
    title: 'Hualien Market Handicrafts',
    date: 'NOV 2023',
    description: 'Video record of my handmade weaving works displayed at a market in Hualien City.'
  },
  {
    id: 'v6',
    source: 'instagram',
    url: 'https://www.instagram.com/reel/Cz9EaQgPMMV/',
    title: 'Christmas Tree Weaving',
    date: 'NOV 2023',
    description: 'Showcase of my handmade Christmas tree weaving work.'
  },
  {
    id: 'v7',
    source: 'local',
    url: videoBowl2025,
    title: 'Singing Bowl Learning in Nepal',
    date: 'MAY 2025',
    description: 'Learned singing bowl therapy in Nepal. Opening body senses to feel energy flow through vibration. Featured with my teacher, a Shaman with a diverse religious background.'
  }
];