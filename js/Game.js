class Game{
	environment = new Environment();
	input = new Input();
	loop = new Loop();
	map = new Map();

	player = new Player();
	constructor(){
		setInterval(this.loop.go(), Config.loop_interval_timing);
		this.map.generator.generate(this.map.grid, this)
	}

	end_of_day(){
		this.environment.run();
	}
}
