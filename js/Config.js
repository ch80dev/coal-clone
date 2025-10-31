class Config {	
	static building_icons = { ladder: "[]", shoring: "=", dynamite_3x3: 'x', dynamite_1x9: 'x' };
	static building_costs = { ladder: 10, shoring: 25, dynamite_3x3: 50, dynamite_1x9: 50  };
	static building_orientations = { ladder: 'v', shoring: 'h', dynamite_3x3: 0, dynamite_1x9: 0 }
	static cost_per_day = 50;
	static dirt_starts_at = 3;
	static dirt_ends_at = 6;	
	static loop_interval_timing = 250;
	
	static max_moves = 10;
	static max_x = 50;
	static max_y = 40;
	static non_dirt = ['empty', 'sky', 'dirt'];

	static ores = ['coal', 'iron', 'gold'];
	static ore_percents ={ coal: .1, iron: .05, gold: .01 };
	static ore_grow_max = { coal: 2, iron: 4, gold: 10 };
	static ore_grow_target = { coal: 1, iron: 1, gold: 1 }
	static ore_values = { coal: 10, dirt: 0, iron: 25, gold: 100, stone: 0};
	
	static start_x = 0;
	static start_y = 2;
	static time_for_tile_to_fall = 3;

}