class Map {
    grid = [];
    falling = [];
    generator = new MapGenerator();
    constructor(){
        for (let x = 0; x < Config.max_x; x ++ ){
            this.grid[x] = [];
            this.falling[x] = [];
            for (let y = 0; y < Config.max_y; y ++ ){
                this.grid[x][y] = null;
                this.falling[x][y] = null;
            }    
        }
    }
    at (x, y){
        return this.grid[x][y];
    }

    check_if_falls(x, y){
        let new_x = x;
        let new_y = y + 1;

        if (!this.is_valid(new_x, new_y) || this.is_solid(new_x, new_y) 
            || game.buildings.at(new_x, new_y) != null){
            return false;
        }
        return true;
    }

    fetch_adjacent_tile_of_type(x, y, what, orthogonal){
        let adjacent = [];
        for (let new_x = x - 1; new_x <= x + 1; new_x ++){
            for (let new_y = y - 1; new_y <= y + 1; new_y ++){
                if (!this.is_valid(new_x, new_y) 
                    || (new_x == x && new_y == y) 
                    || (orthogonal && new_x != x && new_y != y) ){
                    continue;
                }
                adjacent.push({ x: new_x, y: new_y });
            }
        }
        if (adjacent.length == 0){
            return null;
        }
        return adjacent[fetch_rand(0, adjacent.length - 1)];
    }

    fetch_delta(from_x, from_y, to_x, to_y){
        let delta_x =  to_x - from_x;
        let delta_y = to_y - from_y;
        if (delta_x > 0){
            delta_x = 1;
        } else if (delta_x < 0){ 
            delta_x = -1;
        }
        if (delta_y > 0){
            delta_y = 1;
        } else if (delta_y < 0){ 
            delta_y = -1;
        }
        return { x : delta_x, y: delta_y };

    }

    

    fetch_start(){
        let start_x = game.player.last_x;
        let i = 1;
        while (true){
            let left_and_right = [start_x - i, start_x + i];            
            for (let x of left_and_right){
                if (!this.is_valid(x, Config.start_y) || this.check_if_falls(x, Config.start_y)){
                    continue;
                }                
                return { x: x, y: Config.start_y};
            }
            i++;
            if (!this.is_valid(left_and_right[0], Config.start_y) 
                && !this.is_valid(left_and_right[0], Config.start_y)){
                break;
            }
        }

        return { x: Config.start_x, y: Config.start_y };
    }

    fetch_top_or_bottom_y(x, y, what, top){
        let pos_y = y;
        let delta_y = -1;
        if (this.at(x, y) != what){
            return null;
        }
        if (top){
            delta_y = 1;
        }
        while ((top && y <= 0) || (!top && y < Config.max_y)){                        
            
            if (this.at(x, pos_y) != what){
                return pos_y - delta_y;
            }
            pos_y += delta_y;
        }
        return pos_y;
        
    }

    is (x, y, what){
        this.grid[x][y] = what;
    }

    is_solid(x, y){
        if (!this.is_valid(x, y)){
            return null;
        }
        return this.at(x, y) != 'sky' && this.at(x, y) != 'empty' 
    }
    is_valid(x, y){
        return !(x < 0 || x >= Config.max_x || y < 0 || y >= Config.max_y);
    }
}