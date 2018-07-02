// Safety Goggles ON!
'use strict';

// =========================================================================================================================
// global variables
// =========================================================================================================================
var myGlobals = {
  siteSelections: [],
  locationArr: [],
  allSuspects: [],
  allScenarios: [],
  allSites:[],
  allLocations:[],
  allCoordinates:[],
  selection1: document.getElementById('selection1'),
  selection2: document.getElementById('selection2'),
  selection3: document.getElementById('selection3'),
  dynamicText: document.getElementById('myText'),
  investigateBtn: document.getElementById('btnInvestigate'),
  travelBtn: document.getElementById('btnTravel'),
  locationSelections: [],
  // locationSelections: [myGlobals.selection1, myGlobals.selection2, myGlobals.selection3],
};

myGlobals.locationSelections.push(myGlobals.selection1,myGlobals.selection2, myGlobals.selection3);

var logic = {
  cluesNeededToWin: 7,
  pathToVictory: [],
  playerProgress: 0,
  timeRemaining: parseInt(localStorage.getItem('gameProgress')) || 120,
  siteTravel: [1, 2, 3],
  finalRound: false,
  nextLocation: [],
  correctLocation: '',
  gameWon: false,
  currentLocation: '',
  clueLocation: '',
  startLocation: '',
  gameSuspect: '',
  gameScenario: '',
  username: '',
};

// =========================================================================================================================
// Constructors
// =========================================================================================================================
var Locations = function(city, coordinates, fact, cityImage, sites, questions) {
  this.city = city;
  this.coordinates = coordinates; // pass in as an array [x, y]
  this.fact = fact;
  this.cityImage = cityImage;
  this.sites = sites; // pass in as an object (site location, site image)
  this.questions = questions; // pass in as an object (correct, wrong, final round)
  this.hasBeenUsed = false;
  myGlobals.allLocations.push(this);
};

var Suspects = function(name, bio) {
  this.name = name;
  this.bio = bio;
  myGlobals.allSuspects.push(this);
};

var Heists = function(scenario) {
  this.scenario = scenario;
  myGlobals.allScenarios.push(this);
};

var SiteOptions = function(siteOptions, siteImages){
  this.siteOptions = siteOptions;
  this.siteImages = siteImages;
  myGlobals.allSites.push(this);
};

// =========================================================================================================================
// Temporary Data Load -- Will be moving to Setup.js (maybe)
// =========================================================================================================================

new Suspects('Brian Nations', 'He is good at CSS');
// new Suspects('Demi', 'She is a 3 legged dog');
// new Suspects('Allie', 'She can teach people things');

//scenarios
new Heists(' stole all the CSS in the land!');
// new Heists(' stole all of the cereal bars!');
// new Heists(' stole my lunch money!');

// objects ===============================================
// var narration = {
//   success: 'You caught the suspect!',
//   failure: 'You failed to catch the suspect.',
//   intro: 'placeholder',
// };

var centralSeattlePointer = {
  clue1:`I heard he was trying to find "The Hammering Man".`, // eslint-disable-line
  clue2:`Sources tell me that he was interested in checking out "Bezo’s Balls".`, // eslint-disable-line
  clue3:`All I know is that he said he was really hungry and needed to have an amazing view of the Olympic Mountains.`, // eslint-disable-line
};

var waterFrontPointer = {
  clue1:`I saw the person you’re looking for an he was obsessed with seeing some flying fish`, // eslint-disable-line
  clue2:`${Suspects.name} told me that the London Eye was a lot of fun and was on the hunt for something similar.`,
  clue3:`${Suspects.name}? He’s a huge fan of sea otters. He wants to see a bunch of them in one place.`,
};

var ballardPointer = {
  clue1:`Oh yeah, I saw him. He just can’t get enough of seafaring vessels that can move seamlessly from a freshwater lake out to sea.`, // eslint-disable-line
  clue2:`You’re getting close. I last saw ${Suspects.name} in search of nice beach where he can have a bonfire and drill open a couple of cold ones with the boys.`,
  clue3:`${Suspects.name} told me he’s a big Norwegian history buff.`,
};

var fremontPointer = {
  clue1:`The last time I saw ${Suspects.name}, he was trying to take a selfie with a troll and a volkswagen bug.`,
  clue2:`All I know is that he has an insatiable curiosity about abandon coal gasification plants.`, // eslint-disable-line
  clue3:`${Suspects.name} deeply misses Harambe. He was last seen trying to find another large gorilla to visit.`,
};

var southSeattlePointer = {
  clue1:`I saw ${Suspects.name}. He said he was going to watch football at Centurylink Stadium`,
  clue2:`I think I overheard him say he was looking for good Chinese food.`, // eslint-disable-line
  clue3:`Someone around here was wondering when they could tour The Seattle Underground.`, // eslint-disable-line
};

var bellevuePointer = {
  clue1:`He had tickets to a High School football game.`, // eslint-disable-line
  clue2:`${Suspects.name}, you say? He asked me where Laughs Comedy Club was.`,
  clue3:`Yes, I overheard him excitedly talking about Botanical Gardens.`, // eslint-disable-line
};

var redmondPointer = {
  clue1:`I talked to ${Suspects.name}. He was in search of a large outdoor park where he could catch a summertime concert without having to drive too far outside of the city.`,
  clue2:`Stole your Style, did he? I bet he’s off trying to sell it to Bill Gates.`, // eslint-disable-line
  clue3:`I saw who you’re looking for! He was with some people who were dressed up as a red plumber, a Princess, and a Mushroom who called himself Toad.`, // eslint-disable-line
};

var tacomaPointer = {
  clue1:`${Suspects.name} was heartbroken when Seattle demolished The Kingdome. He’s in search of another Dome, one of the largest in the world.`,
  clue2:`All of the golf courses in Seattle are too crowded. ${Suspects.name} is hoping to find a large one that is in a nearby city.`,
  clue3:`${Suspects.name} told me that he wanted to tour a city that was famous for its "aroma", whatever that means…`,
};

var leavenworthPointer = {
  clue1:`Sources tell me that he is a massive fan of Bavarian styled towns where he can catch a good Oktoberfest.`, // eslint-disable-line
  clue2:`Yeah, I know ${Suspects.name}. He’s obsessed with Bratwurst. If you see him, can you tell him to give me my style back?`,
  clue3:`You just missed him! I overheard him talking about how he’s always wanted to attend a Christmas Lighting Festival.`, // eslint-disable-line
};

var wallaWallaPointer = {
  clue1:`Tell you what. Last time I saw ${Suspects.name}, he told me his grand plan for teaching HTML/CSS to prison inmates at the 2nd largest prison in the state.`,
  clue2:`One thing you might not know about ${Suspects.name} is that he’s a oenophile. He’s looking to spend a few days touring the state’s finest vineyards.`,
  clue3:`I overheard him talking frantically about delicious sweet onions.`, // eslint-disable-line
};

var westCoastPointer = {
  clue1:`Don’t tell anybody, but ${Suspects.name} is a closet Twilight fan. He’s off to go check out some of the locations from the books.`,
  clue2:`That guy loves natural ocean hot springs.`, // eslint-disable-line
  clue3:`It’s been a dream of ${Suspects.name}’s to ride a horse on a beach.`,
};

var seaTacTukwillaPointer = {
  clue1:`The last time I saw ${Suspects.name}, he was looking to book a flight.`,
  clue2:`Anyone who knows ${Suspects.name} knows that he loves Rocky & Bullwinkle nearly as much as he loves family fun!`,
  clue3:`You’re getting awfully close. He was last seen looking to buy some new skate shoes at the largest shopping center in the Pacific Northwest.`, // eslint-disable-line
};

var uDistrictPointer = {
  clue1:`Yes, exactly! He was headed off to see a college football game.`, // eslint-disable-line
  clue2:`After checking out a college football game, ${Suspects.name} wanted to walk over to an outdoor shopping mall.`,
  clue3:`If there’s one thing I’ll say about ${Suspects.name} is that the dude LOVES cherry blossom trees.`,
};

var bellinghamPointer = {
  clue1:`As a huge Deathcab for Cutie and Postal Service fan, ${Suspects.name} wants to go audit some classes at the same university Ben Gibbard graduated from.`,
  clue2:`Yes, I spoke to him yesterday. His passport is currently expired but he was hoping he might be able to bribe a Mountie to sneak across.`, // eslint-disable-line
  clue3:`Snoqualmie and and Steven’s Pass don’t have enough backcountry for ${Suspects.name}. He’s looking to shred a more challenging mountain.`,
};

var spokanePointer = {
  clue1:`He said something about wanting to hit up Hoop Fest.`, // eslint-disable-line
  clue2:`Can you keep a secret? I heard ${Suspects.name} is looking to go back to college. But he simply must study at one of the 28 member institutions of the Association of Jesuit Colleges and Universities`,
  clue3:`I couldn’t tell you why, but lately ${Suspects.name} has become obsessed with hanging out in the 2nd largest city in WA state. Weird guy, am I right?`,
};

// city facts ===============================================
var cityFact = {
  centralSeattle: 'Recognized around the globe, the space needle was built for the 1962 World\'s Fair, which drew over 2.3 million visitors.',
  waterFront: 'The Seattle waterfront is most known for Pike Place Market. Thanks to its famouse flying fish, its the world\'s 33rd most visited tourist attraction.',
  ballard: 'Located in Northwestern Seattle, Ballard is historically the center of Scandavian culture. Settlers were drawn to the ideal salmon fishing opportunties.',
  fremont: 'Now a neighborhood in Northwestern Seattle, Fremont was its own city until 1891.',
  southSeattle: 'Seattle\'s International District is comprised of three neighbrohoods, colloquially referred to as Chinatown, Japantown, and Little Saigon.',
  bellevue: 'There are several cities with the same name in the US and around the world. It is derived from the French words for "beautiful view".',
  redmond: 'Redmond is sometimes referred to as the "bicycle capital of the world". It hosts an annual bike race on city streets.',
  tacoma: 'At the time the third longest suspension bridge in the world, the Tacoma Narrows Bridge notoriously collasped in 1940 due to strong wind conditions combined with faulty construction.',
  leavenworth: 'Incorporated in 1906, Leavenworth was converted to a Bavarian style village in the 1960s as a project to revitalize the former struggling logging town.',
  wallaWalla: 'Incorporated in 1862, Walla Walla was briefly the most populous city in the territory of Washington as a result of a gold rush in Idaho.',
  westCoast: 'Forks is a small logging town in the Northwest corner of the state that has gained recent popularity as the setting of the "Twilight" book series.',
  seaTacTukwila: 'Proabably quite obvious to most, the SeaTac name is a combination of the names Seattle and Tacoma. The city is quite small at only 27,000 people as of a 2010 census.',
  universityDistrict: 'University District is so named for being the location of the University of Washington, which has been in that location since 1895.',
  bellingham: 'George Vancouver named "Bellingham" after a member of the British Royal Navy, Sir William Bellingham, after his visit to the area.',
  spokane: 'Spokane is commonly believed to be the birthplace of "Father\'s Day." The first one is said to have been celebrated in 1910.',
};

// sites ===============================================
new SiteOptions(['Seattle Art Museum','Amazon','Space Needle'],['random image','random image','random image']);//[0]
new SiteOptions(['Pike Place','Ferris Wheel', 'Seattle Aquarium'],['random image','random image','random image']);//[1]
new SiteOptions(['Ballard Locks','Golden Gardens','Norweigan Museum'],['random image','random image','random image']);//[2]
new SiteOptions(['Troll', 'Gas Works Park','Woodlands Park Zoo'],['random image','random image','random image']);//[3]
new SiteOptions(['Century Link Field','International District','Safeco Field'],['random image','random image','random image']);//[4]
new SiteOptions(['Bellevue Square','Botanical Gardens','Bellevue High School'],['random image','random image','random image']);//[5]
new SiteOptions(['Marymoor Park','Microsoft','Nintendo'],['random image','random image','random image']);//[6]
new SiteOptions(['Tacoma Dome','Chambers Bay','Tacoma Narrows Bridge'],['random image','random image','random image']);//[7]
new SiteOptions(['Oktoberfest','Brats','Christmas Time'],['random image','random image','random image']);//[8]
new SiteOptions(['Penitentiary','Sweet Onions','Wine Country'],['random image','random image','random image']);//[9]
new SiteOptions(['Forks','Long Beach', 'Ocean Shores'],['random image','random image','random image']);//[10]
new SiteOptions(['Family Fun Center','Airport','Southcenter Mall'],['random image','random image','random image']);//[11]
new SiteOptions(['Husky Stadium','University Village','Cherry Blossom Trees'],['random image','random image','random image']);//[12]
new SiteOptions(['Western Washington University','Canadian Border','Mount Baker'],['random image','random image','random image']);//[13]
new SiteOptions(['Hoop Fest','Gonzaga','Spokane Falls'],['random image','random image','random image']);//[14]

//Location Objects ===============================================
new Locations('Central Seattle',myGlobals.allCoordinates[0],cityFact.centralSeattle,'img/central-seattle.jpg',myGlobals.allSites[0],centralSeattlePointer); //[0]
new Locations('Seattle Waterfront',myGlobals.allCoordinates[1],cityFact.waterFront,'img/seattle-waterfront.jpg',myGlobals.allSites[1],waterFrontPointer); //[1]
new Locations('Ballard',myGlobals.allCoordinates[2],cityFact.ballard,'img/ballard.jpg',myGlobals.allSites[2],ballardPointer); //[2]
new Locations('Fremont',myGlobals.allCoordinates[3],cityFact.fremont,'img/fremont.jpg',myGlobals.allSites[3],fremontPointer); //[3]
new Locations('South Seattle',myGlobals.allCoordinates[4],cityFact.southSeattle,'img/south-seattle.jpg',myGlobals.allSites[4],southSeattlePointer); //[4]
new Locations('Bellevue',myGlobals.allCoordinates[5],cityFact.bellevue,'img/bellevue.jpg',myGlobals.allSites[5],bellevuePointer); //[5]
new Locations('Redmond',myGlobals.allCoordinates[6],cityFact.redmond,'img/redmond.jpg',myGlobals.allSites[6],redmondPointer); //[6]
new Locations('Tacoma',myGlobals.allCoordinates[7],cityFact.tacoma,'img/tacoma.jpg',myGlobals.allSites[7],tacomaPointer); //[7]
new Locations('Leavenworth',myGlobals.allCoordinates[8],cityFact.leavenworth,'img/leavenworth.jpg',myGlobals.allSites[8],leavenworthPointer); //[8]
new Locations('Walla Walla',myGlobals.allCoordinates[9],cityFact.wallaWalla,'img/walla-walla.jpg',myGlobals.allSites[9],wallaWallaPointer); //[9]
new Locations('West Coast',myGlobals.allCoordinates[10],cityFact.westCoast,'img/west-coast.jpg',myGlobals.allSites[10],westCoastPointer); //[10]
new Locations('SeaTac/Tukwila',myGlobals.allCoordinates[11],cityFact.seaTacTukwila,'img/tukwila.jpg',myGlobals.allSites[11],seaTacTukwillaPointer); //[11]
new Locations('University District',myGlobals.allCoordinates[12],cityFact.universityDistrict,'img/university-district.jpg',myGlobals.allSites[12],uDistrictPointer); //[12]
new Locations('Bellingham',myGlobals.allCoordinates[13],cityFact.bellingham,'img/bellingham.jpg',myGlobals.allSites[13],bellinghamPointer); //[13]
new Locations('Spokane',myGlobals.allCoordinates[14],cityFact.spokane,'img/spokane.jpg',myGlobals.allSites[14],spokanePointer); //[14]

// =========================================================================================================================
// Functions
// =========================================================================================================================
// generate starting settings
var gameSettings = function() {
  // assign random value to temporary variable
  var generateGameSuspect = Math.floor(Math.random() * myGlobals.allSuspects.length);
  var generateGameScenario = Math.floor(Math.random() * myGlobals.allScenarios.length);
  var generateGameStartLocation = Math.floor(Math.random() * myGlobals.allLocations.length);

  // map starting values
  logic.gameSuspect = (myGlobals.allSuspects[generateGameSuspect].name);
  logic.gameScenario = (myGlobals.allScenarios[generateGameScenario].scenario);
  logic.startLocation = (myGlobals.allLocations[generateGameStartLocation]);
  logic.currentLocation = logic.startLocation;
  myGlobals.allLocations[generateGameStartLocation].hasBeenUsed = true;
  generateGameNextLocation();
};

// Render the game page
function renderPage() {
  // render current location to page
  var currentGameLocationElement = document.getElementById('myLocation');
  currentGameLocationElement.textContent = logic.currentLocation.city;

  // Setup game progression (DO NOT TOUCH)
  logic.nextLocation = logic.pathToVictory[0];
  logic.correctLocation = logic.pathToVictory[0];

  // Prepare page nodes
  var siteHeading = document.getElementById('myHeading');
  var currentLocationImage = document.getElementById('locationImage');
  var travelButton = document.getElementById('btnTravel');
  var travelInvestigate = document.getElementById('btnInvestigate');
  var myLocation = document.getElementById('myLocation');
  var myTimeStamp = document.getElementById('myTimestamp');


  // gives player initial clue
  randomLocations();
  populateSiteSelections();
  siteHeading.textContent = logic.startLocation.city;
  myGlobals.dynamicText.textContent = logic.startLocation.fact;
  currentLocationImage.src = logic.startLocation.cityImage;
  travelButton.textContent = 'Travel';
  travelInvestigate.textContent = 'Investigate';
  myLocation.textContent = 'Location: ' + logic.startLocation.city;
  myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
}

function rerenderPageNodes() {
  var timestamp = document.getElementById('myTimestamp');
  var siteHeading = document.getElementById('myHeading');
  var myLocation = document.getElementById('myLocation');
  var myTimeStamp = document.getElementById('myTimestamp');
  var currentLocationImage = document.getElementById('locationImage');
  myGlobals.dynamicText.textContent = logic.currentLocation.fact;
  siteHeading.textContent = logic.currentLocation.city;
  currentLocationImage.src = logic.currentLocation.cityImage;
  timestamp.textContent = logic.timeRemaining;
  myLocation.textContent = 'Location: ' + logic.currentLocation.city;
  myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
}

// generates next location
function generateGameNextLocation() {
  var index = NaN;
  for (var i=0; i < logic.cluesNeededToWin; i++) {
    do {
      index = Math.floor(Math.random() * myGlobals.allLocations.length);
    } while (myGlobals.allLocations[index].hasBeenUsed === true);

    // map values to variables
    logic.pathToVictory.push(myGlobals.allLocations[index]);
    myGlobals.allLocations[index].hasBeenUsed = true;
  }
}

// Random location selector
function randomLocations() {
  do {
    // generate random numbers for indices of allLocations array
    var randomOne = Math.floor(Math.random() * myGlobals.allLocations.length);
    var randomTwo = Math.floor(Math.random() * myGlobals.allLocations.length);
    var randomThree = Math.floor(Math.random() * myGlobals.allLocations.length);
  } while (randomOne === randomTwo
    || randomOne === randomThree
    || randomTwo === randomThree
    || randomOne === myGlobals.allLocations.indexOf(logic.pathToVictory[0])
    || randomTwo === myGlobals.allLocations.indexOf(logic.pathToVictory[0])
    || randomThree === myGlobals.allLocations.indexOf(logic.pathToVictory[0]));
  myGlobals.locationSelections[0].textContent = myGlobals.allLocations[randomOne].city;
  myGlobals.locationArr[0] = myGlobals.allLocations[randomOne];
  myGlobals.locationSelections[1].textContent = myGlobals.allLocations[randomTwo].city;
  myGlobals.locationArr[1] = myGlobals.allLocations[randomTwo];
  myGlobals.locationSelections[2].textContent = myGlobals.allLocations[randomThree].city;
  myGlobals.locationArr[2] = myGlobals.allLocations[randomThree];
  var pathToVictoryIndex = Math.floor(Math.random() * 3);
  myGlobals.locationSelections[pathToVictoryIndex].textContent = logic.pathToVictory[0].city;
  myGlobals.locationArr[pathToVictoryIndex] = logic.pathToVictory[0];
}

// generates the distance/hours used when traveling
Math.getDistance = function(x1, y1, x2, y2) {
  var xs = x2 - x1;
  var ys = y2 - y1;
  xs *= xs;
  ys *= ys;
  return Math.ceil(Math.sqrt(xs + ys));
};

// populates the investigation options
function populateSiteSelections() {
  myGlobals.selection1.textContent = logic.currentLocation.sites.siteOptions[0];
  myGlobals.selection2.textContent = logic.currentLocation.sites.siteOptions[1];
  myGlobals.selection3.textContent = logic.currentLocation.sites.siteOptions[2];
}

function populateSiteSelectionsClick0() {
  myGlobals.selection1.textContent = myGlobals.locationArr[0].sites.siteOptions[0];
  myGlobals.selection2.textContent = myGlobals.locationArr[0].sites.siteOptions[1];
  myGlobals.selection3.textContent = myGlobals.locationArr[0].sites.siteOptions[2];
  logic.currentLocation = myGlobals.locationArr[0];
  rerenderPageNodes();
}

function populateSiteSelectionsClick1() {
  myGlobals.selection1.textContent = myGlobals.locationArr[1].sites.siteOptions[0];
  myGlobals.selection2.textContent = myGlobals.locationArr[1].sites.siteOptions[1];
  myGlobals.selection3.textContent = myGlobals.locationArr[1].sites.siteOptions[2];
  logic.currentLocation = myGlobals.locationArr[1];
  rerenderPageNodes();
}

function populateSiteSelectionsClick2() {
  myGlobals.selection1.textContent = myGlobals.locationArr[2].sites.siteOptions[0];
  myGlobals.selection2.textContent = myGlobals.locationArr[2].sites.siteOptions[1];
  myGlobals.selection3.textContent = myGlobals.locationArr[2].sites.siteOptions[2];
  logic.currentLocation = myGlobals.locationArr[2];
  rerenderPageNodes();
}

function deactiveGame() {
  myGlobals.selection1.removeEventListener('click', selection);
  myGlobals.selection1.removeEventListener('click', selection);
  myGlobals.selection1.removeEventListener('click', selection);
  myGlobals.investigateBtn.removeEventListener('click', investigation);
  myGlobals.travelBtn.removeEventListener('click', travel);
}

// GAME OVER
function gameOver() {
  deactiveGame();
  cleanNode('game');

  // Return Final Message
  var outputTarget = document.getElementById('game');
  var finalMessage = document.createElement('p');
  finalMessage.classList.add('gameover');
  finalMessage.textContent = 'Sorry. Looks like Brian stole your style!<br><br>GAME OVER. <br><br(>Press Ctrl+R or F5 to play again!)';
  outputTarget.appendChild(finalMessage);
}

// clean node function
function cleanNode(myId) {
  var node = document.getElementById(myId);
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

function clearList() {
  myGlobals.selection1.textContent = '';
  myGlobals.selection2.textContent = '';
  myGlobals.selection3.textContent = '';
}

// =========================================================================================================================
// Event Handlers
// =========================================================================================================================
// for selection <li>'s
function selection(event) {
  var myTimeStamp = document.getElementById('myTimestamp');

  // Standalone check to see if user is at NEXT correct location
  if (logic.currentLocation === logic.correctLocation) {
    // Preserve current location for clues
    logic.clueLocation = logic.correctLocation;
    logic.pathToVictory.shift();

    // Check if user won the game
    if(logic.pathToVictory === undefined || logic.pathToVictory.length === 0) {
      logic.gameWon = true;
    }
    // Update Game Progress
    else {
      logic.correctLocation = logic.pathToVictory[0];
      logic.nextLocation = logic.pathToVictory[0];
      randomLocations();
    }
  } else {
    // do nothing
  }

  // Check if GAME FAIL
  if(logic.timeRemaining <= 1) {
    gameOver();
    console.log('GAME OVER');

  // Check if GAME SUCCESS
  } else if (logic.gameWon === true) {
    gameSuccess();

  // Site 1 Navigation
  } else if (event.target.classList[0] === 'siteNavigation1') {
    if (logic.currentLocation === logic.clueLocation || logic.currentLocation === logic.startLocation) {
      logic.timeRemaining --;
      myGlobals.dynamicText.textContent = logic.nextLocation.questions.clue1;
      myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
      clearList();
      gameProgress();
    } else {
      logic.timeRemaining --;
      myGlobals.dynamicText.textContent = 'wrongo bucky';
      myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
      clearList();
      gameProgress();
    }

  // Site 2 Navigation
  } else if (event.target.classList[0] === 'siteNavigation2') {
    if (logic.currentLocation === logic.clueLocation || logic.currentLocation === logic.startLocation) {
      logic.timeRemaining --;
      myGlobals.dynamicText.textContent = logic.nextLocation.questions.clue2;
      myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
      clearList();
      gameProgress();
    } else {
      logic.timeRemaining --;
      myGlobals.dynamicText.textContent = 'wrongo bucky';
      myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
      clearList();
      gameProgress();
    }

  // Site 3 Navigation
  } else if (event.target.classList[0] === 'siteNavigation3') {
    if (logic.currentLocation === logic.clueLocation || logic.currentLocation === logic.startLocation) {
      logic.timeRemaining --;
      myGlobals.dynamicText.textContent = logic.nextLocation.questions.clue3;
      myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
      clearList();
      gameProgress();
    } else {
      logic.timeRemaining --;
      myGlobals.dynamicText.textContent = 'wrongo bucky';
      myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
      clearList();
      gameProgress();
    }

  // Travel 1 Navigation
  } else if (event.target.classList[0] === 'travelNavigation1') {
    populateSiteSelectionsClick0();
    logic.timeRemaining -=5;
    event.target.classList.remove('travelNavigation1');
    myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
    clearList();
    gameProgress();
  // Travel 2 Navigation
  } else if (event.target.classList[0] === 'travelNavigation2') {
    populateSiteSelectionsClick1();
    logic.timeRemaining -=5;
    event.target.classList.remove('travelNavigation2');
    myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
    clearList();
    gameProgress();
    // Travel 3 Navigation
  } else if (event.target.classList[0] === 'travelNavigation3') {
    populateSiteSelectionsClick2();
    logic.timeRemaining -=5;
    event.target.classList.remove('travelNavigation3');
    myTimeStamp.textContent = 'Remaining: ' + logic.timeRemaining + ' hours';
    clearList();
    gameProgress();
  // Error Handling
  } else {
    console.log('Something went wrong');
  }
}

function gameSuccess () {
  console.log('You successfully apprehended Brian Nations! Well done!');
  myGlobals.dynamicText.textContent = 'You successfully apprehended Brian Nations in time, and prevented him from stealing your style. Great job, detective!\n\nPress Ctrl+R or F5 to play again.';
  deactiveGame();
}

// for investigation <li>
function investigation() { //removed event
  populateSiteSelections();
  myGlobals.selection1.classList.remove('travelNavigation1');
  myGlobals.selection2.classList.remove('travelNavigation2');
  myGlobals.selection3.classList.remove('travelNavigation3');
  myGlobals.selection1.classList.add('siteNavigation1');
  myGlobals.selection2.classList.add('siteNavigation2');
  myGlobals.selection3.classList.add('siteNavigation3');
  gameProgress();
}

// for travel <li>
function travel() { //removed event
  myGlobals.selection1.classList.remove('siteNavigation1');
  myGlobals.selection2.classList.remove('siteNavigation2');
  myGlobals.selection3.classList.remove('siteNavigation3');
  myGlobals.selection1.classList.add('travelNavigation1');
  myGlobals.selection2.classList.add('travelNavigation2');
  myGlobals.selection3.classList.add('travelNavigation3');
  for (var i=0; i < myGlobals.locationArr.length; i++) {
    myGlobals.locationSelections[i].textContent = myGlobals.locationArr[i].city;
  }
  gameProgress();
}

// localStorage
var gameProgress = function() {
  localStorage.setItem('gameProgress', JSON.stringify(logic.timeRemaining));
};

// =========================================================================================================================
// Execution Code
// =========================================================================================================================
gameSettings();
renderPage();

// Event listner for selection <li>'s
myGlobals.selection1.addEventListener('click', selection);
myGlobals.selection2.addEventListener('click', selection);
myGlobals.selection3.addEventListener('click', selection);

// Event listner for investigation <li>
myGlobals.investigateBtn.addEventListener('click', investigation);

// Event listner for travel <li>
myGlobals.travelBtn.addEventListener('click', travel);

// Remove event listener if Travel option is chosen once -- or something that like that
