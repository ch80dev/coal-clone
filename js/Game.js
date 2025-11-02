class Game{
	animating = true;
	buildings = new Building();
	environment = new Environment();
	game_over = false;
	input = new Input();
	loop = new Loop();
	map = new Map();

	player = new Player();
	constructor(){		
		setInterval(() => this.loop.go(this), Config.loop_interval_timing);
		this.map.generator.generate(this.map.grid, this)
	}

	end_of_day(){
		this.player.money -= this.player.expenses;
		this.environment.gravity_check();
		this.environment.non_dirt_about_to_fall();
		this.player.last_x = this.player.x;
		this.player.x = null;
		this.player.y = null;
		this.player.history = [];
		if (this.player.money < 0){
			this.lose("You ran out of money!");
		}
	}

	lose(msg){
		this.game_over = true;
		ui.lose(msg);
	}

	next_day(){		
		this.input.allowed = false;		
		this.player.moves = 0;		
		this.player.is_buying = null;
		this.player.is_building = null;
		this.buildings.dynamite_explodes();
		

	}
}
