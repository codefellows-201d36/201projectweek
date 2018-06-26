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
  playerProgress: 0,
  gameLength: 0, // length in hours
  timeRemaining: 120, // time left in hours
  siteTravel: [1, 2, 3],
  finalSite: 0, // randomly select final site to capture suspect
  finalRound: false,
  nextLocation: '',
  startLocation: '',
  gameDifficulty: '',
  gameSuspect: '',
  gameScenario: '',
};


// gameplay ===================================================================================================================
// specify starting logic variables
var gameSetting = function() {
  var generateGameSuspect = Math.floor(Math.random() * myGlobals.allSuspects.length);
  var generateGameScenario = Math.floor(Math.random() * myGlobals.allScenarios.length);
  var generateGameStartLocation = Math.floor(Math.random() * myGlobals.allLocations.length);
  logic.gameSuspect = (myGlobals.allSuspects[generateGameSuspect].name);
  logic.gameScenario = (myGlobals.allScenarios[generateGameScenario].scenario);
  logic.startLocation =  (myGlobals.allLocations[generateGameStartLocation]);
};

// generates the distance/hours used when traveling
Math.getDistance = function(x1, y1, x2, y2) {
  var xs = x2 - x1;
  var ys = y2 - y1;
  xs *= xs;
  ys *= ys;
  return Math.ceil(Math.sqrt(xs + ys));
};

gameSetting();
Math.getDistance(4, 7, 2, 9);

// functions ==================================================================================================================
// create randomizer here
// rerender node