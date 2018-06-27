// Safety Goggles ON!
'use strict';

// global variables ========================================================================================================
var myGlobals = {
  allSuspects: [],
  allScenarios: [],
  allSites:[],
  allLocations:[],
  allCoordinates:[],
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
var SiteOptions = function(siteOption1,siteOption2,siteOption3,siteImage1,siteImage2,siteImage3){
  this.siteOption1 = siteOption1;
  this.siteOption2 = siteOption2;
  this.siteOption3 = siteOption3;
  this.siteImage1 = siteImage1;
  this.siteImage2 = siteImage2;
  this.siteImage3 = siteImage3;
  myGlobals.allSites.push(this);
};
var Coordinates = function(x,y){
  this.x = x;
  this.y = y;
  myGlobals.allCoordinates.push(this);
};

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
  startLocation: '',
  gameSuspect: '',
  gameScenario: '',
  username: '',
};

// execution ===================================================================================================================
// load initial game settings
gameSettings();

// populate screen
renderPage();

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
  logic.startLocation =  (myGlobals.allLocations[generateGameStartLocation]);
  myGlobals.allLocations[generateGameStartLocation].hasBeenUsed = true;
  generateGameNextLocation();
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

function renderPage() {
  // display current location
  // retrieve next location (in advance)
  // populate page nodes
}

function resetPage() {
  // run clearNode function on all page div nodes
  // run renderPage
}