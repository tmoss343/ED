function RunGame()
{
	Update();
	Draw();
}

function Update()
{
	HideScreens();

	switch(CurrentScreen)
	{
		case 0: //startScreen
		MainMenuScreen.show();
		UpdateMenuScreen();
		break;

		case 1: //Instructions
		ControlsScreen.show();
		UpdateControlsScreen();
		break;

		case 2: //CreditScreen
		CreditsScreen.show();
		UpdateCreditScreen();
		break;

		case 3: //IntroScreen
		IntroScreen.show();
		UpdateInroScreen();
		break;

		case 4: //GameScreen
		GameScreen.show();
		UpdateGameScreen();
		break;

		case 5:
		WhatisScreen.show();
		UpdateWhatisScreen();
		break;

		case 6: //WinScreen
		WinScreen.show();
		UpdateWinScreen();
		break;
				  
		case 7:
		LoseScreen.show();
		UpdateLoseScreen();
		break;

		case 8:
		OverlayScreen.show();
		UpdateOverlayScreen();
		break;
	}
}

function Draw()
{
	switch(CurrentScreen)
	{
		case 0: //startScreen
		MainMenuScreen.draw();
		break;

		case 1: //Instructions
		ControlsScreen.draw();
		break;

		case 2: //CreditScreen
		CreditsScreen.draw();
		break;

		case 3: //IntroScreen
		IntroScreen.draw();
		break;

		case 4: //GameScreen
		GameScreen.draw();
		break;

		case 5:
		WhatisScreen.draw();
		break;

		case 6: //WinScreen
		WinScreen.draw();
		break;
				  
		case 7: //LoseScreen
		LoseScreen.draw();
		break;

		case 8:
		OverlayScreen.draw();
		break;
	}
}

function HideScreens()
{
	GameScreen.hide();
	IntroScreen.hide();
	ControlsScreen.hide();
	MainMenuScreen.hide();
	CreditsScreen.hide();
	WhatisScreen.hide();
	WinScreen.hide();
	LoseScreen.hide();
	OverlayScreen.hide();
}

function UpdateMenuScreen(){}
function UpdateControlsScreen(){}
function UpdateCreditScreen(){}

function UpdateInroScreen()
{
	if (!gamestarted)
	{
		ChangeIntroText();
	}

	if (audioFiles.introvoice.currentTime >= introtime )
	{
		audioFiles.introvoice.pause();

		switch (introTextnum)
		{
			case 1:
			introtime = 9.2;
			break;

			case 2:
			introtime = 15;
			break;	
		}
	}

}

function UpdateGameScreen()
{
	if (!activeoverlay)
	{
		UpdateTemperature();
		UpdateHUD();
		UpdateScore();
		UpdateWeed();
		UpdateGarden();
		UpdateSlugs();
	}
}

function UpdateWhatisScreen(){}
function UpdateWinScreen()
{
	if (IsWinner)
	{
		ChangeButterflyMothPosition();
		winwhitescreen.tween = new Kinetic.Tween({
			node: winwhitescreen,
			opacity: 0,
			duration: 5,
				onFinish: function() 
				{
					winwhitescreen.hide();
				}
		});
		winwhitescreen.tween.play();
		IsWinner = false;			
	}
	for (i = 0; i< butterfliesnum; i++)
	{
		var nextX = (Math.floor(Math.random() * (720))) - 100 ;
        var nextY = (Math.floor(Math.random() * (480))) - 100;

		if (butterflies[i].moving == 0)
		{

			butterflies[i].tween = new Kinetic.Tween({
				node: butterflies[i],
				duration: 5,
				x: nextX,
				y: nextY,
				onFinish: function() {
				this.node.moving = 0;
				}
			});

			butterflies[i].tween.play();
			butterflies[i].moving = 1;
		}
	}

	for (i = 0; i< mothsnum; i++)
	{
		var nextX = (Math.floor(Math.random() * (720))) - 100;
        var nextY = (Math.floor(Math.random() * (480))) - 100;

		if (moths[i].moving == 0)
		{

			moths[i].tween = new Kinetic.Tween({
				node: moths[i],
				duration: 5,
				x: nextX,
				y: nextY,
				onFinish: function() {
				this.node.moving = 0;
				}
			});

			moths[i].tween.play();
			moths[i].moving = 1;
		}
	}
}
function UpdateLoseScreen()
{

}

function UpdateOverlayScreen()
{

}

function UpdateSlugs()
{
	for (i = 0; i< slugsnum; i++)
	{
		if (slugs[i].status == 'alive')
		{
			var nextX = leftbound + (Math.floor(Math.random() * rightbound ) );

			if (slugs[i].moving == 0)
			{
				slugs[i].setScaleX(1);
				var deltaX = nextX - slugs[i].getX();

				if (deltaX < 0)
					slugs[i].setScaleX(-1);

				slugs[i].tween = new Kinetic.Tween({
					node: slugs[i],
					duration: 15,
					x: nextX,
					onFinish: function() {
					this.node.moving = 0;
					}
				});

				slugs[i].tween.play();
				slugs[i].moving = 1;
			}
		}
	}

	ChangeSlugsAmount();
}

function ChangeSlugsAmount()
{
	if (temperature <= 5)
		maxslugs = 0;
	else if (temperature <= 10)
		maxslugs = 2;
	else if (temperature <= 25)
		maxslugs = 3;
	else if (temperature <= 40)
		maxslugs = 4;
	else if (temperature <= 55)
		maxslugs = 5;
	else if (temperature <= 70)
		maxslugs = 6;
	else if (temperature <= 85)
		maxslugs = 7;
	else if (temperature <= 100)
		maxslugs = 8;

	if (maxslugs != slugsAlive )
	{
	    if (maxslugs < slugsAlive)
        {
          for (i = 0; i< slugsnum; i++)
          {
            if (slugs[i].status == 'alive')
            {
              slugs[i].setOpacity(0);
              slugs[i].status = 'dead';
              slugsAlive --;
              killedslugs ++;

              if (slugsAlive == maxslugs)
                break;
            }
          }
        }
        else if (maxslugs > slugsAlive && slugsAlive > 1)
      	{
	        for (i = 0; i< slugsnum; i++)
	        {
	        	if (slugs[i].index != lastkilled)
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
	}

}

function UpdateTemperature()
{
	if (addwater)
		addwater = false;
	else
		water.setImage(images.WaterCan_idle);

	temperature -= 1;

	if (temperature <= 0)
	{
		temperature = 0;
	}
}

function UpdateHUD()
{
	UpdateDial();
}

function UpdateDial()
{
	//Formula used is DeltaAng = (RangeOfAnglesPerSector / RangeOfTemperaturePerSector ) * ChangeinTemp//////
	currangle = satNeedle.attrs.rotation;
	deltatemperature = prevtemperature - temperature; 
	
	if (deltatemperature != 0)
	{
		deltaangle = ((66.25) / 25 ) * deltatemperature;
		satNeedle.setRotationDeg( (currangle - deltaangle) );
		currangle = satNeedle.attrs.rotation;

		
		if (currangle < -(18.75) && currangle > -(85) )  //Dry Status
		{					
			ChangeCurrentStatus('dry');
		}
		else if (currangle < (47.5) && currangle > -(18.75)) //Neutral Status
		{
			ChangeCurrentStatus('ntl');
		}					
		else if ( currangle < (113.75) && currangle > (47.5) ) //Win Status
		{
			ChangeCurrentStatus('win');
		}
		else if ( currangle < (180)	&& currangle > (113.75) ) //wet status
		{
			ChangeCurrentStatus('wet');
		}			
	
		prevtemperature = temperature;
	}

	CheckShowDial();
}

function UpdateScore()
{

	if (currstatus == 'win')
	{

		//console.log("Stage: " + currstage);
		//console.log("LastOverlay: " + lastOverlaySequence);

		if (score < 100)
	   		score += scoreup;
	   	else 
	   		score = 100;

		if (score >= 30 && score < 60)
		{
			if (currstage == 2)
			{
				if (lastOverlaySequence != 3)
				{
					lastOverlaySequence = 3;
					
					//console.log("If Statement in");
					currdir = 'inper';
					ChangeCurrentStage();
					currstage = 1;
				}
			}
		}
		else if (score >=60 && score < 100)
		{
			if (currstage == 1)
			{
				if (lastOverlaySequence != 4)
				{
					scoreup = 0.75;
					currdir = 'inper';
					ChangeCurrentStage();
					lastOverlaySequence = 4;
					currstage = 0;
				}
			}
		}
		else if (score >= 100)
		{
			if (currstage == 0)
			{
				currdir = 'inper';
				currstage--;
				ShowOverlay(currstage,currdir);
			}
		}
	}
	else
	{
		if (score >= 0)
	   		score -= scoreup
	   	else
	   		score = 0;
	}
}

function UpdateWeed()
{
	//if we're in a winning state than rejuvinate the weed///
	var Hp;
	var DeltaHp;
	var currweed = weedkilled;

	if (currstatus == "win")
	{
		if (weedkilled == weednum)
		{
			currweed--;
		}	
		else if (weedkilled < 0)
		{
			weedkilled = weednum -1;
			currweed = weedkilled;
		}

		Hp = Weeds[ weedselect[currweed] ].get('Sprite')[0].hp;
		DeltaHp = Weeds[ weedselect[currweed] ].get('Sprite')[0].deltahp;

		if (DeltaHp > 10)
		{
			DeltaHp = 10;
			Weeds[weedselect[currweed]].get('Sprite')[0].hp = DeltaHp;
			Weeds[ weedselect[currweed] ].get('Sprite')[0].deltahp = DeltaHp;
			weedkilled --;
		}
		else
		{
			Weeds[ weedselect[currweed] ].get('Sprite')[0].deltahp += 0.5;

			if (DeltaHp == 5 && Hp == 0)
			{
				if (Weeds[ weedselect[currweed] ].get('Sprite')[0].status == 'hidden')
					deadweedcount--;

				Weeds[ weedselect[currweed] ].get('Sprite')[0].hp = DeltaHp;
				ChangeWeedStatus(Weeds[ weedselect[currweed] ].get('Sprite')[0], 'alive');				
				
			}
			else if (DeltaHp == 10 && Hp == 5)
			{
				Weeds[ weedselect[currweed] ].get('Sprite')[0].hp = DeltaHp;
				ChangeWeedStatus(Weeds[ weedselect[currweed] ].get('Sprite')[0], 'bloom');
			}
		}
	}
	else if (currweed != weednum)//if weed is marked for death then decay///
	{
		if (currstatus != 'wet')
		{
			if (weedkilled < 0)
			{
				weedkilled = weednum -1;
				currweed = weedkilled;
			}

			Hp = Weeds[ weedselect[currweed] ].get('Sprite')[0].hp;
			DeltaHp = Weeds[ weedselect[currweed] ].get('Sprite')[0].deltahp;

			if (DeltaHp < 0)
			{
				DeltaHp = 0;
				Weeds[weedselect[currweed]].get('Sprite')[0].hp = DeltaHp;
				Weeds[ weedselect[currweed] ].get('Sprite')[0].deltahp = DeltaHp;

				weedkilled++;
			}	
			else
			{
				Weeds[weedselect[currweed]].get('Sprite')[0].deltahp -= 0.5;
				
				if (DeltaHp <= 0 && Hp == 5)
				{
					DeltaHp = 0;
					Weeds[ weedselect[currweed]].get('Sprite')[0].deltahp = DeltaHp;
					Weeds[ weedselect[currweed]].get('Sprite')[0].hp = DeltaHp;
					ChangeWeedStatus(Weeds[weedselect[currweed]].get('Sprite')[0], 'dead');
					
					weedkilled++;
				}
				else if (DeltaHp == 5 && Hp == 10)
				{
					Weeds[ weedselect[currweed]].get('Sprite')[0].hp = DeltaHp;
					ChangeWeedStatus(Weeds[weedselect[currweed]].get('Sprite')[0], 'debloom');	
				}
			}
		}
	}
	else if (currweed == weednum)
	{
		weedkilled = 0;
		currweed = weedkilled;
	}	
}

function UpdateGarden()
{

}

function OnRemoveWeed()
{
	switch (deadweedcount)
	{
		case 1: //Stage 2//
		if (currstage == 0)
		{
			if (lastOverlaySequence != 1)
			{
				currdir = 'per';
				ChangeCurrentStage();
				lastOverlaySequence = 1;
			//	console.log("ADSASD");
			}
		}
		break;

		case 3: //Stage 3//
		if (currstage == 1)
		{
			if (lastOverlaySequence != 2)
			{
				currdir = 'per';
				ChangeCurrentStage();
				lastOverlaySequence = 2;
			//	console.log("ADSASD");	
			}
		}
		break;

		case 6://Perfection//
		if (currstage == 2)
		{
			currstage++;
			currdir = 'per';
			ShowOverlay(currstage,currdir);
			//console.log("ADSASD");
		}
		break;
	}
}

function CheckShowDial()
{
	if (perfection)
	{
		if (showDial != true)
		{
			satNeedle.show();
			satDial.show();
			showDial = true;
		}
	}
}

function ChangeWeedStatus(Weed, status)
{
	switch (status)
	{
		case "dead":
			if (Weed.status != 'dead')
			{
				Weed.animation('decay');
				Weed.start();
				Weed.status = 'dead';
			}
		break;
		
		case 'alive':
			if (Weed.status != 'alive')
			{
				Weed.animation('revdecay');
				Weed.start();
				Weed.status = 'alive';

				Weed.getParent().show();
				Weed.show();
				
			}
		break;

		case 'hidden':
			if (Weed.status != 'hidden')
			{
				deadweedcount++;
				Weed.getParent().setX(Weed.getParent().attrs.orgPos[0]);
				Weed.getParent().setY(Weed.getParent().attrs.orgPos[1]);	
				Weed.status = 'hidden';
				Weed.hide();
				Weed.getParent().hide();
			}
		break;
		
		case 'bloom':
			if (Weed.status != 'bloom')
			{
				Weed.animation('grow')
				Weed.start();

				Weed.status = 'bloom';
			}
			
		break;

		case 'debloom':

				Weed.animation('revgrow')
				Weed.start();

				Weed.status = 'alive';
		break;
	}
}

function ChangeCurrentStatus (status)
{
	switch (status)
	{
		case "dry":
			if (currstatus != 'dry')
			{
				gardenstage.animation('drying');
				gardenstage2.animation('drying');
				gardenstage3.animation('drying');
				gardenstage.start();
				gardenstage2.start();
				gardenstage3.start();
				
				flowerstage1.animation('drying');
				flowerstage2.animation('drying');
				flowerstage3.animation('drying');
				flowerstage1.start();
				flowerstage2.start();
				flowerstage3.start();
				currstatus = 'dry';
			}
		break;
		
		case 'wet':
			if (currstatus != 'wet')
			{
				gardenstage.animation('soaking');
				gardenstage2.animation('soaking');
				gardenstage3.animation('soaking');
				gardenstage.start();
				gardenstage2.start();
				gardenstage3.start();
				
				flowerstage1.animation('soaking');
				flowerstage2.animation('soaking');
				flowerstage3.animation('soaking');

				flowerstage1.start();
				flowerstage2.start();
				flowerstage3.start();
				currstatus = 'wet';
			}
		break;

		case 'ntl':
			if (currstatus == 'dry')
			{
				gardenstage.animation('revdrying');
				gardenstage2.animation('revdrying');
				gardenstage3.animation('revdrying');
				gardenstage.start();
				gardenstage2.start();
				gardenstage3.start();
				
				flowerstage1.animation('revdrying');
				flowerstage2.animation('revdrying');
				flowerstage3.animation('revdrying');
				flowerstage1.start();
				flowerstage2.start();
				flowerstage3.start();
			}
			currstatus = 'ntl';
		break;

		case 'win':
			if (currstatus != 'win' && currstatus == 'wet')
			{
				gardenstage.animation('revsoaking');
				gardenstage2.animation('revsoaking');
				gardenstage3.animation('revsoaking');
				gardenstage.start();
				gardenstage2.start();
				gardenstage3.start();

				flowerstage1.animation('revsoaking');
				flowerstage2.animation('revsoaking');
				flowerstage3.animation('revsoaking');

				flowerstage1.start();
				flowerstage2.start();
				flowerstage3.start();

				currstatus = 'win';
			}
			else if (currstatus != 'win')
			{
				currstatus = 'win';
			}
		break;
	}
}

function ChangeCurrentStage()
{
	switch (currdir)
	{
		case 'per':
		if (currstage < 2)
		{	
			var TweenGardenHide	= new Kinetic.Tween({
					node: gardens[currstage],
					opacity: 0,
					duration: 1
			});
			var TweenBoxHide = new Kinetic.Tween({
					node: gardenboxes[currstage],
					opacity: 0,
    				duration: 1
			});
			var TweenFlowerHide = new Kinetic.Tween({
					node: flowers[currstage],
					opacity: 0,
    				duration: 1
			});

			TweenGardenHide.play();
			TweenBoxHide.play();
			TweenFlowerHide.play();
			
			//console.log("PERFECTION ++ " + currstage);
			currstage++;

			var TweenGardenShow	= new Kinetic.Tween({
					node: gardens[currstage],
					opacity: 1,
					duration: 1
  			});
  			var TweenBoxShow = new Kinetic.Tween({
					node: gardenboxes[currstage],
					opacity: 1,
    				duration: 1
  			});
  			var TweenFlowerShow = new Kinetic.Tween({
					node: flowers[currstage],
					opacity: 1,
    				duration: 1,
    				onFinish: function(){
    					currdir = 'per';
    					ShowOverlay(currstage,currdir);
    				}
			});

			TweenGardenShow.play();
			TweenBoxShow.play();
			TweenFlowerShow.play();

		}
		break;

		case 'inper':
		if (currstage > 0)
		{
			var TweenGardenHide	= new Kinetic.Tween({
					node: gardens[currstage],
					opacity: 0,
					duration: 1
			});
			var TweenBoxHide = new Kinetic.Tween({
					node: gardenboxes[currstage],
					opacity: 0,
    				duration: 1
			});
			var TweenFlowerHide = new Kinetic.Tween({
					node: flowers[currstage],
					opacity: 0,
    				duration: 1,
			});

			TweenGardenHide.play();
			TweenBoxHide.play();
			TweenFlowerHide.play();


			//console.log("Pre - Stage: " + currstage);
			if (currstage == 1)
				currstage = 0;
			if (currstage == 2)
				currstage = 1;
			if (currstage == 3)
				currstage = 2;
			//console.log("Post - Stage: " + currstage);

			//currstage--;

			var TweenGardenShow	= new Kinetic.Tween({
					node: gardens[currstage],
					opacity: 1,
					duration: 1
  			});
  			var TweenBoxShow = new Kinetic.Tween({
					node: gardenboxes[currstage],
					opacity: 1,
    				duration: 1
  			});
  			var TweenFlowerShow = new Kinetic.Tween({
					node: flowers[currstage],
					opacity: 1,
    				duration: 1,
    				onFinish: function(){
    					currdir = 'inper';
    				//	console.log("OnFinish - Pre - Stage: " + currstage);
    					ShowOverlay(currstage,currdir);
    					//console.log("OnFinish - Post - Stage: " + currstage);
    				}
			});

  			

  			//console.log("-----");
  			//console.log("-----");
			TweenGardenShow.play();
			TweenBoxShow.play();
			TweenFlowerShow.play();
		}
		break;

	}
}

function ShowOverlay(overlaytext, overlayback)
{
	HideAllOverlays();

	switch(overlaytext)
	{
		case -1:
			if(overlayback == 'inper')
			{
				whitescreen.show();
				whitescreen.tween = new Kinetic.Tween({
				node: whitescreen,
				opacity: 1,
				duration: 5,
					onFinish: function() 
					{
						IsWinner = true;
						ReloadGame = true;
						CurrentScreen = 6;
					}
				});
				
				whitescreen.tween.play();
				activeoverlay = true;

				return;
			}
		break;
		case 0:

			OverlayTexts[0].show();
			ovrstage1to2.show();
			currvoice = 0;
		
			if (overlayback == 'inper')
			{
				gotosecondscreen = true;
			}
		break;
		case 1:
			if (overlayback == 'per')
			{
				OverlayTexts[0].show();
				ovrstage1to2.show();
				currvoice = 0;
			}
			if (overlayback == 'inper')
			{ 	
				OverlayTexts[1].show();
				ovrstage2to3.show();
				currvoice = 1;
				gotosecondscreen = true;
			}
		break;

		case 2:

			OverlayTexts[1].show();
			ovrstage2to3.show();
			currvoice = 1;

			if (overlayback == 'inper')
				gotosecondscreen = true;
		break;

		case 3:
			if ( overlayback == 'per' )
			{
				if (!perfection)
				{
					perfectionto3text.hide();
					perfectiontext.show();
					voiceovers[4].play();
				}
				else
				{
					perfectionto3text.show();
					perfectiontext.hide();
					voiceovers[5].play();
				}

				activeoverlay = true;
				CurrentScreen = 7;
				return;
			}
		break;
	}

	activeoverlay = true;
	CurrentScreen = 8;	
	StartOverlayVoiceOver();

	//overlaytimer = setInterval(function(){UpdateOverlay();}, 5000);
}
function ChangeButterflyMothPosition()
{
	for (i = 0; i< butterfliesnum; ++i)
	{
		butterflies[i].x = slugs[i].x;
		butterflies[i].y = slugs[i].y;

		moths[i].x = slugs[i].x;
		moths[i].y = slugs[i].y;
	}
}
function getSecondScreen()
{
	HideAllOverlays();

	if (score >= 30 && score < 60)
	{
			OverlayTexts[2].show();
			ovrstage2to3.show();
			currvoice = 2;
			StartOverlayVoiceOver();
	}
	else if (score >= 60 && score < 100)
	{
			OverlayTexts[3].show();
			ovrstage2to1.show();
			currvoice = 3;
			StartOverlayVoiceOver();
	}

	gotosecondscreen = false;
}
function StartOverlayVoiceOver()
{
	voiceovers[currvoice].play();
}

function HideAllOverlays()
{
	OverlayTexts[0].hide();
	OverlayTexts[1].hide();
	OverlayTexts[2].hide();
	OverlayTexts[3].hide();

	ovrstage1to2.hide();
	ovrstage2to3.hide();
	ovrstage2to1.hide();
}
function ChangeIntroText()
{
	switch (introTextnum)
	{
		case 0:
		var TweenTextShow	= new Kinetic.Tween({
			node: introtext1,
			opacity: 1,
			duration: 1		
		});

		TweenTextShow.play();
		
		audioFiles.introvoice.play();

		introTextnum = 1;

		gamestarted = true;
		introtimer = setInterval(function(){ChangeIntroText();}, 5000);
		break;

		case 1:	
		if (introtext1.attrs.opacity == 1)
		{
			var TweenTextHide = new Kinetic.Tween({
				node: introtext1,
				opacity: 0,
				duration: 1
			});

			TweenTextHide.play();
		}

		if (introtext1.attrs.opacity == 0)
		{
			audioFiles.introvoice.play();
			introtext1.setImage(images.IntroText2);
			var TweenTextShow	= new Kinetic.Tween({
				node: introtext1,
				opacity: 1,
				duration: 1
			});
			TweenTextShow.play();
			introTextnum = 2;
		}
		
		break;

		case 2:
		if (introtext1.attrs.opacity == 1)
		{
			var TweenTextHide = new Kinetic.Tween({
				node: introtext1,
				opacity: 0,
				duration: 1
			});

			TweenTextHide.play();
		}
		if (introtext1.attrs.opacity == 0)
		{
			audioFiles.introvoice.play();
			introtext1.setImage(images.IntroText3);
			var TweenTextShow	= new Kinetic.Tween({
				node: introtext1,
				opacity: 1,
				duration: 1
			});
			TweenTextShow.play();
			introTextnum = 3;
		}
		

		break;

		case 3:
		if (introtext1.attrs.opacity == 1)
		{
			var TweenTextHide = new Kinetic.Tween({
				node: introtext1,
				opacity: 0,
				duration: 1
			});

			TweenTextHide.play();
			
			introTextnum = 4;
		}
		break;

		case 4:
			CurrentScreen = 4;
			clearInterval(introtimer);
		break;
	}
}
