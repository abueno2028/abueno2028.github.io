var player;
var death;
var moving_obstacle;
var hard_obstacle;
var finish_line;
function setup() {
	new Canvas(910, 600);
	player = new Sprite();
	hard_obstacle = new Sprite();
	hard_obstacle.visible = false;
	moving_obstacle = new Sprite();
	moving_obstacle.collider = 'k';
	hard_obstacle.collider = 'k';
	player.width = 50;
	moving_obstacle.layer = 2;
	player.height = 50;
	moving_obstacle.color = 'green';
	hard_obstacle.color = 'red';
	player.width = 50;
	player.height = 50;
    player.pos = {x: 50, y: 300};
    death = new Sprite();
    death.color = 'black';
    world.gravity.y = 200;
    world.gravity.x = 1;
    player.img = 'assets/owlSprite.png';
    player.scale = 0.5;
    death.visible = false;
    death.h = 910;
    death.w = 10000000000000000;
	death.y =1000;
	death.layer = 2;
    death.collider = 'kinematic';
	death.textColor = 'red';
	death.text = 'GAME OVER';
	death.textSize = 50;


    bricks = new Group();
	bricks.w = 60;
	bricks.h = 50;
	bricks.tile = '=';
    bricks.collider = 'static';
    bricks.color = 'purple';
	bricks.layer = 1;

	new Tiles(
		[
			'========================================================.',
			'==...==....==.....==..............==...................=',
			'==...==....==.....==..............==...................=',
			'==.........==.....==..............==...................=',
			'...........==.....................==......==...........=',
			'..........................................==............',
			'.........................==...............==...........=.',
			'........................==................==...........=',
			'..==....==.....==.......==.............................=',
			'..=====================================================',
            '=========================================================='
		],
		100,
		40,
		bricks.w + 4,
		bricks.h + 4
	);
}

function draw() {
	clear();
    movement();
	randomSequence();
	randomSequence2();
	camera.x = player.x;
	
	if (player.collides(bricks)) 
		lose();
	if (player.collides(moving_obstacle)) 
		lose();
	if (player.collides(hard_obstacle)) 
		lose();

	if(kb.pressing("h"))
		hard_obstacle.visible = true;

	
}
	
function lose() {
	camera.x = player.x;

	death.visible = true;
	player.visible = true;
	
	death.pos = {x: camera.x, y: camera.y};

	camera.x = player.x

	death.visible = true;
	player.visible = true;
	death.pos = {x: camera.x, y: camera.y};
}

    

function movement() {


     if (kb.pressing('up')) {
        player.vel.y = -15;
    } else {
        player.vel.y = 0;
    }
        
}


async function randomSequence() {
	await moving_obstacle.move(110);
	await moving_obstacle.move(-110);
	randomSequence(); 

}

async function randomSequence2() {
	await hard_obstacle.move(220);
	await hard_obstacle.move(-220);
	randomSequence();

}




