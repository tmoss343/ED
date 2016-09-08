////////////////////////////////Media Assets/////////////////////////////

var sources = {

	WeedSpriteSheet: 'Weed/weedspritesheet.png',
	PeripheryDefault: 'Stage/peripherydefault.png',

	/////////////////////HUD///////////////////
	SaturationDial: 'HUD/saturation.png',
	SaturationNeedle:'HUD/meter_needle.png',
	WaterCan_idle:'HUD/watering_can01.png',
	WaterCan_water:'HUD/watering_can02.png',
	HUDbar:'HUD/item_bar.png',

	///////////////////Stage////////////////////

	Stage1_FlowerSpriteSheet: 'Flower/Stage01Flowers.png',
	Stage2_FlowerSpriteSheet: 'Flower/Stage02Flowers.png',
	Stage3_FlowerSpriteSheet: 'Flower/Stage03Flowers.png',

	GardenBox_Small:'Stage/GardenBox_Stage01.png',
	GardenBox_Medium: 'Stage/GardenBox_Stage02.png',
	GardenBox_Large: 'Stage/GardenBox_Stage03.png',

	Stage1_GardenStageSpriteSheet: 'Stage/Stage1_Garden_SpriteSheet.png',
	Stage2_GardenStageSpriteSheet: 'Stage/Stage2_Garden_SpriteSheet.png',
	Stage3_GardenStageSpriteSheet: 'Stage/Stage3_Garden_SpriteSheet.png',

	//////////////////////Insects//////////////////////////////////
	slugspritesheet: 'Slug/slugspritesheet.png',
	butterflyspritesheet: 'Butterfly/butterflyspritesheet.png',
	mothspritesheet: 'Moth/moth_SpriteSheet.png',

	//////////////////////Main Menu////////////////////////////////

	ControlScreen: 'Screens/control_screen.png',
	CreditScreen: 'Screens/credit_screen.png',
	MainMenuScreen: 'Screens/MainMenu_background.png',
	WhatisScreen: 'Screens/what_it_means_screen.png',
	IntroScreen: 'Screens/intro_screen.png',
	WhiteScreen: 'Screens/whitescreen.png',

	IntroText1:'Screens/introtext1.png',
	IntroText2:'Screens/introtext2.png',
	IntroText3:'Screens/introtext3.png',

	button: 'Screens/button.png',
	StartButton:'Screens/start_button.png',
	ControlsButton: 'Screens/controls_button.png',
	CreditsButton: 'Screens/credit_button.png',
	WhatisButton: 'Screens/WhatAbout_button.png',

	BackButton:'Screens/BackButton.png',
	BacktolifeButton: 'Overlays/back_to_life_button.png',

	//////////////////////////Overlays/////////////////////////////

	stage1to2:'Overlays/FlowerText_02.png',
	stage2to3:'Overlays/FlowerText_03.png',
	stage2to1:'Overlays/FlowerText_01.png',
	perfection:'Overlays/PerfectionText.png',

	stage1to2text:'Overlays/stage1to2text.png',
	stage2to3text:'Overlays/stage2to3text.png',
	stage2to1text:'Overlays/Stage2to1text.png',
	stage3to2text:'Overlays/Stage3to2text.png',
	perfectionto3text: 'Overlays/Perfectionto3text.png',
	perfectiontext:'Overlays/Perfection_text.png',
	
	winbackground: 'Overlays/ImperfectionScreen_Background.png',
	winflower: 'Overlays/ImperfectionScreen_Flower.png',
	wintext: 'Overlays/ImperfectionScreen_Text.png',
	winbox: 'Overlays/ImperfectionScreen_TransBox.png'
};

var audiosources ={
	hunger: 'Hunger.wav',
    waterSplash: 'Watersplash1.wav',
    plantRip:    'plant_rip.wav',

    introvoice: 'BRich_1.wav',
    stage1to2voice:'BRich_2.wav',
    stage2to3voice:'BRich_3.wav',
    stage3toperfectionvoice:'BRich_4.wav',
    stageperfectionto3voice:'Melissa_3.wav',
    stage3to2voice:'Melissa_2.wav',
    stage2to1voice:'Melissa_1.wav'


};

//////////////////////////Game Screen Structures/////////////////////////
var CurrentScreen = 0;

var MainMenuScreen = new Kinetic.Layer(); 	//0
var ControlsScreen = new Kinetic.Layer(); 	//1
var CreditsScreen = new Kinetic.Layer(); 	//2
var IntroScreen = new Kinetic.Layer(); 		//3
var GameScreen = new Kinetic.Layer(); 		//4
var WhatisScreen = new Kinetic.Layer();     //5
var WinScreen = new Kinetic.Layer(); 		//6
var LoseScreen = new Kinetic.Layer(); 		//7
var OverlayScreen = new Kinetic.Layer();	//8
var stage = new Kinetic.Stage({
	container: 'container',
	width: 	720,
	height: 480
});

/////////////////////////////////System Variables////////////////////////
var timer;
var currstatus				='dry';
var temperature 			= 65;
var score					= 0;
var scoreup					= 0.5;
var currdir 				= 'per';
var currstage 				= 0;
var perfection				= false;
var showDial				= false;
var activeoverlay			= false;
var gamestarted				= false;
////////////////////Screens Backgrounds and Objects//////////////////////
var periphery;
var mainmenu;
var controls;
var credits;
var whatisit;
var intro;
////////////////////////////User Interface///////////////////////////////
var satDial;
var satNeedle;
var water;
var hud;
var currangle 				= 87.25;
var deltatemperature 		= 0;
var prevtemperature 		= 100;
var deltaangle				= 0;
var addwater				= false;
///////////////////////////Menus interface////////////////////////////////////
var buttonstart;
var buttoncredit;
var buttoncontrol;
var buttonwhat;

var startbtext;
var creditbtext;
var controlsbtext;
var whatbtext;

var backbuttoncontrols;
var backbuttoncredits;
var backbuttonwhat;

var introTextnum			= 0;
var introtimer;
var introtime 				=3.5;
///////////////////////////Game Objects//////////////////////////////////

var images 					= {};
var audioFiles 				= {};

////////////Garden////////////////
var flowerstage1;
var flowerstage2;
var flowerstage3;
var flowers 				= {};

var gardenboxS;
var gardenboxM;
var gardenboxL;
var gardenboxes 			= {};

var gardenstage;
var gardenstage2;
var gardenstage3;
var gardens 				= {};
////////////////Weeds//////////////
var Weeds 					= {};
var weednum 				= 6;
var weedselect 				= {};
var weedkilled 				= 0;
var weedremoved				= 0;
var deadweedcount			= 0;
//////////////Insects/////////////
var slugs 					= {};
var slugsnum				= 8;
var maxslugs				= 6;
var killedslugs				= 0;
var slugsAlive				= 6;
var lastkilled 				= 0;

var lanes 					= {};

var butterflies 			= {};
var butterfliesnum 			= 6;

var moths 		 			= {};
var mothsnum 				= 6;
//////////////////////////////Scrub Mechanic//////////////////////////////
var scrubflag 				= false;
var leftbound				= (184 + 20);
var rightbound				= ( 361 - 20 );
//////////////////////////////OverLays////////////////////////////////////
var ovrstage1to2;
var ovrstage2to3;
var ovrstage2to1;


var ovrstage1to2text;
var ovrstage2to3text;
var ovrstage2to1text;
var ovrstage3to2text;


var OverlayTexts 			= {};
var overlayactive			= false;
var overlaytimer;
var OnOverlayScreen 		= false;
var gotosecondscreen		= false;
var whitescreen;
//////////////////////////////////Winner///////////////////////////////////

var WinBack;
var WinFlower;
var WinText;
var WinBox;
var Winwhatisbutton;
var winwhatistext;
var winwhitescreen;
var IsWinner 					= false;
var ReloadGame					= false;
/////////////////////////////////Loser/////////////////////////////////////

var backlifebuttonlose;
var backlifetextlose;
var perfectionback;
var perfectionto3text;
var perfectiontext;
////////////////////////////////Audio///////////////////////////////////

var voiceovers				= {};
var voicecount				= 6;
var currvoice;


var lastOverlaySequence;
//Stage 1 to 2  // 1
//Stage 2 to 3 	// 2

//Stage 3 to 2  // 3 
//Stage 2 to 1  // 4

function ResetGameVariables()
{
	overlayactive			= false;
	OnOverlayScreen 		= false;
	gotosecondscreen		= false;
	IsWinner 				= true;
	scrubflag 				= false;
	maxslugs				= 6;
	killedslugs				= 0;
	slugsAlive				= 6;
	lastkilled 				= 0;
	introtime 				= 3.5;
	introTextnum			= 0;
	currangle 				= 87.25;
	deltatemperature 		= 0;
	prevtemperature 		= 100;
	deltaangle				= 0;
	addwater				= false;
	currstatus				='dry';
	temperature 			= 65;
	score					= 0;
	scoreup					= 0.5;
	currdir 				= 'per';
	currstage 				= 0;
	perfection				= false;
	showDial				= false;
	activeoverlay			= false;
	gamestarted				= false;

	introtext1.setImage(images.IntroText1);
	whitescreen.setOpacity(0);
	whitescreen.hide();

	for (i = 0; i< weednum; i++)
	{
		Weeds[i].get('Sprite')[0].hp = 5;
		Weeds[i].get('Sprite')[0].deltahp =5;
		ChangeWeedStatus(Weeds[i].get('Sprite')[0], 'alive');
	}

	satNeedle.setRotationDeg(180);
  	satNeedle.hide();
  	satDial.hide();
}