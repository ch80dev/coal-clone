class Player{
    money = 0;    
    moves = 0;
    constructor(){
        
        this.x = Config.start_x;
        this.y = Config.start_y;
    }
    fall(){
        let do_they_fall = game.map.check_if_falls(this.x, this.y);
        if (!do_they_fall){
            return;
        }
        this.y ++;
        this.fall();
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
        console.log(is_valid);
        if (!is_valid || this.moves >= Config.max_moves){
            return false;
        }
        if (game.map.is_solid(new_x, new_y)){
            this.mine(new_x, new_y);
            return;
        }
        if (delta_y == -1){
            return;
        }


        this.x += delta_x;
        this.y += delta_y;
        
    }
}