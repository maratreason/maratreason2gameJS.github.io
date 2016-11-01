
var joyRadius = gameHeight/5;
var del = gameHeight/2000;

var cellObject = game.newBaseObject({
	x : (gameWidth)/2, y : gameHeight/2,
});

var cellObject2 = game.newBaseObject({
	x : (gameWidth)/2, y : gameHeight/2,
});


var cell = game.newImageObject({
	file: 'img/cell.png',
	w : joyRadius, h : joyRadius

});


var joy = game.newCircleObject({
	x : gameWidth + 30, y : 75,
	radius : joyRadius,
	fillColor : 'black',
	alpha : 0.2
});

var joystic = game.newCircleObject({
	x : gameWidth + 30, y : 75,
	radius : joyRadius/2,
	fillColor : pjs.colors.hex2rgba('#FFFFFF', 0.6)
});

// анимация смены фона окна

var fireRect = game.newRectObject({
	x : 0, y : 0,
	w : gameWidth, h : gameHeight,
	fillColor: '#fff'
});

var fon;

var pressTime = 0;
var patron = 24; //кол-во выстрелов которые можем совершить
var premia = 0;

var drawFon = function(){
	fon.draw();
}

var drawInterface = function(){

	joy.setPositionS({
		x : gameWidth - joy.w - 10,
		y : gameHeight - joy.h - 10
	});

	fireRect.setPositionS(point(0, 0));



	var dist = joystic.getDistanceC(joy.getPositionC());

	if(touch.isDown() && touch.isInStatic(joy.getStaticBox())) {
			joystic.moveTimeC(touch.getPosition(), 5);
			if(joy.alpha < 0.7)
				joy.alpha += 0.05;
	} else {
	joystic.moveTimeC(joy.getPositionC(), 10);
		if(joy.alpha > 0.2)
			joy.alpha -= 0.05;
}

	

//Движение джойстика

	var angle = vector.getAngle2Points(joy.getPositionC(), joystic.getPositionC());
	cellObject.setAngle(angle);
	cellObject.moveAngle(dist/30);


	joy.draw();
	joystic.draw();
	cell.draw();

	cellObject2.moveTimeC(cellObject.getPosition(), 10);
	cell.motionC(cellObject2.getPosition(), size(random(0, 10)/10, random(0, 10)/10), 10);
	//cellObject.drawStaticBox();

	//патроны
	OOP.forInt(patron, function(i){
		brush.drawImageS({
			x :(74*del + 2) * (i + 0.5), y : gameHeight - 250 * del - 40,
			w : 94*del, h : 412*del,
			file : 'img/patron.png'
		});
	});

	//премия
	OOP.forInt(premia, function(i){
		brush.drawImageS({
			x : 10 + (20 + 77*del) * i, y : 10,
			w : 120*del, h : 120*del,
			file : 'img/premia.png'
		});
	});

	if(touch.isPress() && touch.isInStatic(joystic.getStaticBox()))
		pressTime = game.getTime();

	if(touch.isUp())
		if(game.getTime() - pressTime < 100 && patron){
			fire = true;
			patron -= 1;
			fireRect.fillColor = 'white';
			fireRect.setAlpha(1);
			//чтобы прицел подпрыгивал
			cellObject2.move(point(0, -50));
			cellObject.move(point(random(-5, 5), random(-5, 5)));
		}

	if(fireRect.getAlpha() > 0)
		fireRect.setAlpha(fireRect.getAlpha() - 0.03);
	fireRect.draw();

	camera.moveTime(vector.pointMinus(cell.getPositionC(), point(gameWidth/2 ,gameHeight/2)), 10);

	if(cellObject.x < gameWidth/2)
		camera.setPosition(point(0, 'none'));
	if(cellObject.y < gameHeight/2)
		camera.setPosition(point('none', 0));
	if(cellObject.x > fon.w - gameWidth/2)
		camera.setPosition(point(fon.w - gameWidth, 'none'));
	if(cellObject.y > fon.h - gameHeight/2)
		camera.setPosition(point('none', fon.h - gameHeight));

};