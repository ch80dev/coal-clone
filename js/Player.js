class Player{
    falling = 0;
    history = [];
    is_buying = null;
    is_building = null;
    money = 1000;    
    moves = 0;
    last_x = 0;    
    constructor(){
        
        this.x = Config.start_x;
        this.y = Config.start_y;
        this.expenses = Config.cost_per_day;

    }
    add_to_history(x, y, what){
        this.history.push({  x: x, y: y, what: what } );
    }
    

    fall(){
        if (this.x == null || this.y == null){
            return;
        }
        let do_they_fall = game.map.check_if_falls(this.x, this.y);
        if(game.buildings.at(this.x, this.y) == 'ladder' || game.buildings.at(this.x, this.y) == 'shoring'){
            do_they_fall = false;
        }
        if (!do_they_fall && this.falling > 1){
            ui.fell = { x: this.x, y: this.y };
            ui.minus_moves(`(-${ this.falling - 1 }`)
            game.player.moves += this.falling - 1;
        }
        if (game.player.moves > Config.max_moves){
            game.lose("You fell and hurt yourself too badly.");
        }
        if (!do_they_fall){
            this.falling = 0;
            return;
        }
        this.add_to_history(this.x, this.y, 'move');
        this.y ++;
        this.falling ++;
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
        this.add_to_history(x, y, what_is_being_mined);
        game.map.mine_tile(x, y, false);
        if (what_is_being_mined != 'dirt'){
            ui.minus_moves('-1');
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
        this.add_to_history(this.x, this.y, 'move');
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

    start(){
        let new_start = game.map.fetch_start();
        this.x = new_start.x;
        this.y = new_start.y;
    }
    undo(){
        if (this.history.length < 1){
            return;
        }
        
        let last = this.history.pop();
        if (last.what == 'move'){
            this.x = last.x;
            this.y = last.y;
            
        } else if (last.what != 'move'){
            this.money -= Config.ore_values[last.what];
            game.map.is(last.x, last.y, last.what);
        }
        if (last.what != 'move' && last.what != 'dirt'){
            this.moves --;
        }
                    
        if (game.map.check_if_falls(this.x, this.y)){
            this.undo();
        }

    }
}