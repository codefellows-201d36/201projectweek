// =========================================================================================================================
// global variables
// =========================================================================================================================
var sampleOne = document.getElementById('selection1');
var sampleTwo = document.getElementById('selection2');
var sampleThree = document.getElementById('selection3');
var myGlobals = {
  siteSelections: [],
  allSuspects: [],
  allScenarios: [],
  allSites:[],
  allLocations:[],
  allCoordinates:[],
  locationSelections: [sampleOne, sampleTwo, sampleThree],
  selection1: document.getElementById('selection1'),
  selection2: document.getElementById('selection2'),
  selection3: document.getElementById('selection3'),
  investigateBtn: document.getElementById('btnInvestigate'),
  travelBtn: document.getElementById('btnTravel'),
};

var logic = {
  cluesNeededToWin: 7,
  pathToVictory: [],
  playerProgress: 0,
  timeRemaining: 120, // time left in hours
  siteTravel: [1, 2, 3],
  finalRound: false,
  nextLocation: [],
  correctLocation: '',
  currentLocation: '',
  startLocation: '',
  gameSuspect: '',
  gameScenario: '',
  username: '',
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

// sites ===============================================
new SiteOptions (['Seattle Art Museum','Amazon','Space Needle'],['random image','random image','random image']);//[0]
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

//Locations ===============================================
new Locations('Central Seattle',myGlobals.allCoordinates[0],'fact','img/central-seattle.jpg',myGlobals.allSites[0], centralSeattlePointer); //[0]
new Locations('Seattle Waterfront',myGlobals.allCoordinates[1],'fact','img/seattle-waterfront.jpg',myGlobals.allSites[1], waterFrontPointer); //[1]
new Locations('Ballard',myGlobals.allCoordinates[2],'fact','img/ballard.jpg',myGlobals.allSites[2],ballardPointer); //[2]
new Locations('Fremont',myGlobals.allCoordinates[3],'fact','img/fremont.jpg',myGlobals.allSites[3],fremontPointer); //[3]
new Locations('South Seattle',myGlobals.allCoordinates[4],'fact','img/south-seattle.jpg',myGlobals.allSites[4],southSeattlePointer); //[4]
new Locations('Bellevue',myGlobals.allCoordinates[5],'fact','img/bellevue.jpg',myGlobals.allSites[5],bellevuePointer); //[5]
new Locations('Redmond',myGlobals.allCoordinates[6],'fact','img/redmond.jpg',myGlobals.allSites[6],redmondPointer); //[6]
new Locations('Tacoma',myGlobals.allCoordinates[7],'fact','img/tacoma.jpg',myGlobals.allSites[7],tacomaPointer); //[7]
new Locations('Leavenworth',myGlobals.allCoordinates[8],'fact','img/leavenworth.jpg',myGlobals.allSites[8],leavenworthPointer); //[8]
new Locations('Walla Walla',myGlobals.allCoordinates[9],'fact','img/walla-walla.jpg',myGlobals.allSites[9],wallaWallaPointer); //[9]
new Locations('West Coast',myGlobals.allCoordinates[10],'fact','img/west-coast.jpg',myGlobals.allSites[10],westCoastPointer); //[10]
new Locations('SeaTac/Tukwila',myGlobals.allCoordinates[11],'fact','img/tukwila.jpg',myGlobals.allSites[11],seaTacTukwillaPointer); //[11]
new Locations('University District',myGlobals.allCoordinates[12],'fact','img/university-district.jpg',myGlobals.allSites[12],uDistrictPointer); //[12]
new Locations('Bellingham',myGlobals.allCoordinates[13],'fact','img/bellingham.jpg',myGlobals.allSites[13],bellinghamPointer); //[13]
new Locations('Spokane',myGlobals.allCoordinates[14],'fact','img/spokane.jpg',myGlobals.allSites[14],spokanePointer); //[14]

// coordinates ===============================================
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

// objects ===============================================
var narration = {
  success: 'You caught the suspect!',
  failure: 'You failed to catch the suspect.',
  intro: 'placeholder',
};

var centralSeattlePointer = {
  clue1:`I heard he was trying to find "The Hammering Man".`,
  clue2:`Sources tell me that he was interested in checking out "Bezo’s Balls".`,
  clue3:`All I know is that he said he was really hungry and needed to have an amazing view of the Olympic Mountains.`,
};

var waterFrontPointer = {
  clue1:`I saw the person you’re looking for an he was obsessed with seeing some flying fish`,
  clue2:`${Suspects.name} told me that the London Eye was a lot of fun and was on the hunt for something similar.`,
  clue3:`${Suspects.name}? He’s a huage fan of sea otters. He wants to see a bunch of them in one place.`,
};

var ballardPointer = {
  clue1:`Oh yeah, I saw him. He just can’t get enough of seafaring vessels that can move seamlessly from a freshwater lake out to sea.`,
  clue2:`You’re getting close. I last saw ${Suspects.name} in search of nice beach where he can have a bonfire and drill open a couple of cold ones with the boys.`,
  clue3:`${Suspects.name} told me he’s a big Norwegian history buff.`,
}; 

var fremontPointer = {
  clue1:`The last time I saw ${Suspects.name}, he was trying to take a selfie with a troll and a volkswagen bug.`,
  clue2:`All I know is that he has an insatiable curiosity about abandon coal gasification plants.`,
  clue3:`${Suspects.name} deeply misses Harambe. He was last seen trying to find another large gorilla to visit.`,
};  

var southSeattlePointer = {
  clue1:`I saw ${Suspects.name}. He said he was going to watch football at Centurylink Stadium`,
  clue2:`I think I overheard him say he was looking for good Chinese food.`,
  clue3:`Someone around here was wondering when they could tour The Seattle Underground.`,
};  

var bellevuePointer = {
  clue1:`He had tickets to a High School football game.`, 
  clue2:`${Suspects.name}, you say? He asked me where Laughs Comedy Club was.`, 
  clue3:`Yes, I overheard him excitedly talking about Botanical Gardens.`,
};  

var redmondPointer = {
  clue1:`I talked to ${Suspects.name}. He was in search of a large outdoor park where he could catch a summertime concert without having to drive too far outside of the city.`,
  clue2:`Stole your Style, did he? I bet he’s off trying to sell it to Bill Gates.`,
  clue3:`I saw who you’re looking for! He was with some people who were dressed up as a red plumber, a Princess, and a Mushroom who called himself Toad.`,
};  

var tacomaPointer = {
  clue1:`${Suspects.name} was heartbroken when Seattle demolished The Kingdome. He’s in search of another Dome, one of the largest in the world.`,
  clue2:`All of the golf courses in Seattle are too crowded. ${Suspects.name} is hoping to find a large one that is in a nearby city.`,
  clue3:`${Suspects.name} told me that he wanted to tour a city that was famous for its "aroma", whatever that means…`,
};  

var leavenworthPointer = {
  clue1:`Sources tell me that he is a massive fan of Bavarian styled towns where he can catch a good Oktoberfest.`,
  clue2:`Yeah, I know ${Suspects.name}. He’s obsessed with Bratwurst. If you see him, can you tell him to give me my style back?`,
  clue3:`You just missed him! I overheard him talking about how he’s always wanted to attend a Christmas Lighting Festival.`,
};  

var wallaWallaPointer = {
  clue1:`Tell you what. Last time I saw ${Suspects.name}, he told me his grand plan for teaching HTML/CSS to prison inmates at the 2nd largest prison in the state.`,
  clue2:`One thing you might not know about ${Suspects.name} is that he’s a oenophile. He’s looking to spend a few days touring the state’s finest vineyards.`,
  clue3:`I overheard him talking frantically about delicious sweet onions.`,
};  

var westCoastPointer = {
  clue1:`Don’t tell anybody, but ${Suspects.name} is a closet Twilight fan. He’s off to go check out some of the locations from the books.`,
  clue2:`That guy loves natural ocean hot springs.`,
  clue3:`It’s been a dream of ${Suspects.name}’s to ride a horse on a beach.`, 
};  

var seaTacTukwillaPointer = {
  clue1:`The last time I saw ${Suspects.name}, he was looking to book a flight.`,
  clue2:`Anyone who knows ${Suspects.name} knows that he loves Rocky & Bullwinkle nearly as much as he loves family fun!`,
  clue3:`You’re getting awfully close. He was last seen looking to buy some new skate shoes at the largest shopping center in the Pacific Northwest.`,
};  

var uDistrictPointer = {
  clue1:`Yes, exactly! He was headed off to see a college football game.`,
  clue2:`After checking out a college football game, ${Suspects.name} wanted to walk over to an outdoor shopping mall.`,
  clue3:`If there’s one thing I’ll say about ${Suspects.name} is that the dude LOVES cherry blossom trees.`,
};  

var bellinghamPointer = {
  clue1:`As a huge Deathcab for Cutie and Postal Service fan, ${Suspects.name} wants to go audit some classes at the same university Ben Gibbard graduated from.`,
  clue2:`Yes, I spoke to him yesterday. His passport is currently expired but he was hoping he might be able to bribe a Mountie to sneak across.`,
  clue3:`Snoqualmie and and Steven’s Pass don’t have enough backcountry for ${Suspects.name}. He’s looking to shred a more challenging mountain.`,
};  

var spokanePointer = {
  clue1:`He said something about wanting to hit up Hoop Fest.`,
  clue2:`Can you keep a secret? I heard ${Suspects.name} is looking to go back to college. But he simply must study at one of the 28 member institutions of the Association of Jesuit Colleges and Universities`,
  clue3:`I couldn’t tell you why, but lately ${Suspects.name} has become obsessed with hanging out in the 2nd largest city in WA state. Weird guy, am I right?`,
};  

var wrongLocationAnswers = {
  wrong1:`I’m awfully busy around here. I haven’t seen this ${Suspects.name} character anywhere.`,
  wrong2:`I’m sorry, I have never seen the person you are looking for.`,
  wrong3:`I’m not supposed to talk to strangers!`,
  wrong4:`I have not seen anyone matching that description.`,
  wrong5:`Can’t talk. I’m late for a very important date.`,
  wrong6:`What do I look like, Google?`,
  wrong7:`Why don’t you ask Siri?`,
  wrong8:`I haven’t seen this ${Suspects.name} character, but do you know anyone who wants to foster a kitten? I found a box full of them this morning and I already have 6 cats.`,
  wrong9:`Sorry friend, I don’t have time for this. I do CrossFit.`,
  wron10:`I’ve never seen anyone dressed like that.`,
  wrong11:`I have no information to give you.`,
  wrong12:`I wish I had something for you.`,
  wrong13:`A soccer ball bonked me in the head yesterday. I might have amnesia. Who are you again?`,
  wrong14:`Actually, I’m new around here. I don’t think I’d be of much help.`,
  wrong15:`I ate a "medicinal cookie" earlier and I feel strange. What was the question again?`,
  wrong16:`I’m just about to leave. Can you come back tomorrow?`,
  wrong17:`Nothing unusual ever happens around here.`,
};