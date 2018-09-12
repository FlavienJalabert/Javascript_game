function actions(){
	window.addEventListener('keydown',onKeyPress);
	window.addEventListener('resize',onWindowResize);
	// display popups
	document.getElementById('settings').addEventListener('click',openSettings);
	document.getElementById('challenges').addEventListener('click',openChallenges);
	document.getElementById('shop').addEventListener('click',openShop);
	// turn camera to see character
	document.getElementById('skins').addEventListener('click',skins);
	// change bot appearance and value
	document.getElementById('strength').addEventListener('click',strength);
	document.getElementById('speed').addEventListener('click',speed);
	document.getElementById('bounciness').addEventListener('click',bounciness);
	document.getElementById('income').addEventListener('click',income);
	// upgrade one stat
	document.getElementById('upgrade').addEventListener('click',upgrade);
	// collect money after run is finished
	document.getElementById('collect').addEventListener('click',collect);
	document.getElementById('collectDouble').addEventListener('click',collectDouble);
	// close buttons
	var close=document.getElementsByClassName('close');
	for(var i=0;i<close.length;i++){
		close[i].addEventListener('click',closeTab);
	}
}
function onKeyPress(e){
	switch(e.keyCode){
		case 79: /*O*/
			activeCamera=cameraOrtho;
			activeHelper=cameraOrthoHelper;
			break;
		case 80: /*P*/
			activeCamera=cameraPerspective;
			activeHelper=cameraPerspectiveHelper;
			break;
		//
		
	}
}
function onWindowResize(e){
	SCREEN_WIDTH=500;
	SCREEN_HEIGHT=window.innerHeight*.753;
	aspect=SCREEN_WIDTH/SCREEN_HEIGHT;
	renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
	camera.aspect=0.5*aspect;
	camera.updateProjectionMatrix();
	cameraPerspective.aspect=0.5*aspect;
	cameraPerspective.updateProjectionMatrix();
	cameraOrtho.left=-0.5*frustumSize*aspect/2;
	cameraOrtho.right=0.5*frustumSize*aspect/2;
	cameraOrtho.top=frustumSize/2;
	cameraOrtho.bottom=-frustumSize/2;
	cameraOrtho.updateProjectionMatrix();
}
function closeTab(e){
	e.path[1].style.display='none';
	document.getElementById('popup').style.display='none';
}
function openSettings(e){
	document.getElementById('popup').style.display='block';
	document.getElementById('collectPopup').style.display='none';
	document.getElementById('settingsPopup').style.display='block';
	document.getElementById('challengesPopup').style.display='none';
	document.getElementById('shopPopup').style.display='none';
}
function openChallenges(e){
	document.getElementById('popup').style.display='block';
	document.getElementById('collectPopup').style.display='none';
	document.getElementById('settingsPopup').style.display='none';
	document.getElementById('challengesPopup').style.display='block';
	document.getElementById('shopPopup').style.display='none';
}
function openShop(e){
	document.getElementById('popup').style.display='block';
	document.getElementById('collectPopup').style.display='none';
	document.getElementById('settingsPopup').style.display='none';
	document.getElementById('challengesPopup').style.display='none';
	document.getElementById('shopPopup').style.display='block';
}
function strength(e){
	document.getElementById('botButtons').style.borderColor='#f25';
	document.getElementById('upgrade').style.backgroundColor='#f25';
	document.getElementById('title').innerHTML='Strength';
	document.getElementById('level').innerHTML='Lvl '+Game.Strength.Level;
	document.getElementById('desc').innerHTML='Your strength is increased by <i>'+Game.Strength.Grade+'</i>%';
	document.getElementById('upgrade').getElementsByTagName('i')[0].innerHTML=Game.Strength.UpCost;
}
function speed(e){
	document.getElementById('botButtons').style.borderColor='#25f';
	document.getElementById('upgrade').style.backgroundColor='#25f';
	document.getElementById('title').innerHTML='Speed';
	document.getElementById('level').innerHTML='Lvl '+Game.Speed.Level;
	document.getElementById('desc').innerHTML='Your speed is increased by <i>'+Game.Speed.Grade+'</i>%';
	document.getElementById('upgrade').getElementsByTagName('i')[0].innerHTML=Game.Speed.UpCost;
}
function bounciness(e){
	document.getElementById('botButtons').style.borderColor='#5f2';
	document.getElementById('upgrade').style.backgroundColor='#5f2';
	document.getElementById('title').innerHTML='Bounciness';
	document.getElementById('level').innerHTML='Lvl '+Game.Bounciness.Level;
	document.getElementById('desc').innerHTML='Your bounciness is increased by <i>'+Game.Bounciness.Grade+'</i>%';
	document.getElementById('upgrade').getElementsByTagName('i')[0].innerHTML=Game.Bounciness.UpCost;
}
function income(e){
	document.getElementById('botButtons').style.borderColor='#ffd700';
	document.getElementById('upgrade').style.backgroundColor='#ffd700';
	document.getElementById('title').innerHTML='Income';
	document.getElementById('level').innerHTML='Lvl '+Game.Income.Level;
	document.getElementById('desc').innerHTML='Your income is increased by <i>'+Game.Income.Grade+'</i>%';
	document.getElementById('upgrade').getElementsByTagName('i')[0].innerHTML=Game.Income.UpCost;
}
function notifier(n){
	if(n>9){
		document.getElementById('buttonNotification').innerHTML='&#'+(10121+n).toString()+';&#x2b;';
	}else{
		document.getElementById('buttonNotification').innerHTML='&#'+(10121+n).toString()+';';
	}
	document.getElementById('buttonNotification').style.display='block';
}
function unNotifier(){
	document.getElementById('buttonNotification').style.display='none';
}