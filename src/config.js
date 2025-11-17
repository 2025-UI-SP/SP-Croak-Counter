// config.js
// Configuration for the Join page and external links
export const joinPageContent = {
  title: "Join the KBIC Citizen Science Community",
  intro:
    "Be a part of the Keweenaw Bay Indian Community's mission to protect and study our natural environment. By joining our Citizen Science Community, you can contribute to vital research on our lands, waters, and wildlife, helping to preserve our ecosystems for future generations.",

  steps: [
    "Explore our ongoing citizen science projects, from wildlife monitoring to water quality studies.",
    "Register as a volunteer to participate in projects that match your interests.",
    "Join a training session to learn data collection techniques and project goals.",
    "Start contributing by collecting and sharing data to support KBIC’s conservation efforts!"
  ],

  contact:["For more information or to get involved, contact Erin Johnston at the KBIC Natural Resources Department: ejohnston@kbic-nsn.gov or call 906-524-5757 ext. 4227."
  ],

  websiteLabel: "Visit the KBIC NRD website for more details",
  websiteUrl: "https://nrd.kbic-nsn.gov/get-involved/"
};

const BASE_URL = import.meta.env.BASE_URL || '/';
const joinBase = (path) => `${BASE_URL}${(path || '').replace(/^\//, '')}`;

const rawFrogs = [
    {
      name: "American Toad",
      fieldName: "americantoad",
      description: " Size: 2\" to 4 3/8\". Large bumpy brown to greenish colored toad. Sound: A long, high-pitched trill that lasts about 15-30 seconds. ",
      audio: "/audio/33 American Toad.mp3",
      startTime: 6,
      image: "/frogs/AmericanToad.jpg"
    },
    {
      name: "Bullfrog",
      fieldName: "bullfrog",
      description: " Size: 3 1/2\" to 8\". Our largest frog in Michigan but not very common locally. Greenish yellow with random mottling. Cream colored belly with lighter gray spots. Sound: A deep 'juga-rum' or 'drum'. ",
      audio: "/audio/01_Bullfrog.mp3",
      startTime: 5,
      image: "/frogs/Bullfrog.png"
    },
    {
      name: "Cope's Gray Treefrog",
      fieldName: "copesgraytreefrog",
      description: " Size: 1 1/4\" to 2 3/8\". Rarely venture from the trees. Bright green to grey usually with splotches of grey. Sticky texture. Bright yellow patches underside of hind legs. Sound: Similar to Eastern Gray Treefrog but faster, higher pitched trill with more buzzy quality. ",
      audio: "/audio/21 Cope_s Gray Treefrog.mp3",
      startTime: 6,
      image: "/frogs/Cope_sGrayTreefrog.jpg"
    },
    {
      name: "Eastern Gray Treefrog",
      fieldName: "easterngraytreefrog", 
      description: " Size: 1 1/4\" to 2 3/8\". Rarely venture from the trees. Bright green to gray usually with splotches of gray. Sticky texture. Bright yellow patches underside of hind legs. Sound: A short trill that sounds like a raccoon. ",
      audio: "/audio/20 Gray Treefrog.mp3",
      startTime: 5,
      image: "/frogs/EasternGrayTreefrog.jpg"
    },
    {
      name: "Fowler's Toad",
      fieldName: "fowlerstoad",
      description: " Size: 2\" to 3 1/2\". Large bumpy brown-colored toad. Lighter belly and more warts than American Toads. Sound: Short bleeting lamb cry 'wuh'. ",
      audio: "/audio/36 Fowler_s Toad.mp3",
      startTime: 5,
      image: "/frogs/Fowler_sToad.jpg"
    },
    {
      name: "Green Frog",
      fieldName: "greenfrog",
      description: " Size: 2 1/8\" to 4\". Green or brownish colored frog with green upper lip. Large eardrum. White belly with black spots. Sounds like banjo strings. ",
      audio: "/audio/03 Green Frog.mp3",
      startTime: 5,
      image: "/frogs/GreenFrog.jpg"
    },
    {
      name: "Mink Frog",
      fieldName: "minkfrog",
      description: " Size: 1 7/8\" to 3\". Olive to brown in color with uniform mottling along sides and legs. Pungent mink-like odor. Yellowish colored belly. Sound: Like knocking on wood or like popcorn popping when in full chorus. ",
      audio: "/audio/05 Mink Frog.mp3",
      startTime: 5,
      image: "/frogs/MinkFrog.jpg"
    },
    {
      name: "Northern Cricket Frog",
      fieldName: "northerncricketfrog",
      description: " Size: 5/8\" to 1 1/2\". Very rare tiny tree frog that looks almost black. Has a dark triangle between eyes. Sound: Tapping stones together. ",
      audio: "/audio/31 Northern Cricket Frog.mp3",
      startTime: 6,
      image: "/frogs/NorthernCricketFrog.jpg"
    },
    {
      name: "Northern Leopard Frog",
      fieldName: "northernleopardfrog",
      description: "Size: 2\" to 5\". Slender brown or green frog with light edges around irregularly shaped spots. Sound: Low croaking snore that lasts for several seconds.",
      audio: "/audio/10 Northern Leopard Frog.mp3",
      startTime: 5,
      image: "/frogs/NorthernLeopardFrog.png"
    },
    {
      name: "Pickerel Frog",
      fieldName: "pickerelfrog",
      description: " Size: 1 3/4\" to 3 1/2\". Slender green or tan frog with parallel rows of square- shaped spots down its back. Yellow belly patch by inner thigh. Sound: Soft and low snore-like croak similar to leopard frog only softer and shorter. ",
      audio: "/audio/11 Pickerel Frog.mp3",
      startTime: 5,
      image: "/frogs/PickerelFrog.jpg"
    },
    {
      name: "Spring Peeper",
      fieldName: "springpeeper",
      description: " Size: 3/4\" to 1 3/8\". One of our smallest and most abundant tree frogs. Note the brown color and X mark on its back. Sound: Loud peeping. ",
      audio: "/audio/23 Spring Peeper.mp3",
      startTime: 5,
      image: "/frogs/SpringPeeper.jpg"
    },
    {
      name: "Western Chorus Frog",
      fieldName: "westernchorusfrog",
      description: " Size: 3/4\" to 1 1/2\". Breeds very early, often while snow remains. A tree frog with long black mask and three dark stripes down its back. Sound: Stumming a comb with your thumb.",
      audio: "/audio/27 Western Chorus Frog.mp3",
      startTime: 6,
      image: "/frogs/WesternChorusFrog.jpg"
    },
    {
      name: "Wood Frog",
      fieldName: "woodfrog",
      description: " Size: 1 3/8\" to 3 1/4\". Breeds early in spring then disappears into moist woodlands. Note short black mask. Sound: Like rubbing finger on wet balloon. ",
      audio: "/audio/04 Wood Frog.mp3",
      startTime: 5,
      image: "/frogs/WoodFrog.jpg"
    },
];

export const frogContent = {
  frogs: rawFrogs.map((frog) => ({
    ...frog,
    audio: frog.audio ? joinBase(frog.audio) : undefined,
    image: frog.image ? joinBase(frog.image) : undefined,
  })),
}

  export const observationsContent = {
  title: 'Saved Observations',
  intro: 'Observations currently stored on this device. Select surveys to upload when ready.',
  labels: {
    date: 'Date',
    time: 'Time',
    site: 'Site',
    status: 'Status',
    uploadButton: 'Upload'
  },
  selectAllLabel: 'Select All',
  table: {
    type: 'Type',
    uploadColumn: 'Upload',
    deleteColumn: 'Delete'
  },
  statusLabels: {
    uploaded: 'Uploaded',
    saved: 'Saved'
  },
  typeLabels: {
    advanced: 'Advanced',
    beginner: 'Beginner',
    unknown: '—'
  },
  dialogs: {
    confirmUploadTitle: 'Confirm Upload',
    confirmUploadMessage: 'Are you sure you want to upload this observation?',
    confirmDeleteTitle: 'Confirm Delete',
    confirmDeleteMessage: 'Are you sure you want to permanently delete this observation?',
    bulkUploadTitle: 'Upload Selected Observations',
    bulkUploadMessage: (count) => `Upload ${count} selected observation(s)?`,
    beginnerDetailsTitle: 'Observation Details (Beginner)',
    advancedDetailsTitle: 'Observation Details (Advanced)'
  },
  fields: {
    site: 'Site',
    latitude: 'Latitude',
    longitude: 'Longitude',
    startTime: 'Start Time',
    endTime: 'End Time',
    waterTemp: 'Water Temp (°F)',
    startingAirTemp: 'Starting Air Temp (°F)',
    endingAirTemp: 'Ending Air Temp (°F)',
    skyCondition: 'Sky Condition',
    windSpeed: 'Wind Speed',
    frogCallDensity: 'Frog Call Density',
    observer: 'Observer',
    affiliation: 'Affiliation',
    county: 'County',
    comments: 'Comments'
  },
  options: {
    skyConditions: [
      'Clear or only a few clouds',
      'Partly cloudy or variable',
      'Broken clouds or overcast',
      'Fog',
      'Drizzle or light rain (not affecting hearing)',
      'Snow',
      'Showers (is affecting hearing ability)'
    ],
    windSpeeds: [
      'Calm (<1 mph)',
      'Light Air (1-3 mph)',
      'Light Breeze (4-7 mph)',
      'Gentle Breeze (8-12 mph)',
      'Moderate Breeze (13-18 mph)',
      'Fresh Breeze (19-24 mph)',
      'Strong Breeze (25-31 mph)',
      'Moderate Gale (32-38 mph)',
      'Fresh Gale (39-46 mph)',
      'Strong Gale (47-54 mph)',
      'Whole Gale (55-63 mph)',
      'Storm (64-72 mph)',
      'Hurricane (73+ mph)'
    ],
    frogCallDensity: [
      '0 - No frogs heard',
      '1 - Individual calls, easy to count',
      '2 - Some calls overlapping',
      '3 - Full chorus, constant calling'
    ],
    speciesDensityOptions: [
      '0 - None heard',
      '1 - Individual calls, no overlapping',
      '2 - Individual calls, some overlapping',
      '3 - Full chorus, constant calling'
    ]
  },
  frogSpeciesHeading: 'Frog Species Observations'
};

