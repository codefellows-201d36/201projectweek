// Safety Goggles ON!
'use strict';

// global variables ========================================================================================================
var sampleOne = document.getElementById('selection1');
var sampleTwo = document.getElementById('selection2');
var sampleThree = document.getElementById('selection3');
var myGlobals = {
  siteSelections: [],
  allSuspects: [],
  allScenarios: [],
  allSites:[],
  allLocations:[],
  allQuestions: [],
  currentQuestions: [], // maps questions to sites for current round
  allCoordinates:[],
  locationSelections: [sampleOne, sampleTwo, sampleThree],
};

// Constructors ============================================================================================================
var Suspects = function(name, bio) {
  this.name = name;
  this.bio = bio;
  myGlobals.allSuspects.push(this);
};

var Heists = function(scenario) {
  this.scenario = scenario;
  myGlobals.allScenarios.push(this);
};

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
var SiteOptions = function(siteOptions, siteQuestions){
  this.siteOptions = siteOptions;
  this.siteQuestions = siteQuestions;
  myGlobals.allSites.push(this);
};
var Coordinates = function(x,y){
  this.x = x;
  this.y = y;
  myGlobals.allCoordinates.push(this);
};

new Suspects('Brian Nations', 'He is good at CSS');
// new Suspects('Demi', 'She is a 3 legged dog');
// new Suspects('Allie', 'She can teach people things');

//scenarios
new Heists(' stole all the CSS in the land!');
// new Heists(' stole all of the cereal bars!');
// new Heists(' stole my lunch money!');

// sites =========================================================
new SiteOptions (['Seattle Art Museum','Amazon','Space Needle'], ['q1', 'q2', 'q3']);//[0]
new SiteOptions(['Pike Place','Ferris Wheel', 'Seattle Aquarium'],['q1', 'q2', 'q3']);//[1]
new SiteOptions(['Ballard Locks','Golden Gardens','Norweigan Museum'],['q1', 'q2', 'q3']);//[2]
new SiteOptions(['Troll', 'Gas Works Park','Woodlands Park Zoo'], ['q1', 'q2', 'q3']);//[3]
new SiteOptions(['Century Link Field','International District','Safeco Field'],['q1', 'q2', 'q3']);//[4]
new SiteOptions(['Bellevue Square','Botanical Gardens','Bellevue High School'],['q1', 'q2', 'q3']);//[5]
new SiteOptions(['Marymoor Park','Microsoft','Nintendo'],['q1', 'q2', 'q3']);//[6]
new SiteOptions(['Tacoma Dome','Chambers Bay','Tacoma Narrows Bridge'],['q1', 'q2', 'q3']);//[7]
new SiteOptions(['Oktoberfest','Brats','Christmas Time'],['q1', 'q2', 'q3']);//[8]
new SiteOptions(['Penitentiary','Sweet Onions','Wine Country'],['q1', 'q2', 'q3']);//[9]
new SiteOptions(['Forks','Long Beach', 'Ocean Shores'],['q1', 'q2', 'q3']);//[10]
new SiteOptions(['Family Fun Center','Airport','Southcenter Mall'],['q1', 'q2', 'q3']);//[11]
new SiteOptions(['Husky Stadium','University Village','Cherry Blossom Trees'],['q1', 'q2', 'q3']);//[12]
new SiteOptions(['Western Washington University','Canadian Border','Mount Baker'],['q1', 'q2', 'q3']);//[13]
new SiteOptions(['Hoop Fest','Gonzaga','Spokane Falls'],['q1', 'q2', 'q3']);//[14]

//Locations ==============================================================================
new Locations('Central Seattle',myGlobals.allCoordinates[0],'fact','img',myGlobals.allSites[0],'question'); //[0]
new Locations('Seattle Waterfront',myGlobals.allCoordinates[1],'fact','img',myGlobals.allSites[1],'question'); //[1]
new Locations('Ballard',myGlobals.allCoordinates[2],'fact','img',myGlobals.allSites[2],'question'); //[2]
new Locations('Fremont',myGlobals.allCoordinates[3],'fact','img',myGlobals.allSites[3],'question'); //[3]
new Locations('South Seattle',myGlobals.allCoordinates[4],'fact','img',myGlobals.allSites[4],'question'); //[4]
new Locations('Bellevue',myGlobals.allCoordinates[5],'fact','img',myGlobals.allSites[5],'question'); //[5]
new Locations('Redmond',myGlobals.allCoordinates[6],'fact','img',myGlobals.allSites[6],'question'); //[6]
new Locations('Tacoma',myGlobals.allCoordinates[7],'fact','img',myGlobals.allSites[7],'question'); //[7]
new Locations('Leavenworth',myGlobals.allCoordinates[8],'fact','img',myGlobals.allSites[8],'question'); //[8]
new Locations('Walla Walla',myGlobals.allCoordinates[9],'fact','img',myGlobals.allSites[9],'question'); //[9]
new Locations('West Coast',myGlobals.allCoordinates[10],'fact','img',myGlobals.allSites[10],'question'); //[10]
new Locations('SeaTac/Tukwila',myGlobals.allCoordinates[11],'fact','img',myGlobals.allSites[11],'question'); //[11]
new Locations('University District',myGlobals.allCoordinates[12],'fact','img',myGlobals.allSites[12],'question'); //[12]
new Locations('Bellingham',myGlobals.allCoordinates[13],'fact','img',myGlobals.allSites[13],'question'); //[13]
new Locations('Spokane',myGlobals.allCoordinates[14],'fact','img',myGlobals.allSites[14],'question'); //[14]

// coordinates
new Coordinates(5, 5);//[0]
new Coordinates(4.9, 5);//[1]
new Coordinates(4.9, 5.1);//[2]
new Coordinates(5, 5.1);//[3]
new Coordinates(5, 4.9);//[4]
new Coordinates(6, 5);//[5]
new Coordinates(6, 6);//[6]
new Coordinates(6.4, 4.5 );//[7]
new Coordinates(7, 5.2);//[8]
new Coordinates(7.5, 9.6);//[9]
new Coordinates(0.6, 3);//[10]
new Coordinates(5.3, 5);//[11]
new Coordinates(5.6, 5);//[12]
new Coordinates(4, 1);//[13]
new Coordinates(9, 4.8);//[14]

// objects ==================================================================================================================
var narration = {
  success: 'You caught the suspect!',
  failure: 'You failed to catch the suspect.',
  intro: 'placeholder',
};

var logic = {
  cluesNeededToWin: 7,
  pathToVictory: [],
  playerProgress: 0,
  timeRemaining: 120, // time left in hours
  siteTravel: [1, 2, 3],
  finalRound: false,
  nextLocation: '',
  correctLocation: '',
  currentLocation: '',
  startLocation: '',
  gameSuspect: '',
  gameScenario: '',
  username: '',
  correctQuestion: '',
};

// execution ===================================================================================================================
// load initial game settings
// gameSettings();

// populate screen
// renderPage();

// game logic
// determine if destination choice is correct
// location choice, travel choice, etc. (right and wrong)
// gameplay outcome aka end game logic

// functions ==================================================================================================================

// rerender node
function clearNode(myId) {
  var node = document.getElementById(myId);
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

// generate starting settings
var gameSettings = function() {
  var generateGameSuspect = Math.floor(Math.random() * myGlobals.allSuspects.length);
  var generateGameScenario = Math.floor(Math.random() * myGlobals.allScenarios.length);
  var generateGameStartLocation = Math.floor(Math.random() * myGlobals.allLocations.length);
  // map random selections to logic
  logic.gameSuspect = (myGlobals.allSuspects[generateGameSuspect].name);
  logic.gameScenario = (myGlobals.allScenarios[generateGameScenario].scenario);
  logic.startLocation = (myGlobals.allLocations[generateGameStartLocation]);
  logic.currentLocation = (myGlobals.allLocations[generateGameStartLocation]);
  myGlobals.allLocations[generateGameStartLocation].hasBeenUsed = true;
  generateGameNextLocation();
  logic.correctLocation = logic.pathToVictory[0].city;
};

// generates next location
function generateGameNextLocation() {
  var index = NaN;
  for (var i =0; i < logic.cluesNeededToWin; i++) {
    do {
      index = Math.floor(Math.random() * myGlobals.allLocations.length);
    } while (myGlobals.allLocations[index].hasBeenUsed === true);
    logic.pathToVictory.push(myGlobals.allLocations[index]);
    myGlobals.allLocations[index].hasBeenUsed = true;
  }
}

// generates the distance/hours used when traveling
Math.getDistance = function(x1, y1, x2, y2) {
  var xs = x2 - x1;
  var ys = y2 - y1;
  xs *= xs;
  ys *= ys;
  return Math.ceil(Math.sqrt(xs + ys));
};

// clears the page nodes
function clearNode(myId) {
  var node = document.getElementById(myId);
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

function setQuestions() {
  // get questions and sites
  // map together and push into current questions array
}

function renderPage() {
  // display current location
  var currentGameLocation = document.getElementById('myLocation');
  currentGameLocation.textContent = logic.currentLocation.city;
  // retrieve next location (in advance)
  logic.nextLocation = logic.pathToVictory[1];
  setQuestions();
  // populate page nodes
  var quit = document.getElementById('userQuit');
  var timestamp = document.getElementById('myTimestamp');
  var siteHeading = document.getElementById('myHeading');
  var currentLocationImage = document.getElementById('locationImage');
  var travelButton = document.getElementById('btnTravel');
  var travelInvestigate = document.getElementById('btnInvestigate');
  var descriptionText = document.getElementById('myText');
  siteHeading.textContent = 'Location: ' + logic.currentLocation.city;
  timestamp.textContent = 'Time: ' + logic.timeRemaining + ' Hours Remaining';
  quit.textContent = 'Leave Game';
  currentLocationImage.src = logic.currentLocation.cityImage;
  travelButton.textContent = 'Travel';
  travelInvestigate.textContent = 'Investigate';
  descriptionText.textContent = logic.correctQuestion;
  randomLocations();
}

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
  myGlobals.locationSelections[1].textContent = myGlobals.allLocations[randomTwo].city;
  myGlobals.locationSelections[2].textContent = myGlobals.allLocations[randomThree].city;
  myGlobals.locationSelections[Math.floor(Math.random() * 3)].textContent = logic.pathToVictory[0].city;
}

// populates the investigation options
function populateSiteSelections() {
  var site1 = logic.currentLocation.sites.siteOptions[0];
  var site2 = logic.currentLocation.sites.siteOptions[1];
  var site3 = logic.currentLocation.sites.siteOptions[2];
  sampleOne.textContent = site1;
  sampleTwo.textContent = site2;
  sampleThree.textContent = site3;
}

function resetPage() {
  // run clearNode function on all page div nodes
  clearNode();
  // run renderPage
  renderPage();
}

// // generates the correct site
// function generateCorrectSite() {
//   var correctIndex = Math.floor(Math.random() * 3);
//   logic.correctSite = logic.pathToVictory[0].sites.siteOptions[correctIndex];
//   logic.correctQuestion = logic.pathToVictory[0].sites.siteQuestions[correctIndex];
//   console.log(logic.correctSite + ' ' + logic.correctQuestion);
// }

// event handlers
// for selection lis
function selection(event) {
  if (event.target.textContent === logic.correctSite) {
    
    console.log(logic.playerProgress);
  }
}

function populateSelectionSites() {
  if (event.target.textContent === )
}

// for investigation li
function investigation(event) {
  populateSiteSelections();
  console.log('hello');
}

// for travel li
function travel(event) {
  randomLocations();
}

// event listeners ===============================================================================
// for selection lis
var selectionOne = document.getElementById('selection1');
var selectionTwo = document.getElementById('selection2');
var selectionThree = document.getElementById('selection3');
selectionOne.addEventListener('click', selection);
selectionTwo.addEventListener('click', selection);
selectionThree.addEventListener('click', selection);

// for investigation li
var investigateBtn = document.getElementById('btnInvestigate');
investigateBtn.addEventListener('click', investigation);

// for travel li
var travelBtn = document.getElementById('btnTravel');
travelBtn.addEventListener('click', travel);

// function execution
gameSettings();
renderPage();
generateCorrectSite();