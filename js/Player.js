class Player{
    
    is_buying = null;
    is_building = null;
    money = 0;    
    moves = 0;
    constructor(){
        
        this.x = Config.start_x;
        this.y = Config.start_y;
        this.expenses = Config.cost_per_day;

    }

    build(from_x, from_y, to_x, to_y, what){
        for (let pos_x = from_x; pos_x <= to_x; pos_x ++){
            for (let pos_y = from_y; pos_y <= to_y; pos_y ++){
                game.buildings.is(pos_x, pos_y, what);
                this.spend(Config.building_costs[what]);
                this.expenses ++;
            }    
        }
        this.is_buying = null;
        this.is_building = null;
    }

    fall(){
        let do_they_fall = game.map.check_if_falls(this.x, this.y);
        if (!do_they_fall){
            return;
        }
        this.y ++;
        this.fall();
    }

    fetch_expenses(){
        console.log(this.expenses);
        return this.expenses;
        
    }

    is_at(x, y){
        return this.x == x && this.y == y;
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
        game.map.is(x, y, 'empty');        
        if (what_is_being_mined != 'dirt'){
            this.moves ++;
        }
        if (this.moves >= Config.max_moves){
            this.x = Config.start_x;
            this.y = Config.start_y;
            game.end_of_day();
        }
        this.fall();        
    }

    move (delta_x, delta_y){
        let new_x = this.x + delta_x;
        let new_y = this.y + delta_y;
        let is_valid = game.map.is_valid(new_x, new_y);
        if (!is_valid || this.moves >= Config.max_moves){
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