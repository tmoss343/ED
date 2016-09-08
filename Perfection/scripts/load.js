function loadImages(sources) {
  var assetDirImage = 'img/';
  var loadedImages = 0;
  var numImages = 0;
  for(var src in sources) {
    numImages++;
  }
  for(var src in sources) {
    images[src] = new Image();
    images[src].onload = function()   
    {
      if(++loadedImages >= numImages)
      {
        audioFiles.hunger.addEventListener('ended', function() {
                  this.currentTime = 0;
                  this.play();
        }, false);

        audioFiles.hunger.play();
        audioFiles.hunger.volume = 0.4;
        
        buildStage();
      }
    };
    images[src].src = assetDirImage + sources[src];
  }
}

function loadSound(sources) {
  var assetDirSound = 'sound/';
  var loadedSounds = 0;
  var numSounds = 0;
  for(var src in sources) {
    numSounds++;
  }
  for(var src in sources) {
    audioFiles[src] = new Audio(assetDirSound + sources[src]);
  }
}

function buildStage()
{
  $("div").css('cursor','url(img/Cursor/glove_idle.png),auto');

  ///////Ordered by Level of Render (lower to Higher)///////
  InitializeMainMenu();
  InitializeIntro();
  InitializeControls();
  InitializeCredits();
  InitializeWhatitis();
  InitializeOverlay();
  InitializeWin();
  InitializeLose();

  InitializeBackGround();
  InitializeGarden();
  InitializeWeeds();
  InitializeFlower();
  InitializeHUD();
  InitializeSlugs();
  
  LoadLayers();
  
  InitializeAudio();
  timer = setInterval(function(){RunGame()},1000/2);
}

function InitializeSlugs()
{
  RenderSlugs();
  LoadSlugs();
}

function RenderSlugs()
{
  lanes[0] = 80;
  lanes[1] = 105;
  lanes[2] = 130;
  lanes[3] = 155;
  lanes[4] = 180;
  lanes[5] = 205;
  lanes[6] = 230;
  lanes[7] = 255;

  var tmp, current, top = 7;
  while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = lanes[current];
    lanes[current] = lanes[top];
    lanes[top] = tmp;
  }

  for (i = 0; i< slugsnum; i++)
  {
  
    var nextX = leftbound + (Math.floor(Math.random() * rightbound ) );
    
    slugs[i] = new Kinetic.Sprite(
    {
      x: nextX,
      y: lanes[i],
      opacity: 1,
      offset:{x:22.5,y:0},
      image: images.slugspritesheet,
      animation: 'move',
      animations: {
      move: [
        151,101,45,16,
        469,101,45,16,
        787,101,45,16,
        1106,101,45,16,
        1424,101,45,16,
        1742,101,45,16,

        151,313,45,16,
        469,313,45,16,
        787,313,45,16,
        1106,313,45,16,
        1424,313,45,16,
        1742,313,45,16,

        151,525,45,16,
        469,525,45,16,
        787,525,45,16,
        1106,525,45,16,
        1424,525,45,16,
        1742,525,45,16,

        151,737,45,16,
        469,737,45,16,
        787,737,45,16,
        1106,737,45,16,
        1424,737,45,16,
        1742,737,45,16,

        151,949,45,16,
        469,949,45,16,
        787,949,45,16,
        1106,949,45,16,
        1424,949,45,16,
        1742,949,45,16,

        151,1162,45,16,
        469,1162,45,16,
        787,1162,45,16,
        1106,1162,45,16,
        1424,1162,45,16,
        1742,1162,45,16,

        151,1373,45,16,
        469,1373,45,16,
        787,1373,45,16,
        1106,1373,45,16,
        1424,1373,45,16,
        1742,1373,45,16,

        151,1585,45,16,
        469,1585,45,16,
        787,1585,45,16,
        1106,1585,45,16,
      ]},
      frameRate: 24,
      frameIndex: 0,
    });
     
     slugs[i].moving = 0;
     slugs[i].index = i;
     slugs[i].status = 'alive';
     slugs[i].animation('move');
     slugs[i].start();
  }

  var tmp, current, top = slugsnum;
  while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = slugs[current];
    slugs[current] = slugs[top];
    slugs[top] = tmp;
  }

  slugs[slugsnum - 2].status = 'dead';
  slugs[slugsnum - 2].setOpacity(0);
  
  slugs[slugsnum - 1].status = 'dead';
  slugs[slugsnum - 1].setOpacity(0);
}

function LoadSlugs()
{
    for (i = 0; i< slugsnum; i++)
    {
      slugs[i].on('mousemove', function(){ 

          if (scrubflag && this.status == 'alive')
          {
            

            var tempOp = this.attrs.opacity -= 0.05;
            this.setOpacity(tempOp);
            temperature -= 0.15;

            if (tempOp < 0.10)
            {
                this.setOpacity(0);
                this.status = 'dead';
                killedslugs++;
                slugsAlive--;
                lastkilled = this.index;
            }

             $("div").css('cursor','url(img/Cursor/glove_squish.png),auto');
          }

        });
    }

    $("body").on('mousedown', function(){ 
          scrubflag = true;
    });

    $("body").on('mouseup', function(){ 
          scrubflag = false;
    });
}

function InitializeAudio()
{
  voiceovers[0] = audioFiles.stage1to2voice;
  voiceovers[1] = audioFiles.stage2to3voice;

  voiceovers[2] = audioFiles.stage3to2voice;
  voiceovers[3] = audioFiles.stage2to1voice;

  voiceovers[4] = audioFiles.stage3toperfectionvoice;
  voiceovers[5] = audioFiles.stageperfectionto3voice;

  for (i = 0; i< 4; ++i)
  {
    voiceovers[i].addEventListener('ended', function() {
            
        if (this.currentTime != 0)
        {
          this.currentTime = 0;

          if (gotosecondscreen)
            getSecondScreen();
          else
          {
            CurrentScreen = 4;
            activeoverlay = false;
          } 
        }
    }, false);
  }
}

function InitializeOverlay()
{
    RenderOverlay();
    LoadOverlay();
}

function RenderOverlay()
{    
    ovrstage1to2 = new Kinetic.Image({
      image: images.stage1to2,
      x: 0, y: 0,      
    });
    ovrstage2to3 = new Kinetic.Image({
      image: images.stage2to3,
      x: 0, y: 0,    
    });
    ovrstage2to1 = new Kinetic.Image({
      image: images.stage2to1,
      x: 0, y: 0,      
    });


    ovrstage1to2text= new Kinetic.Image({
      image: images.stage1to2text,
      x: 0, y: 0,      
    });
    ovrstage2to3text= new Kinetic.Image({
      image: images.stage2to3text,
      x: 0, y: 0,      
    });
    ovrstage2to1text= new Kinetic.Image({
      image: images.stage2to1text,
      x: 0, y: 0,      
    });
    ovrstage3to2text= new Kinetic.Image({
      image: images.stage3to2text,
      x: 0, y: 0,      
    });
}

function LoadOverlay()
{
    OverlayTexts[0] = ovrstage1to2text;
    OverlayTexts[1] = ovrstage2to3text;
    OverlayTexts[2] = ovrstage3to2text;
    OverlayTexts[3] = ovrstage2to1text;

    lastOverlaySequence = 0;
}

function InitializeIntro()
{
  RenderIntro();
}

function RenderIntro()
{
  
  intro = new Kinetic.Image({
    image: images.IntroScreen,
    x: 0, y: 0,
  });

  introtext1 = new Kinetic.Image({
    image: images.IntroText1,
    x: 90, y: 200,
    opacity: 0
  });

  introtext2 = new Kinetic.Image({
    image: images.IntroText2,
    x: 0, y: 0,
    opacity: 0
  });

  introtext3 = new Kinetic.Image({
    image: images.IntroText3,
    x: 0, y: 0,
    opacity: 0
  });
}

function InitializeWhatitis()
{
  RenderWhatitis();
  LoadWhatitis();
}

function RenderWhatitis()
{
    whatisit = new Kinetic.Image({
      image: images.WhatisScreen,
      x: 0, y: 0,
    });

    backbuttonwhat = new Kinetic.Image({
      image: images.BackButton,
      x: 7, y: 7,
    });
}

function LoadWhatitis()
{
  backbuttonwhat.on('click', function(){
    if (ReloadGame)
      location.reload();
      
      CurrentScreen = 0;
  });
}
function InitializeCredits()
{
  RenderCredits();
  LoadCredits();
}

function RenderCredits()
{
  credits = new Kinetic.Image({
    image: images.CreditScreen,
    x: 0, y: 0,
  });
  

  backbuttoncredits = new Kinetic.Image({
    image: images.BackButton,
    x: 7, y: 7,
  });
}

function LoadCredits()
{
  backbuttoncredits.on('click', function(){ 
                CurrentScreen = 0  });
}

function InitializeControls()
{
  RenderControls();
  LoadControls();
}

function RenderControls()
{
  controls = new Kinetic.Image({
    image: images.ControlScreen,
    x: 0, y: 0,
  });

  backbuttoncontrols = new Kinetic.Image({
    image: images.BackButton,
    x: 7, y: 7,
  });
}

function LoadControls()
{
  backbuttoncontrols.on('click', function(){ 
                CurrentScreen = 0;
  });
}

function InitializeMainMenu()
{
  RenderMainMenu();
  LoadMainMenu();
}

function RenderMainMenu()
{
  mainmenu = new Kinetic.Image({
    image: images.MainMenuScreen,
    x: 0, y: 0,
  });

  buttoncontrol = new Kinetic.Image({
    image: images.button,
    x: 100, y: 305,
  });

  buttoncredit = new Kinetic.Image({
    image: images.button,
    x: 100, y: 230,
  });

  buttonstart = new Kinetic.Image({
    image: images.button,
    x: 100, y: 155,
  });

  buttonwhat  = new Kinetic.Image({
    image: images.button,
    x: 100, y: 380,
  });

  whatbtext  = new Kinetic.Image({
    image: images.WhatisButton,
    x: 105, y: 390,
  });
  
  startbtext= new Kinetic.Image({
    image: images.StartButton,
    x: 145, y: 165,
  });

  creditbtext= new Kinetic.Image({
    image: images.CreditsButton,
    x: 140, y: 235,
  });

  controlsbtext= new Kinetic.Image({
    image: images.ControlsButton,
    x: 110, y: 315,
  });
}

function LoadMainMenu()
{

  buttoncontrol.on('click', function(){ 
                CurrentScreen = 1;
  });
  
  controlsbtext.on('click', function(){ 
                CurrentScreen = 1;
  });


  buttonstart.on('click', function(){
           //     ResetGameVariables();
                CurrentScreen = 3;
  });

  startbtext.on('click', function(){
            //    ResetGameVariables();
                CurrentScreen = 3;
  });


  buttoncredit.on('click', function(){ 
                CurrentScreen = 2;
  });
  creditbtext.on('click', function(){ 
                CurrentScreen = 2;
  }); 

  buttonwhat.on('click', function(){ 
                CurrentScreen = 5;
  });
  whatbtext.on('click', function(){ 
                CurrentScreen = 5;
  }); 
}

function InitializeBackGround()
{
  RenderBackGround();
}

function RenderBackGround()
{
  periphery = new Kinetic.Image({
    image: images.PeripheryDefault,
    x: 0, y: 0,
  });

  whitescreen = new Kinetic.Image({
    image: images.WhiteScreen,
    x: 0, y: 0,
    opacity: 0,
  });
}

function InitializeGarden()
{
  RenderGardenBox();
  LoadGardenBox();

  RenderGardenStage();
  LoadGardenStage();
}

function RenderGardenBox()
{

 gardenboxS = new Kinetic.Image({
    image: images.GardenBox_Small,
    opacity: 1,
    x: 10, y: 10,
  });

  gardenboxM = new Kinetic.Image({
    image: images.GardenBox_Medium,
    opacity: 0,
    x: 10, y: 10,
  });

   gardenboxL = new Kinetic.Image({
    image: images.GardenBox_Large,
    opacity: 0,
    x: 10, y: 10,
  });
}

function LoadGardenBox ()
{
    gardenboxes[0] = gardenboxS;
    gardenboxes[1] = gardenboxM;
    gardenboxes[2] = gardenboxL;
}

function RenderGardenStage()
{
    gardenstage = new Kinetic.Sprite(
    {
      x: 0,
      y: 0,
      opacity: 1,
      image: images.Stage1_GardenStageSpriteSheet,
      animation: 'idle',
      animations: {
      idle: [
        0,962,721,481
      ],
      soaked: [
        0,1924,721,481
      ],
      dry:[
        0,0,721,481
      ],
      soaking:
      [
        0,962,721,481,
        721,962,721,481,
        1442,962,721,481,
        2163,962,721,481,
        2884,962,721,481,
        0,1443,721,481,
        721,1443,721,481,
        1442,1443,721,481,
        2163,1443,721,481,
        2884,1443,721,481,
        0,1924,721,481
      ],
      drying:
      [
        0,962,721,481,
        2884,481,721,481,
        2163,481,721,481,
        1442,481,721,481,
        721,481,721,481,        
        0,481,721,481,
        2884,0,721,481,
        2163,0,721,481,        
        1442,0,721,481,
        721,0,721,481,
        0,0,721,481
      ],
      revdrying:
      [
        0,0,721,481,
        721,0,721,481,
        1442,0,721,481,
        2163,0,721,481,
        2884,0,721,481,
        0,481,721,481,
        721,481,721,481,
        1442,481,721,481,
        2163,481,721,481,
        2884,481,721,481,
        0,962,721,481
      ],
      revsoaking:
      [
        0,1924,721,481,
        2884,1443,721,481,
        2163,1443,721,481,
        1442,1443,721,481,
        721,1443,721,481,        
        0,1443,721,481,        
        2884,962,721,481,
        2163,962,721,481,
        1442,962,721,481,
        721,962,721,481,
        0,962,721,481
      ]
      },
      frameRate: 5,
      frameIndex: 0,
    });

    gardenstage2 = new Kinetic.Sprite(
    {
      x: 0,
      y: 0,
      opacity: 0,
      image: images.Stage2_GardenStageSpriteSheet,
      animation: 'idle',
      animations: {
      idle: [
        0,960,720,480
      ],
      soaked: [
        0,1920,720,480
      ],
      dry:[
        0,0,720,480
      ],
      soaking:
      [
        0,960,720,480,
        720,960,720,480,
        1440,960,720,480,
        2160,960,720,480,
        2880,960,720,480,
        0,1440,720,480,
        720,1440,720,480,
        1440,1440,720,480,
        2160,1440,720,480,
        2880,1440,720,480,
        0,1920,720,480
      ],
      drying:
      [
        0,960,720,480,
        2880,480,720,480,
        2160,480,720,480,
        1440,480,720,480,
        720,480,720,480,        
        0,480,720,480,
        2880,0,720,480,
        2160,0,720,480,        
        1440,0,720,480,
        720,0,720,480,
        0,0,720,480
      ],
      revdrying:
      [
        0,0,720,480,
        720,0,720,480,
        1440,0,720,480,
        2160,0,720,480,
        2880,0,720,480,
        0,480,720,480,
        720,480,720,480,
        1440,480,720,480,
        2160,480,720,480,
        2880,480,720,480,
        0,960,720,480
      ],
      revsoaking:
      [
        0,1920,720,480,
        2880,1440,720,480,
        2160,1440,720,480,
        1440,1440,720,480,
        720,1440,720,480,        
        0,1440,720,480,        
        2880,960,720,480,
        2160,960,720,480,
        1440,960,720,480,
        720,960,720,480,
        0,960,720,480
      ]
      },
      frameRate: 5,
      frameIndex: 0,
    });

    gardenstage3 = new Kinetic.Sprite(
    {
      x: 0,
      y: 0,
      opacity: 0,
      image: images.Stage3_GardenStageSpriteSheet,
      animation: 'idle',
      animations: {
      idle: [
        0,962,720,481
      ],
      soaked: [
        0,1924,720,481
      ],
      dry:[
        0,0,720,481
      ],
      soaking:
      [
        0,962,720,481,
        720,962,720,481,
        1440,962,720,481,
        2160,962,720,481,
        2880,962,720,481,
        0,1443,720,481,
        720,1443,720,481,
        1440,1443,720,481,
        2160,1443,720,481,
        2880,1443,720,481,
        0,1924,720,481
      ],
      drying:
      [
        0,962,720,481,
        2880,481,720,481,
        2160,481,720,481,
        1440,481,720,481,
        720,481,720,481,        
        0,481,720,481,
        2880,0,720,481,
        2160,0,720,481,        
        1440,0,720,481,
        720,0,720,481,
        0,0,720,481
      ],
      revdrying:
      [
        0,0,720,481,
        720,0,720,481,
        1440,0,720,481,
        2160,0,720,481,
        2880,0,720,481,
        0,481,720,481,
        720,481,720,481,
        1440,481,720,481,
        2160,481,720,481,
        2880,481,720,481,
        0,962,720,481
      ],
      revsoaking:
      [
        0,1924,720,481,
        2880,1443,720,481,
        2160,1443,720,481,
        1440,1443,720,481,
        720,1443,720,481,        
        0,1443,720,481,        
        2880,962,720,481,
        2160,962,720,481,
        1440,962,720,481,
        720,962,720,481,
        0,962,720,481
      ]
      },

      frameRate: 5,
      frameIndex: 0,
    });
}

function LoadGardenStage()
{
  gardenstage.on('frameIndexChange', function(evt) 
  {
    var frameCount = this.frameIndex();
    
    if (frameCount == 10)
    {
      this.stop(); 

      switch( this.animation())
      {
        case "soaking":
          this.animation("soaked");
          break;
        case "drying":
          this.animation("dry");
          break;
        case "revdrying":
        case "revsoaking":
          this.animation("idle");
          break;
      }
      this.start(); 
    }

    if (frameCount == 0)
    {
      switch( this.animation())
      {
        case "soaked":
        case "dry":
        case "idle":
          this.stop();
        break;
      }
    }
  });

  gardenstage2.on('frameIndexChange', function(evt) 
  {
    var frameCount = this.frameIndex();
    
    if (frameCount == 10)
    {
      this.stop(); 

      switch( this.animation())
      {
        case "soaking":
          this.animation("soaked");
          break;
        case "drying":
          this.animation("dry");
          break;
        case "revdrying":
        case "revsoaking":
          this.animation("idle");
          break;
      }
      this.start(); 
    }

    if (frameCount == 0)
    {
      switch( this.animation())
      {
        case "soaked":
        case "dry":
        case "idle":
          this.stop();
        break;
      }
    }
  });

  gardenstage3.on('frameIndexChange', function(evt) 
  {
    var frameCount = this.frameIndex();
    
    if (frameCount == 10)
    {
      this.stop(); 

      switch( this.animation())
      {
        case "soaking":
          this.animation("soaked");
          break;
        case "drying":
          this.animation("dry");
          break;
        case "revdrying":
        case "revsoaking":
          this.animation("idle");
          break;
      }
      this.start(); 
    }

    if (frameCount == 0)
    {
      switch( this.animation())
      {
        case "soaked":
        case "dry":
        case "idle":
          this.stop();
        break;
      }
    }
  });


  gardens[0] = gardenstage;
  gardens[1] = gardenstage2;
  gardens[2] = gardenstage3;
}

function InitializeWeeds ()
{
  var i, x, y;

  ShuffleWeedSelection();
  
  for (i =0; i<weednum; i++)
  {
   
   switch (i)
   {
      case 0:
      x = 250;
      y = 75;
      break;

      case 1:
      x = 200;
      y = 150;
      break;

      case 2:
      x = 250;
      y = 225; 
      break;

      case 3:
      x = 425;
      y = 75; 
      break;

      case 4:
      x = 475;
      y = 150; 
      break;

      case 5:
      x = 425;
      y = 225; 
      break;
   }

    var WeedSprt = RenderWeeds(i,x,y);
    LoadWeeds(i,x,y,WeedSprt);
  }
}

function ShuffleWeedSelection()
{
  //////////////////Shuffle The Weed Select Array to add some randomness to the weed decay
  for (var i = 0; i < weednum; i++) {
      weedselect[i] = i;
  }

  var tmp, current, top = weednum;
  while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = weedselect[current];
    weedselect[current] = weedselect[top];
    weedselect[top] = tmp;
  }
  /////////////////////////////////////////////////////////////////////////////////////////
}

function RenderWeeds(i,x,y)
{

    Weeds[i] = new Kinetic.Group({
        x: x,
        y: y,
        draggable: true,
        orgPos: [x,y],
        dragBoundFunc: function(pos) {
          if (this.get('Sprite')[0].hp >= 5)
          {
            var Org = this.attrs.orgPos;
            var radius = 5;
            var scale = radius / Math.sqrt(Math.pow(pos.x - Org[0], 2) + Math.pow(pos.y - Org[1], 2));

             if(scale < 1)
             {
               return {
                 y: Math.round((pos.y - Org[1]) * scale + Org[1]),
                 x: Math.round((pos.x - Org[0]) * scale + Org[0])
                };
             }
          }

          return pos;
        }
    }); 

    var WeedSprt = new Kinetic.Sprite(
    {
      image: images.WeedSpriteSheet,
      animation: 'idle',
      animations: {
      idle: [
        498,309,80,70,
      ],
      dead: [
        72,28,80,70,
      ],
      bloom:[
        72,735,80,70,
      ],
      grow:
      [
        498,309,80,70,
        712,309,80,70,
        72,451,80,70,
        285,451,80,70,
        498,451,80,70,
        712,451,80,70,

        72,593,80,70,
        285,593,80,70,
        498,593,80,70,
        712,593,80,70,
        72,735,80,70,
      ],
      revgrow:
      [
        72,735,80,70,
        712,593,80,70,
        498,593,80,70,
        285,593,80,70,
        72,593,80,70,
        
        712,451,80,70,
        498,451,80,70,  
        285,451,80,70,
        72,451,80,70,
        712,309,80,70,
        498,309,80,70,
      ],
      decay:
      [
        498,309,80,70,
        285,309,80,70,
        72,309,80,70,
        712,167,80,70,
        498,167,80,70,
        285,167,80,70,
        72,167,80,70,
        712,28,80,70,
        498,28,80,70,
        285,28,80,70,
        72,28,80,70,
      ],
      revdecay:
      [
        72,28,80,70,
        285,28,80,70,
        498,28,80,70,
        712,28,80,70,
        72,167,80,70,
        285,167,80,70,
        498,167,80,70,
        712,167,80,70,
        72,309,80,70,
        285,309,80,70,
        498,309,80,70,
      ]
      },
      frameRate: 15,
      frameIndex: 0,
    });
  
    return WeedSprt;
}

function LoadWeeds(i,x,y,WeedSprt)
{
    WeedSprt.on('frameIndexChange', function(evt) 
    {
        var frameCount = this.frameIndex();
        
        if (frameCount == 10)
        {
          this.stop(); 

          switch( this.animation())
          {
            case "grow":
              this.animation("bloom");
              break;
            case "decay":
              this.animation("dead");
              break;
            case "revgrow":
            case "revdecay":
              this.animation("idle");
              break;
          }
          this.start(); 
        }

        if (frameCount == 0)
        {
          switch( this.animation())
          {
            case "bloom":
            case "dead":
            case "idle":
              this.stop();
            break;
          }
        }
    });

    WeedSprt.hp = 5;
    WeedSprt.deltahp = 5;
    WeedSprt.status = 'alive';
    Weeds[i].add(WeedSprt);

    Weeds[i].on('dragend', function() 
    {
        if(this.get('Sprite')[0].hp <= 0)
        {
          ChangeWeedStatus(this.get('Sprite')[0],'hidden');
          OnRemoveWeed();
        }
    });

    Weeds[i].on('mouseclick mousedown dragmove mouseover mouseenter mousemove', function() {
      $("div").css('cursor','url(img/Cursor/glove_grab.png),auto');
    });

    Weeds[i].on('dragstart', function() {                    
        $("div").css('cursor','url(img/Cursor/glove_grab.png),auto');
      
        var broswer = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    
        if (broswer)
        {    
          audioFiles.plantRip.pause();
          audioFiles.plantRip.currentTime = 0;
          audioFiles.plantRip.play();
        }
    });

    Weeds[i].on('mouseout dragend', function() {                    
      $("div").css('cursor','url(img/Cursor/glove_idle.png),auto');
    });
}

function InitializeFlower()
{
  RenderFlower();
  LoadFlower();
}

function RenderFlower()
{
    flowerstage1 = new Kinetic.Sprite(
    {
      x: 100,
      y: 50,
      opacity: 1,
      image: images.Stage1_FlowerSpriteSheet,
      animation: 'idle',
      animations: {
      idle: [
        0,365,547,365
      ],
      soaked: [
        0,710,531,355,
      ],
      dry:[
        0,0,531,355
      ],
      soaking:
      [
        0,355,531,355,
        531,355,531,355,
        1062,355,531,355,
        0,710,531,355
      ],
      drying:
      [
        0,355,531,355,
        1062,0,531,355,
        531,0,531,355,
        0,0,531,355
      ],
      revdrying:
      [
        0,0,531,355,
        531,0,531,355,
        1062,0,531,355,
        0,355,531,355
      ],
      revsoaking:
      [
        0,710,531,355,
        1062,355,531,355,
        531,355,531,355,
        0,355,531,355
      ]
      },
      frameRate: 5,
      frameIndex: 0,
    });

    flowerstage2 = new Kinetic.Sprite(
    {
      x: 100,
      y: 50,
      opacity: 0,
      image: images.Stage2_FlowerSpriteSheet,
      animation: 'idle',
      animations: {
      idle: [
        0,365,547,365
      ],
      soaked: [
        0,710,531,355,
      ],
      dry:[
        0,0,531,355
      ],
      soaking:
      [
        0,355,531,355,
        531,355,531,355,
        1062,355,531,355,
        0,710,531,355
      ],
      drying:
      [
        0,355,531,355,
        1062,0,531,355,
        531,0,531,355,
        0,0,531,355
      ],
      revdrying:
      [
        0,0,531,355,
        531,0,531,355,
        1062,0,531,355,
        0,355,531,355
      ],
      revsoaking:
      [
        0,710,531,355,
        1062,355,531,355,
        531,355,531,355,
        0,355,531,355
      ]
      },
      frameRate: 5,
      frameIndex: 0,
    });

    flowerstage3 = new Kinetic.Sprite(
    {
      x: 100,
      y: 50,
      opacity: 0,
      image: images.Stage3_FlowerSpriteSheet,
      animation: 'idle',
      animations: {
      idle: [
        0,361,541,361,
      ],
      soaked: [
        0,722,541,361,
      ],
      dry:[
        0,0,541,361,
      ],
      soaking:
      [
        0,361,541,361,
        541,361,541,361,
        1082,361,541,361,
        0,722,541,361
      ],
      drying:
      [
        0,361,541,361,
        1082,0,541,361,
        541,0,541,361,
        0,0,541,361
      ],
      revdrying:
      [
        0,0,541,361,
        541,0,541,361,
        1082,0,541,361,
        0,361,541,361
      ],
      revsoaking:
      [
        0,722,541,361,
        1082,361,541,361,
        541,361,541,361,
        0,361,541,361,
      ]
      },
      frameRate: 5,
      frameIndex: 0,
    });
}

function LoadFlower()
{
    flowerstage1.on('frameIndexChange', function(evt) 
    {
        var frameCount = this.frameIndex();
        
        if (frameCount == 3)
        {
          this.stop(); 

          switch( this.animation())
          {
            case "soaking":
              this.animation("soaked");
              break;
            case "drying":
              this.animation("dry");
              break;
            case "revdrying":
            case "revsoaking":
              this.animation("idle");
              break;
          }
          this.start(); 
        }

        if (frameCount == 0)
        {
          switch( this.animation())
          {
            case "soaked":
            case "dry":
            case "idle":
              this.stop();
            break;
          }
        }
    });

    flowerstage2.on('frameIndexChange', function(evt) 
    {
        var frameCount = this.frameIndex();
        
        if (frameCount == 3)
        {
          this.stop(); 

          switch( this.animation())
          {
            case "soaking":
              this.animation("soaked");
              break;
            case "drying":
              this.animation("dry");
              break;
            case "revdrying":
            case "revsoaking":
              this.animation("idle");
              break;
          }
          this.start(); 
        }

        if (frameCount == 0)
        {
          switch( this.animation())
          {
            case "soaked":
            case "dry":
            case "idle":
              this.stop();
            break;
          }
        }
    });

    flowerstage3.on('frameIndexChange', function(evt) 
    {
        var frameCount = this.frameIndex();
        
        if (frameCount == 3)
        {
          this.stop(); 

          switch( this.animation())
          {
            case "soaking":
              this.animation("soaked");
              break;
            case "drying":
              this.animation("dry");
              break;
            case "revdrying":
            case "revsoaking":
              this.animation("idle");
              break;
          }
          this.start(); 
        }

        if (frameCount == 0)
        {
          switch( this.animation())
          {
            case "soaked":
            case "dry":
            case "idle":
              this.stop();
            break;
          }
        }
    });

    flowers[0] = flowerstage1;
    flowers[1] = flowerstage2;
    flowers[2] = flowerstage3;
}

function InitializeHUD()
{
  RenderHUD();
  LoadHUD();
}

function RenderHUD()
{
  satDial = new Kinetic.Image({
    image: images.SaturationDial,
    x: 17, y: 350,
  });
  satNeedle = new Kinetic.Image({
    image: images.SaturationNeedle,
    x: 91, y: 417,
    offset: {x:42, y:35}
  });
  water = new Kinetic.Image({
    image: images.WaterCan_idle,
    x: 535, y: 370,
    width: 148, height:99
  });
  hud = new Kinetic.Image({
    image: images.HUDbar,
    x: 0, y: 342,
  });
}

function LoadHUD()
{
  satNeedle.setRotationDeg(180);
  satNeedle.hide();
  satDial.hide();


  water.on ('click mousedown', function(evt) 
  {
    water.setImage(images.WaterCan_water);

    var broswer = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    
    if (broswer)
    {
      audioFiles.waterSplash.pause();
      audioFiles.waterSplash.currentTime = 0;
      audioFiles.waterSplash.play();
    }

    temperature += 7;

    if (temperature >= 100)
      temperature = 100;

    if (maxslugs != slugsAlive)
    {
      if (maxslugs > slugsAlive)
      {
        for (i = 0; i< slugsnum; i++)
        {

          if (slugs[i].status == 'dead')
          {
            slugs[i].setOpacity(1);
            slugs[i].status = 'alive';
            slugsAlive ++;
            killedslugs --;

            if (slugsAlive == maxslugs)
              break;
          }
        }
      }
    }
    
    addwater = true;

  });


  water.on ('mouseup mouseout', function(evt) {
    water.setImage(images.WaterCan_idle);
    addwater = false;
  });
}

function InitializeMainMenuLayer()
{ 
  MainMenuScreen.add(mainmenu);
  MainMenuScreen.add(buttonstart);
  MainMenuScreen.add(buttoncredit);
  MainMenuScreen.add(buttoncontrol);
  MainMenuScreen.add(buttonwhat);

  MainMenuScreen.add(startbtext);
  MainMenuScreen.add(creditbtext);
  MainMenuScreen.add(controlsbtext);
  MainMenuScreen.add(whatbtext);

  stage.add(MainMenuScreen);
    MainMenuScreen.hide();
}

function InitializeControlsLayer()
{
  ControlsScreen.add(controls);
  ControlsScreen.add(backbuttoncontrols);

  stage.add(ControlsScreen);
  ControlsScreen.hide();
}

function InitializeCreditLayer()
{

  CreditsScreen.add(credits);
  CreditsScreen.add(backbuttoncredits);
  stage.add(CreditsScreen);
  CreditsScreen.hide();
}

function InitializeGameLayer()
{
  GameScreen.add(periphery);

  GameScreen.add(gardenstage);
  GameScreen.add(gardenstage2);
  GameScreen.add(gardenstage3);
  
  GameScreen.add(gardenboxS);
  GameScreen.add(gardenboxM);
  GameScreen.add(gardenboxL);

  GameScreen.add(flowerstage1);
  GameScreen.add(flowerstage2);
  GameScreen.add(flowerstage3);

  for (i=0; i < weednum; i++)
      GameScreen.add(Weeds[i]);
  
  for (i=0; i < slugsnum; i++)
      GameScreen.add(slugs[i]);
  
  GameScreen.add(hud);
  GameScreen.add(satDial);
  GameScreen.add(satNeedle);
  GameScreen.add(water);

  GameScreen.add(whitescreen);
  whitescreen.hide();

   stage.add(GameScreen);
   GameScreen.hide();
}

function InitializeIntroLayer()
{
  IntroScreen.add(intro);

  IntroScreen.add(introtext1);
  IntroScreen.add(introtext2);
  IntroScreen.add(introtext3);

  stage.add(IntroScreen);
  IntroScreen.hide();
}

function InitializeWhatisLayer()
{
  WhatisScreen.add(whatisit);
  WhatisScreen.add(backbuttonwhat);

  stage.add(WhatisScreen);
  WhatisScreen.hide();
}

function InitializeOverlayLayer()
{
  
  OverlayScreen.add(ovrstage1to2);
  OverlayScreen.add(ovrstage2to3);
  OverlayScreen.add(ovrstage2to1);

  OverlayScreen.add(ovrstage1to2text);
  OverlayScreen.add(ovrstage2to3text);
  OverlayScreen.add(ovrstage2to1text);
  OverlayScreen.add(ovrstage3to2text);

  stage.add(OverlayScreen);
  OverlayScreen.hide();
}

function InitializeLose()
{
    RenderLose();
    LoadLose();
}

function RenderLose()
{
    backlifebuttonlose  = new Kinetic.Image({
    image: images.button,
    x: 150, y: 250
    });

    backlifetextlose  = new Kinetic.Image({
    image: images.BacktolifeButton,
    x: 155, y: 265
    });

    perfectionback = new Kinetic.Image({
      image: images.perfection,
      x: 0, y: 0,      
    });

    perfectionto3text= new Kinetic.Image({
      image: images.perfectionto3text,
      x: 0, y: 0,      
    });

    perfectiontext= new Kinetic.Image({
      image: images.perfectiontext,
      x: 0, y: 0,      
    });
}

function LoadLose()
{

    backlifetextlose.on('click', function(){

        if (!perfection)
        {
          voiceovers[4].pause();
          voiceovers[4].currentTime = 0;     
        }
        else
        {
          voiceovers[5].pause();
          voiceovers[5].currentTime = 0;
        }

        activeoverlay = false;
        CurrentScreen = 4;

        if (currstage == 3)
        {
          perfection = true;
          currstage = 2;

          weedkilled--;

          if (weedkilled > weednum)
            weedkilled = weednum-1;

          if (weedkilled< 0)
            weedkilled = 0;

          if (Weeds[weedselect[weedkilled]].get('Sprite')[0].status == 'hidden')
          {
            Weeds[weedselect[weedkilled]].get('Sprite')[0].hp = 5;
            deadweedcount--;
            ChangeWeedStatus(Weeds[weedselect[weedkilled]].get('Sprite')[0], 'alive');
          }
        }
                
    });
}

function InitializeWin()
{
    RenderWin();
    LoadWin();
}
function RenderWin()
{
  WinBack = new Kinetic.Image({
    image: images.winbackground,
    x: 0, y: 0
  });

  WinFlower = new Kinetic.Image({
    image: images.winflower,
    x: 0, y: 0
  });

  WinText = new Kinetic.Image({
    image: images.wintext,
    x:0, y:0

  });

  WinBox = new Kinetic.Image({
    image: images.winbox,
    x: 0, y: 0,
  });

  Winwhatisbutton  = new Kinetic.Image({
    image: images.button,
    x: 250, y: 390,
  });

  winwhatistext  = new Kinetic.Image({
    image: images.WhatisButton,
    x: 255, y: 400,
  });

  winwhitescreen = new Kinetic.Image({
    image: images.WhiteScreen,
    x: 0, y: 0,
    opacity: 1,
  });
}

function LoadWin()
{
  InitializeWinInsects();

  Winwhatisbutton.on('click', function(){ 
                CurrentScreen = 5;
  });
  winwhatistext.on('click', function(){ 
                CurrentScreen = 5;
  });

}

function InitializeWinInsects()
{

  for (i = 0; i< butterfliesnum; i++)
  {
    
    butterflies[i] = new Kinetic.Sprite(
    {
      x: i * 50,
      y: i *27,
      image: images.butterflyspritesheet,
      animation: 'fly',
      animations: {
      fly: [
        0,0,157,144,
        157,0,157,144,
        314,0,157,144,
        471,0,157,144,
        628,0,157,144,
        785,0,157,144,

        0,144,157,144,
        157,144,157,144,
        314,144,157,144,
        471,144,157,144,
        628,144,157,144,
        785,144,157,144,

        0,288,157,144,
        157,288,157,144,
        314,288,157,144,
        471,288,157,144,
        628,288,157,144,
        785,288,157,144,
        

      ]},
      frameRate: 22,
      frameIndex: 0,
    });

     butterflies[i].moving = 0;
     butterflies[i].animation('fly');
     butterflies[i].start();
  }

  for (i = 0; i< mothsnum; i++)
  {
  
    moths[i] = new Kinetic.Sprite(
    {
      x: i * 100,
      y: i *44,
      image: images.mothspritesheet,
      animation: 'fly',
      animations: {
      fly: [
        0,0,271,180,
        271,0,271,180,

        0,180,271,180,
        271,180,271,180,

        0,360,271,180,
        271,360,271,180,

        0,540,271,180,
        271,540,271,180,

        0,720,271,180,
        271,720,271,180,

        0,900,271,180,
        271,900,271,180,

        0,1080,271,180,
        271,1080,271,180,
      ]},
      frameRate: 16,
      frameIndex: 0,
    });
     
     moths[i].moving = 0;
     moths[i].animation('fly');
     moths[i].start();
  }
}

function InitializeWinLayer()
{
  WinScreen.add(WinBack);
  WinScreen.add(WinFlower);  
  WinScreen.add(WinBox);
  WinScreen.add(WinText);
  WinScreen.add(Winwhatisbutton);
  WinScreen.add(winwhatistext);


  for (i=0; i< butterfliesnum; ++i)
    WinScreen.add(butterflies[i]);

  for (i=0; i< mothsnum; ++i)
    WinScreen.add(moths[i]);
  
  WinScreen.add(winwhitescreen);
  
  stage.add(WinScreen);
  WinScreen.hide();
}

function InitializeLoseLayer()
{
  LoseScreen.add(perfectionback);
  LoseScreen.add(perfectiontext);
  LoseScreen.add(perfectionto3text);
  LoseScreen.add(backlifebuttonlose);
  LoseScreen.add(backlifetextlose);
  

  stage.add(LoseScreen);
  LoseScreen.hide();
}

function LoadLayers()
{

  InitializeGameLayer();
  InitializeMainMenuLayer();
  InitializeControlsLayer();
  InitializeCreditLayer();
  InitializeIntroLayer();
  InitializeWhatisLayer();
  InitializeOverlayLayer();
  InitializeWinLayer();
  InitializeLoseLayer();

}

function LoadAssets()
{
  loadSound(audiosources);
  loadImages(sources);
}

LoadAssets();

