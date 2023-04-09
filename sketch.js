var grass = [];
var grassBlades = 40;
var grassSegments = 10;

var innerRadius = 100;
var outerRadius = 400;

var gridScale = 10;
var flowfield;
var time = 0;
var increment = 0.06;

function setup() {
	createCanvas(1000, 800);
	columns = floor(width / gridScale);
	rows = floor(height / gridScale);
	flowfield = new Array(columns * rows);

	for (var x = 0; x < width; x += (width / grassBlades)) {
		for (var y = 0; y < height; y += (width / grassBlades)) {
			grass.push(new Grass(x, y, grassSegments));
		}
	}
}

function draw() {
	background(0);
	colorMode(HSB);

	var xOffset = 0;
	for (var x = 0; x < columns; x += 1) {
		var yOffset = 0;
		for (var y = 0; y < rows; y += 1) {
			var index = x + y * columns;
			var perlinNoise = noise(xOffset, yOffset, time);
			var angle = map(perlinNoise, 0, 1, 0, TWO_PI * 3);
			var vector = p5.Vector.fromAngle(angle);
			vector.setMag(0.1);
			flowfield[index] = vector;
			yOffset += increment;
		}
		xOffset += increment;
	}
	time += 0.05;

	for (var i = 0; i < grass.length; i += 1) {
		var x = floor(grass[i].position.x / gridScale);
		var y = floor(grass[i].position.y / gridScale);
		var index = x + y * columns;
		var currentVector = flowfield[index];
		if (currentVector != null) {
			grass[i].show(p5.Vector.fromAngle(currentVector.heading()));
		}

	}
}
