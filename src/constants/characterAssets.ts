// Character asset options for various features

// Face shapes
export const faceShapes = [
  {
    id: 'face_round',
    name: 'Okrągła',
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FFDBAC" stroke="#000" stroke-width="1" />
    </svg>`
  },
  {
    id: 'face_oval',
    name: 'Owalna',
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="40" ry="48" fill="#FFDBAC" stroke="#000" stroke-width="1" />
    </svg>`
  },
  {
    id: 'face_square',
    name: 'Kwadratowa',
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="80" rx="10" fill="#FFDBAC" stroke="#000" stroke-width="1" />
    </svg>`
  },
  {
    id: 'face_heart',
    name: 'Sercowa',
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,90 C100,65 90,10 50,20 C10,10 0,65 50,90 Z" fill="#FFDBAC" stroke="#000" stroke-width="1" />
    </svg>`
  }
];

// Eyes
export const eyesOptions = [
  {
    id: 'eyes_round',
    name: 'Okrągłe',
    svg: `<svg width="100" height="30" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="15" r="10" fill="white" stroke="#000" stroke-width="1" />
      <circle cx="25" cy="15" r="5" fill="#543104" />
      <circle cx="75" cy="15" r="10" fill="white" stroke="#000" stroke-width="1" />
      <circle cx="75" cy="15" r="5" fill="#543104" />
    </svg>`
  },
  {
    id: 'eyes_almond',
    name: 'Migdałowe',
    svg: `<svg width="100" height="30" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="15" rx="12" ry="8" fill="white" stroke="#000" stroke-width="1" />
      <circle cx="25" cy="15" r="5" fill="#543104" />
      <ellipse cx="75" cy="15" rx="12" ry="8" fill="white" stroke="#000" stroke-width="1" />
      <circle cx="75" cy="15" r="5" fill="#543104" />
    </svg>`
  },
  {
    id: 'eyes_smiling',
    name: 'Uśmiechnięte',
    svg: `<svg width="100" height="30" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,15 Q25,5 35,15" fill="none" stroke="#000" stroke-width="2" />
      <path d="M65,15 Q75,5 85,15" fill="none" stroke="#000" stroke-width="2" />
    </svg>`
  }
];

// Noses
export const noseOptions = [
  {
    id: 'nose_small',
    name: 'Mały',
    svg: `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,10 Q20,20 15,25 Q10,20 15,10" fill="#FFDBAC" stroke="#000" stroke-width="0.5" />
    </svg>`
  },
  {
    id: 'nose_round',
    name: 'Okrągły',
    svg: `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="20" r="5" fill="#FFDBAC" stroke="#000" stroke-width="0.5" />
    </svg>`
  },
  {
    id: 'nose_pointed',
    name: 'Spiczasty',
    svg: `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,10 L20,25 L10,25 Z" fill="#FFDBAC" stroke="#000" stroke-width="0.5" />
    </svg>`
  }
];

// Mouths
export const mouthOptions = [
  {
    id: 'mouth_smile',
    name: 'Uśmiech',
    svg: `<svg width="50" height="30" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,10 Q25,30 40,10" fill="none" stroke="#000" stroke-width="2" />
    </svg>`
  },
  {
    id: 'mouth_laugh',
    name: 'Śmiech',
    svg: `<svg width="50" height="30" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,15 Q25,35 40,15" fill="#FF9999" stroke="#000" stroke-width="1" />
      <path d="M15,15 L35,15" fill="none" stroke="#000" stroke-width="1" />
    </svg>`
  },
  {
    id: 'mouth_neutral',
    name: 'Neutralny',
    svg: `<svg width="50" height="30" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,15 L35,15" fill="none" stroke="#000" stroke-width="2" />
    </svg>`
  }
];

// Hair styles
export const hairOptions = [
  {
    id: 'hair_short',
    name: 'Krótkie',
    forSex: 'male',
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,40 Q50,0 80,40 L80,50 L20,50 Z" fill="#8B4513" stroke="#000" stroke-width="1" />
    </svg>`
  },
  {
    id: 'hair_curly',
    name: 'Kręcone',
    forSex: 'both',
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,60 Q0,20 30,10 Q50,-10 70,10 Q100,20 85,60 Q85,40 75,50 Q75,30 65,40 Q65,20 50,30 Q35,20 35,40 Q25,30 25,50 Q15,40 15,60 Z" fill="#8B4513" stroke="#000" stroke-width="1" />
    </svg>`
  },
  {
    id: 'hair_long',
    name: 'Długie',
    forSex: 'female',
    svg: `<svg width="100" height="120" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,40 Q50,0 80,40 L85,100 L15,100 Z" fill="#8B4513" stroke="#000" stroke-width="1" />
    </svg>`
  },
  {
    id: 'hair_ponytail',
    name: 'Kucyk',
    forSex: 'female',
    svg: `<svg width="100" height="120" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,40 Q50,0 80,40 L75,50 L25,50 Z" fill="#8B4513" stroke="#000" stroke-width="1" />
      <path d="M60,45 Q70,70 65,100" fill="none" stroke="#8B4513" stroke-width="10" />
    </svg>`
  },
  {
    id: 'hair_bald',
    name: 'Łysy',
    forSex: 'male',
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- No hair, just a subtle highlight -->
      <ellipse cx="50" cy="30" rx="30" ry="10" fill="#FFF" fill-opacity="0.2" />
    </svg>`
  }
];

// Body types
export const bodyOptions = [
  {
    id: 'body_normal',
    name: 'Zwykłe',
    svg: `<svg width="150" height="200" viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="100" width="50" height="80" rx="5" fill="#FF0000" />
      <rect x="40" y="180" width="30" height="20" fill="#0000FF" />
      <rect x="80" y="180" width="30" height="20" fill="#0000FF" />
    </svg>`
  },
  {
    id: 'body_small',
    name: 'Drobne',
    svg: `<svg width="150" height="200" viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="100" width="40" height="70" rx="5" fill="#FF0000" />
      <rect x="45" y="170" width="25" height="30" fill="#0000FF" />
      <rect x="80" y="170" width="25" height="30" fill="#0000FF" />
    </svg>`
  },
  {
    id: 'body_large',
    name: 'Duże',
    svg: `<svg width="150" height="200" viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="45" y="100" width="60" height="80" rx="10" fill="#FF0000" />
      <rect x="35" y="180" width="35" height="20" fill="#0000FF" />
      <rect x="80" y="180" width="35" height="20" fill="#0000FF" />
    </svg>`
  }
];

// Accessory options
export const accessoryOptions = [
  {
    id: 'accessory_glasses',
    name: 'Okulary',
    svg: `<svg width="100" height="30" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="15" r="15" fill="none" stroke="#000" stroke-width="2" />
      <circle cx="70" cy="15" r="15" fill="none" stroke="#000" stroke-width="2" />
      <path d="M45,15 L55,15" fill="none" stroke="#000" stroke-width="2" />
    </svg>`
  },
  {
    id: 'accessory_hat',
    name: 'Kapelusz',
    svg: `<svg width="100" height="50" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="25" rx="40" ry="10" fill="#444" />
      <rect x="30" y="5" width="40" height="20" rx="5" fill="#444" />
    </svg>`
  },
  {
    id: 'accessory_none',
    name: 'Brak',
    svg: `<svg width="100" height="30" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg"></svg>`
  }
];