


var arrTop = [];

//col1 количество пролетающих объектов
var createLevel =  function(object) {
	arrTop = [];

	var animUtka = pjs.tiles.newAnimation(object.topFile, 315, 248, 3);

	fon = game.newImageObject({
		file : object.fonFile,
		scale: del * 4,
		onload : function(){
			cellObject.setPosition(fon.getPositionC());
	}
});



	OOP.forInt(object.topCount, function(){
		var obj = game.newAnimationObject({
			animation : animUtka,
			y : random(20, gameHeight*2), x : random(0, gameWidth*2),
			w : 320*del, h : 248*del,
			fillColor : '#FF0000',
			userData : {
				dx : random(-8, 8, true),
				dy : 0
			}
		});

		//скорость анимации
		obj.setDelay(10 - Math.abs(obj.dx));


//разворот птиц 
if(obj.dx < 0)
	obj.setFlip(1, 0);

		arrTop.push(obj);
	});

};

var drawTop = function(){
	OOP.forArr(arrTop, function(el, i, arr){
		if(!el) return;

//отрисовка 2 кадров
		if(!el.dy)
			el.drawFrames(0, 1);
		else{ // отрисовка при попадании
			el.drawFrame(2);
			el.turn(el.dx); //вращение при попадании
		}

		if(el.x < -el.w && el.dx < 0)
			el.x = fon.w + el.w;
		if(el.x > fon.w && el.dx > 0)
			el.x = -el.w;

		el.move(point(el.dx, el.dy));

		if(el.y > fon.h && fon.loaded){
			arr.splice(i, 1);
		}

	});
};

// чтобы попадало по цели и засчитывало
var fireTop = function(){
	OOP.forArr(arrTop, function(el, i, arr){
		if(!fire) return true;
		if(cellObject.isDynamicInside(el.getDynamicBox())){
			premia += 1;
			//уничтодение объекта
			el.dy = 3; // dy падает вниз
			fire = false;
			fireRect.fillColor = '#FF7575';
		}
	});
};