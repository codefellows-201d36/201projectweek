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
var siteOptions = function(siteOption1,siteOption2,siteOption3,siteImage1,siteImage2,siteImage3){
  this.siteOption1 = siteOption1;
  this.siteOption2 = siteOption2;
  this.siteOption3 = siteOption3;
  this.siteImage1 = siteImage1;
  this.siteImage2 = siteImage2;
  this.siteImage3 = siteImage3;
  myGlobals.allSites.push(this);
};


// objects ==================================================================================================================
var narration = {
  success: 'You caught the suspect!',
  failure: 'You failed to catch the suspect.',
  intro: 'placeholder',
};

var logic = {
  totalToWin: 0,
  playerProgress: 0,
  gameLength: 0, // length in hours
  timeRemaining: 0, // time left in hours
  siteTravel: [1, 2, 3],
  finalSite: 0, // randomly select final site to capture suspect
  finalRound: false,
  nextLocation: '',
  startLocation: '',
  gameDifficulty: '',
};


// gameplay ===================================================================================================================
// specify starting logic variables
// choose random scenario
// choose random suspect

// functions ==================================================================================================================
// create randomizer here
// rerender node