export const SRUTI_22_MAP = {
  S:   { ratio: 1/1,     cents: 0.00,    name: "Ksama", detune: 0.00, svara: "Sa" },
  r1:  { ratio: 256/243, cents: 90.22,   name: "Tivra", detune: -9.78, svara: "komal Re" },
  r2:  { ratio: 16/15,   cents: 111.73,  name: "Kumudvati", detune: 11.73, svara: "komal Re andolan" },
  R1:  { ratio: 10/9,    cents: 182.40,  name: "Manda", detune: -17.60, svara: "suddha Re" },
  R2:  { ratio: 9/8,     cents: 203.91,  name: "Chandovati", detune: 3.91, svara: "suddha Re" },
  g1:  { ratio: 32/27,   cents: 294.13,  name: "Dayavati", detune: -5.87, svara: "komal Ga" },
  g2:  { ratio: 6/5,     cents: 315.64,  name: "Ranjani", detune: 15.64, svara: "komal Ga" },
  G1:  { ratio: 5/4,     cents: 386.31,  name: "Raktika", detune: -13.69, svara: "suddha Ga" },
  G2:  { ratio: 81/64,   cents: 407.82,  name: "Raudri", detune: 7.82, svara: "suddha Ga" },
  M1:  { ratio: 4/3,     cents: 498.04,  name: "Krodha", detune: -1.96, svara: "suddha Ma" },
  M2:  { ratio: 27/20,   cents: 519.55,  name: "Vajrika", detune: 19.55, svara: "tivra madhyama" },
  m1:  { ratio: 45/32,   cents: 590.22,  name: "Prasarini", detune: -9.78, svara: "tivra Ma" },
  m2:  { ratio: 729/512, cents: 611.73,  name: "Priti", detune: 11.73, svara: "prati madhyam" },
  P:   { ratio: 3/2,     cents: 701.96,  name: "Marjani", detune: 1.96, svara: "Pancam" },
  d1:  { ratio: 128/81,  cents: 792.18,  name: "Ksiti", detune: -7.82, svara: "komal Dha" },
  d2:  { ratio: 8/5,     cents: 813.69,  name: "Rakta", detune: 13.69, svara: "komal Dha" },
  D1:  { ratio: 5/3,     cents: 884.36,  name: "Sandipini", detune: -15.64, svara: "suddha Dha" },
  D2:  { ratio: 27/16,   cents: 905.87,  name: "Alapini", detune: 5.87, svara: "suddha Dha" },
  n1:  { ratio: 16/9,    cents: 996.09,  name: "Madanti", detune: -3.91, svara: "komal Ni" },
  n2:  { ratio: 9/5,     cents: 1017.60, name: "Rohini", detune: 17.60, svara: "komal Ni" },
  N1:  { ratio: 15/8,    cents: 1088.27, name: "Ramya", detune: -11.73, svara: "suddha Ni" },
  N2:  { ratio: 243/128, cents: 1109.78, name: "Ugra", detune: 9.78, svara: "suddha Ni" },
  "S'": { ratio: 2/1,    cents: 1200.00, name: "Tara Sa", detune: 0.00, svara: "Tara Sadja" }
};

export const WORLD_GRIDS = {
  burma7: {
    id: "burma7", label: "Burmese Athan (Than-yoe)",
    axiom: "7-tone heptatonic grid with microtonal inflections.",
    pitches: [
      { key: "1", name: "Than-hman", cents: 0, sol: "Tonic 1/1", ratio: 1/1 },
      { key: "2", name: "Hna-pauk", cents: 165, sol: "Neutral 2nd", ratio: Math.pow(2, 165/1200) },
      { key: "3", name: "Thone-pauk", cents: 360, sol: "Neutral 3rd", ratio: Math.pow(2, 360/1200) },
      { key: "4", name: "Lay-pauk", cents: 510, sol: "Subdominant", ratio: Math.pow(2, 510/1200) },
      { key: "5", name: "Nga-pau", cents: 690, sol: "Dominant Pillar", ratio: Math.pow(2, 690/1200) },
      { key: "6", name: "Chauk-pauk", cents: 850, sol: "Major 6th", ratio: Math.pow(2, 850/1200) },
      { key: "7", name: "Khun-pau", cents: 1030, sol: "Neutral 7th", ratio: Math.pow(2, 1030/1200) },
      { key: "1'", name: "Than-hman'", cents: 1200, sol: "Octave", ratio: 2/1 }
    ]
  },
  shashmaqam17: {
    id: "shashmaqam17", label: "Central Asian Shashmaqam (17-Parda)",
    axiom: "17-tone Dutar lute fretboard. Zalzal neutral 3rd ~350c.",
    pitches: [
      { key: "1", name: "Asos / Rast", cents: 0, sol: "Qaror", ratio: 1/1 },
      { key: "z2", name: "Mujannab", cents: 145, sol: "Neutral 2nd", ratio: Math.pow(2, 145/1200) },
      { key: "M2", name: "Dugah", cents: 204, sol: "Whole tone", ratio: 9/8 },
      { key: "m3", name: "Segah", cents: 294, sol: "Minor 3rd", ratio: 32/27 },
      { key: "z3", name: "Wusta Zalzal", cents: 350, sol: "Neutral 3rd", ratio: Math.pow(2, 350/1200) },
      { key: "M3", name: "Chorgah", cents: 408, sol: "Major 3rd", ratio: 81/64 },
      { key: "4", name: "Nava", cents: 498, sol: "Fourth", ratio: 4/3 },
      { key: "d5", name: "Gharib", cents: 588, sol: "Tritone", ratio: Math.pow(2, 588/1200) },
      { key: "5", name: "Panjgah", cents: 702, sol: "Ghazal Pillar", ratio: 3/2 },
      { key: "m6", name: "Saba", cents: 792, sol: "Minor 6th", ratio: 128/81 },
      { key: "z6", name: "Hisor", cents: 852, sol: "Neutral 6th", ratio: Math.pow(2, 852/1200) },
      { key: "M6", name: "Uzzal", cents: 906, sol: "Major 6th", ratio: 27/16 },
      { key: "m7", name: "Buzruk", cents: 996, sol: "Minor 7th", ratio: 16/9 },
      { key: "z7", name: "Awj", cents: 1050, sol: "Neutral 7th", ratio: Math.pow(2, 1050/1200) },
      { key: "M7", name: "Mukhayyar", cents: 1110, sol: "Leading tone", ratio: 243/128 },
      { key: "1'", name: "Gerdaniya", cents: 1200, sol: "Octave", ratio: 2/1 }
    ]
  }
};

export const TALA_LIBRARY = {
  Tintal: { beats: 16, theka: "Dha Dhin Dhin Dha | Dha Dhin Dhin Dha | Dha Tin Tin Ta | Ta Dhin Dhin Dha" },
  Keherwa: { beats: 8, theka: "Dha Ge Na Tin | Na Ke Dhin Na" },
  Dadra: { beats: 6, theka: "Dha Dhin Na | Dha Tin Na" },
  Jhaptal: { beats: 10, theka: "Dhin Na | Dhin Dhin Na | Tin Na | Dhin Dhin Na" },
  Rupak: { beats: 7, theka: "Tin Tin Na | Dhin Na | Dhin Na" },
  Ektal: { beats: 12, theka: "Dhin Dhin | Dha Dha | Tin Tin | Ta Ta | Dhin Dhin | Dha Dha" },
  SiWa: { beats: 8, theka: "Wa (Clapper down) | Si (Bell strike)" },
  UsulSaraxbor: { beats: 8, theka: "Gup Bak Gup Gup Bak (Doira frame drum)" }
};

export const RAGA_LIBRARY = {
  Bhoopali: { thaat: "Kalyan", vadi: "G", samvadi: "D", rasa: "Shanti, Bhakti", desc: "Bright pentatonic evening" },
  Yaman: { thaat: "Kalyan", vadi: "G", samvadi: "N", rasa: "Bhakti, Shringara", desc: "Expansive noble evening" },
  Bhairav: { thaat: "Bhairav", vadi: "d", samvadi: "r", rasa: "Shaant, Gambhira", desc: "Solemn dawn meditation" },
  Bhairavi: { thaat: "Bhairavi", vadi: "M", samvadi: "S", rasa: "Karuna, Vairagya", desc: "Tender emotional resolution" },
  BurmeseAthan: { thaat: "Than-yoe", vadi: "Than-hman", samvadi: "Nga-pau", rasa: "Royal, Meditative", desc: "Maha Gita court repertoire" },
  ShashmaqamRast: { thaat: "Rast Parda", vadi: "Asos", samvadi: "Panjgah", rasa: "Mystic, Devotional", desc: "Central Asian classical suite" }
};
