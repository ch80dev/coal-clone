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