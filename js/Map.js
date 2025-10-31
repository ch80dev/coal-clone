class Map {
    grid = [];
    generator = new MapGenerator();
    constructor(){
        for (let x = 0; x < Config.max_x; x ++ ){
            this.grid[x] = [];
            for (let y = 0; y < Config.max_y; y ++ ){
                this.grid[x][y] = null;
            }    
        }
    }
    at (x, y){
        return this.grid[x][y];
    }

    check_if_falls(x, y){
        let new_x = x;
        let new_y = y + 1;

        if (!this.is_valid(new_x, new_y)){
            return false;
        }
        if (this.is_solid(new_x, new_y) ){
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