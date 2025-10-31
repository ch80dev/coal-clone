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
		this.environment.non_dirt_starts_to_fall();
		this.player.last_x = this.player.x;
		this.player.x = null;
		this.player.y = null;
		this.player.history = [];
	}
	next_day(){
		
		this.input.allowed = false;		
		this.player.moves = 0;
		
		
	}
	start_loop(){
		
	}
}
