class Building {
    grid = [];

    constructor(){
        for (let x = 0; x < Config.max_x; x ++ ){
            this.grid[x] = [];
            for (let y = 0; y < Config.max_y; y ++ ){
                this.grid[x][y] = null;
            }    
        }
    }

    at(x, y){
        return this.grid[x][y];
    }

    build(from_x, from_y, to_x, to_y, what){
        let delta = game.map.fetch_delta(from_x, from_y, to_x, to_y);     
        if (delta.x == 0){
            this.build_vertical(from_x, from_y, to_y, what, delta);
        } else if (delta.y == 0){
            this.build_horizontal(from_x, to_x, to_y, what, delta);
        } else if (delta.x != 0 && delta.y != 0){
            this.build_everywhere()
        } else if (delta.x == 0 && delta.y == 0){
            this.build_here(from_x, from_y, what);
        }
        
        game.player.is_buying = null;
        game.player.is_building = null;
    }
    build_everywhere(from_x, from_y, to_x, to_y, what){
        for (let x = from_x; x <= to_x; x ++){
            for (let y = from_y; y <= to_y; y ++){
                this.build_here(pos_x, y, what);
            }
        }
    }
    build_here(x, y, what){   
        if (!this.can_go_here(x, y, what) || game.player.money < Config.building_costs[what]){
            return;
        }
        this.is(x, y, what);
        game.player.spend(Config.building_costs[what]);
        game.player.expenses ++;
    }
    build_horizontal(from_x, to_x, y, what, delta){
        let pos_x = from_x;
        while (pos_x != to_x){
			this.build_here(pos_x, y, what);
			pos_x += delta.x;
            console.log(pos_x, delta.x, to_x)
		}
        this.build_here(pos_x, y, what);
    }

    build_vertical(x, from_y, to_y, what, delta){
        let pos_y = from_y;
        while (pos_y != to_y){
			this.build_here(x, pos_y, what);
			pos_y += delta.y;
		}
        this.build_here(x, pos_y, what);
    }


    can_go_here(x, y, what){
        if (what == 'ladder' 
            && ((game.map.is_valid(x, y - 1) 
                && (game.map.at(x, y - 1) == 'sky' || game.map.is_solid(x, y - 1) 
                || this.at(x, y - 1) == 'ladder'))
            || (game.map.is_valid(x, y + 1) && (game.map.is_solid(x, y + 1) 
                || this.at(x, y + 1) == 'ladder')))){
            return true;
        } else if (what == 'shoring' && !game.map.check_if_falls(x, y)){
            return true;
        }
        return false;
    }

    how_many_they_can_buy(what){
        return Math.floor(game.player.money / Config.building_costs[what]);
    }

    is (x, y, what){
        this.grid[x][y] = what;
    }

    

}