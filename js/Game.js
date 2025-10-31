class Game{
	animating = true;
	buildings = new Building();
	environment = new Environment();
	input = new Input();
	loop = new Loop();
	map = new Map();

	player = new Player();
	constructor(){		
		setInterval(() => this.loop.go(this), Config.loop_interval_timing);
		this.map.generator.generate(this.map.grid, this)
	}

	end_of_day(){
		this.player.money -= Config.cost_per_day;
	}
	next_day(){
		this.input.allowed = false;		
		this.player.moves = 0;
	}
	start_loop(){
		
	}
}
