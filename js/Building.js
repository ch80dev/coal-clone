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
                this.build_here(pos_x, y, what, false);
            }
        }
    }
    build_here(x, y, what, already_paid){   
        if (game.player.money < Config.building_costs[what]){ //removed can_build_here_check
            return;
        }
        
        this.is(x, y, what);
        if (already_paid){
            this.pay_for_it(what);
        }
    }
    build_horizontal(from_x, to_x, y, what, delta){
        let pos_x = from_x;
        while (pos_x != to_x){
			this.build_here(pos_x, y, what, false);
			pos_x += delta.x;
		}
        this.build_here(pos_x, y, what, false);
    }


    build_section(what, where, pay_just_once){
        if (pay_just_once){
            this.pay_for_it(what);
        }
        for (let pos of where){
            this.build_here(pos.x, pos.y, what, pay_just_once);
        }
    }

    build_vertical(x, from_y, to_y, what, delta){
        let pos_y = from_y;
        while (pos_y != to_y){
			this.build_here(x, pos_y, what, false);
			pos_y += delta.y;
		}
        this.build_here(x, pos_y, what, false);
    }

    can_build_here(x, y, what){
        if (what == 'ladder' 
            && ((game.map.is_valid(x, y - 1) 
                && (game.map.at(x, y - 1) == 'sky' || game.map.is_solid(x, y - 1) 
                || this.at(x, y - 1) == 'ladder'))
            || (game.map.is_valid(x, y + 1) && (game.map.is_solid(x, y + 1) 
                || this.at(x, y + 1) == 'ladder')))){
            return true;
        } else if (what == 'shoring' && !game.map.check_if_falls(x, y)){
            return true;
        } else if ((what == 'dynamite_3x3' || what == 'dynamite_1x9') 
            && game.map.fetch_adjacent_tile_of_type(x, y, 'empty', false) != null 
            && game.map.is_solid(x, y) 
            && this.fetch_dynamite_section(x, y, 
                Number(what.split('_')[1].substring(2)), Number(what.split('_')[1].substring(0, 1)), what).length == 9 ){
            return true;
        }
        return false;
    }

    dynamite_explodes(){
        for (let x = 0; x < Config.max_x; x ++){
            for (let y = 0; y < Config.max_y; y ++){
                if (this.at(x, y) == null){
                    continue;
                }
                if (this.at(x, y).split("_")[0] == 'dynamite'){
                    game.map.mine_tile(x, y);
                    this.is(x, y, null);
                }
            }
        }
    }

    fetch_dynamite_section(start_x, start_y, width, height, what){
        let delta = game.map.fetch_delta_from_nearest_tile(start_x, start_y, 'empty');
        if (delta.x == -1){
			start_x -= width - 1 ;		
		} else if (delta.y == 1 && what == 'dynamite_1x9'){
			const temp = width;
			width = height;
			height = temp;
		}
		return(game.map.fetch_section(start_x, start_y, width, height, delta));
        
    }
    how_many_they_can_buy(what){
        return Math.floor(game.player.money / Config.building_costs[what]);
    }

    is (x, y, what){
        this.grid[x][y] = what;
    }

    pay_for_it(what){
        game.player.spend(Config.building_costs[what]);
        game.player.expenses ++;
    }

}