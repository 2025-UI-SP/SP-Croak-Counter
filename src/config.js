// config.js
// Configuration for the Join page and external links
// joinPageContent and observationsContent have been moved to locales/en.json

const BASE_URL = import.meta.env.BASE_URL || '/';
const joinBase = (path) => `${BASE_URL}${(path || '').replace(/^\//, '')}`;

const rawFrogs = [
  {
    name: "American Toad",
    fieldName: "americantoad",
    // Description and Name are now in en.json under frogs.americantoad
    audio: "/audio/33 American Toad.mp3",
    startTime: 6,
    image: "/frogs/newAmericanToad.jpg"
  },
  {
    name: "Bullfrog",
    fieldName: "bullfrog",
    audio: "/audio/01_Bullfrog.mp3",
    startTime: 5,
    image: "/frogs/newAmericanBullfrog.jpg"
  },
  {
    name: "Cope's Gray Treefrog",
    fieldName: "copesgraytreefrog",
    audio: "/audio/21 Cope_s Gray Treefrog.mp3",
    startTime: 6,
    image: "/frogs/newCopesGrayTreeFrog.jpg"
  },
  {
    name: "Eastern Gray Treefrog",
    fieldName: "easterngraytreefrog",
    audio: "/audio/20 Gray Treefrog.mp3",
    startTime: 5,
    image: "/frogs/newEasternGrayTreeFrog.jpg"
  },
  {
    name: "Fowler's Toad",
    fieldName: "fowlerstoad",
    audio: "/audio/36 Fowler_s Toad.mp3",
    startTime: 5,
    image: "/frogs/newFowlersToad.jpg"
  },
  {
    name: "Green Frog",
    fieldName: "greenfrog",
    audio: "/audio/03 Green Frog.mp3",
    startTime: 5,
    image: "/frogs/newGreenFrog.jpg"
  },
  {
    name: "Mink Frog",
    fieldName: "minkfrog",
    audio: "/audio/05 Mink Frog.mp3",
    startTime: 5,
    image: "/frogs/newMinkFrog.jpg"
  },
  {
    name: "Northern Cricket Frog",
    fieldName: "northerncricketfrog",
    audio: "/audio/31 Northern Cricket Frog.mp3",
    startTime: 6,
    image: "/frogs/newNorthernCricketFrog.jpg"
  },
  {
    name: "Northern Leopard Frog",
    fieldName: "northernleopardfrog",
    audio: "/audio/10 Northern Leopard Frog.mp3",
    startTime: 5,
    image: "/frogs/newNorthernLeopardFrog.jpeg"
  },
  {
    name: "Pickerel Frog",
    fieldName: "pickerelfrog",
    audio: "/audio/11 Pickerel Frog.mp3",
    startTime: 5,
    image: "/frogs/newPickerelFrog.jpeg"
  },
  {
    name: "Spring Peeper",
    fieldName: "springpeeper",
    audio: "/audio/23 Spring Peeper.mp3",
    startTime: 5,
    image: "/frogs/newSpringPeeper.jpg"
  },
  {
    name: "Western Chorus Frog",
    fieldName: "westernchorusfrog",
    audio: "/audio/27 Western Chorus Frog.mp3",
    startTime: 6,
    image: "/frogs/newWesternChorusFrog.jpeg"
  },
  {
    name: "Wood Frog",
    fieldName: "woodfrog",
    audio: "/audio/04 Wood Frog.mp3",
    startTime: 5,
    image: "/frogs/newWoodFrog.jpg"
  },
];

export const frogContent = {
  frogs: rawFrogs.map((frog) => ({
    ...frog,
    audio: frog.audio ? joinBase(frog.audio) : undefined,
    image: frog.image ? joinBase(frog.image) : undefined,
  })),
}


