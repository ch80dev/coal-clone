class Player{
    
    is_buying = null;
    is_building = null;
    money = 0;    
    moves = 0;
    last_x = 0;    
    constructor(){
        
        this.x = Config.start_x;
        this.y = Config.start_y;
        this.expenses = Config.cost_per_day;

    }

    build(from_x, from_y, to_x, to_y, what){
        let delta = game.map.fetch_delta(from_x, from_y, to_x, to_y);     
        let n = 0;
        if (from_x == to_x){
            n = this.build_vertical(from_x, from_y, to_y, what, delta);
        } else if (from_y == to_y){
            n = this.build_horizontal(from_x, to_y, to_y, what, delta);
        } else {
            n = this.build_everywhere()
        }
        this.spend(Config.building_costs[what] * n);
        this.expenses += n;
        this.is_buying = null;
        this.is_building = null;
    }
    build_everywhere(from_x, from_y, to_x, to_y, what){
        let n = 0;
        for (let x = from_x; x <= to_x; x ++){
            for (let y = from_y; y <= to_y; y ++){
                game.buildings.is(pos_x, y, what);
			    n ++;
            }
        }
        return n;
    }
    build_horizontal(from_x, to_x, y, what, delta){
        let n = 0;
        let pos_x = from_x;
        while (pos_x != to_x){
			game.buildings.is(pos_x, y, what);
			n ++;
			pos_x += delta.x;
		}
        game.buildings.is(pos_x, y, what);
        return n;		
    }

    build_vertical(x, from_y, to_y, what, delta){
        let n = 0;
        let pos_y = from_y;
        while (pos_y != to_y){
			game.buildings.is(x, pos_y, what);
			n ++;
			pos_y += delta.y;
		}
        game.buildings.is(x, pos_y, what);
        return n;
    }

    fall(){
        if (this.x == null || this.y == null){
            return;
        }
        let do_they_fall = game.map.check_if_falls(this.x, this.y);
        if (!do_they_fall){
            return;
        }
        this.y ++;
        this.fall();
    }

    fetch_expenses(){
        return this.expenses;        
    }

    is_at(x, y){
        
        return this.x === x && this.y === y;
    }

    is_building_at(x, y){
        if (this.is_building == null){
            return false;
        }
        return this.is_building.x == x && this.is_building.y == y;
    }

    mine(x, y){
        let what_is_being_mined = game.map.at(x, y);
        game.player.money += Config.ore_values[what_is_being_mined];
        game.map.falling[x][y] = null;
        game.map.is(x, y, 'empty');        
        if (what_is_being_mined != 'dirt'){
            this.moves ++;
        }
        if (this.moves >= Config.max_moves){            
            game.end_of_day();
        }
        this.fall();        
    }

    move (delta_x, delta_y){
        let new_x = this.x + delta_x;
        let new_y = this.y + delta_y;
        let is_valid = game.map.is_valid(new_x, new_y);
        if (!is_valid || this.moves >= Config.max_moves || this.x == null || this.y == null){
            return false;
        }
        if (game.map.is_solid(new_x, new_y)){
            this.mine(new_x, new_y);
            return;
        }
        if (delta_y == -1 && game.buildings.at(this.x, this.y) != 'ladder'){
            return;
        }


        this.x += delta_x;
        this.y += delta_y;
        game.player.fall();
    }
    spend(amount) {
        if (this.money < amount){
            console.log('not enough money');
            return;
        }
        this.money -= amount;
        
    }
}