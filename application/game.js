function updateGame(){
	localStorage.setItem('Game',JSON.stringify(Game))
}

if(localStorage.getItem('Game')===null){
	var Game={
		Diamonds:100,
		Money:0,
		ReachObjective:100,
		Record:0,
		Strength:{Level:1,Grade:'0',UpCost:100},
		Speed:{Level:1,Grade:'0',UpCost:100},
		Bounciness:{Level:1,Grade:'0',UpCost:100},
		Income:{Level:1,Grade:'0',UpCost:100},
		ObjectiveProgression:0,
	}
	updateGame()
}

var Game=JSON.parse(localStorage.getItem('Game'));

document.getElementById('diamonds').getElementsByTagName('i')[0].innerHTML=Game.Diamonds;
document.getElementById('money').getElementsByTagName('i')[0].innerHTML=Game.Money;
document.getElementById('progressObjective').innerHTML=Game.ReachObjective;
document.getElementById('progressRecord').getElementsByTagName('i')[0].innerHTML=Game.Record;
document.getElementById('objective').getElementsByTagName('i')[0].innerHTML=Game.ReachObjective;

document.getElementById('botButtons').style.borderColor='#f25';
document.getElementById('upgrade').style.backgroundColor='#f25';
document.getElementById('title').innerHTML='Strength';
document.getElementById('level').innerHTML='Lvl '+Game.Strength.Level;
document.getElementById('desc').innerHTML='Your strength is increased by <i>'+Game.Strength.Grade+'</i>%';
document.getElementById('upgrade').getElementsByTagName('i')[0].innerHTML=Game.Strength.UpCost;

function upgrade(){
	var target=document.getElementById('title').textContent;
	console.log('upgrading '+target);
	if(Game.Money>Game[target].UpCost){
		Game[target].Level+=1;
		Game[target].UpCost=Game[target].UpCost*Game[target].Level+Game.ReachObjective*1500;
		Game[target].Grade=Game[target].Level*10;
		updateGame()
	}
}