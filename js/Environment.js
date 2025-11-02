class Environment {
    dirt_falls(){                
        let dirt_falling = 0;
        dirt_falling += this.dirt_falls_down();
        dirt_falling += this.dirt_falls_diagnolly();        
        return dirt_falling > 0;            
    }

    dirt_falls_diagnolly(){
        let dirt_fell = 0;
        for (let x = Config.max_x - 1; x >= 0; x --){
            for (let y = Config.max_y - 1; y >=  0; y --){
                if (game.map.at(x, y) != 'dirt'){
                    continue;
                }

                let poss_delta_x= [];
                if (game.map.is_valid(x - 1, y + 1) && game.map.at(x - 1, y + 1) == 'empty' 
                    && game.buildings.at(x - 1, y + 1) == null){
                    poss_delta_x.push(-1);
                    
                } else if (game.map.is_valid(x + 1, y + 1) && game.map.at(x + 1, y + 1) == 'empty' 
                    && game.buildings.at(x + 1, y + 1) == null){
                    poss_delta_x.push(1);                    
                }
                if (poss_delta_x.length < 1){
                    continue;
                }

                game.map.is(x, y, 'empty');                

                let rand_delta_x = poss_delta_x[fetch_rand(0, poss_delta_x.length - 1)];
                game.map.is(x + rand_delta_x, y + 1, 'dirt');
                this.dirt_tile_falls(x + rand_delta_x, y + 1);
                dirt_fell ++;
                return dirt_fell;
            }    
        }
        return dirt_fell;        
    }

    dirt_falls_down(){      
        let dirt_falls = 0;  
        for (let x = Config.max_x - 1; x >= 0; x --){
            for (let y = Config.max_y - 1; y >=  0; y --){
                if (game.map.at(x, y) != 'dirt'){
                    continue;
                }
                if (game.map.check_if_falls(x, y)){
                    dirt_falls ++;
                    this.dirt_tile_falls(x, y);
                }

            }    
        }
        return dirt_falls;
    }



    dirt_tile_falls(x, y){        
        if (!game.map.check_if_falls(x, y) || !game.map.is_valid(x, y + 1)){
            return;
        }
        game.map.is(x, y + 1, 'dirt');
        game.map.is(x, y, 'empty');        
        //this.dirt_tile_falls(x, y + 1);
    }

    gravity_check(){
        for (let x = 0; x < Config.max_x; x ++){
            for (let y = 0; y < Config.max_y; y ++){
                let does_tile_fall = game.map.check_if_falls(x, y);
                let is_non_dirt = Config.non_dirt.includes(game.map.at(x, y));
                if (is_non_dirt || (!is_non_dirt && !does_tile_fall)){
                    continue;
                }                
                if (game.map.falling[x][y] === null){
                    game.map.falling[x][y] = Config.time_for_tile_to_fall;
                } 

            }    
        }   
    }
    non_dirt_falls(){
        for (let x = 0; x < Config.max_x; x ++){
            for (let y = 0; y < Config.max_y; y ++){
                let does_tile_fall = game.map.check_if_falls(x, y);
                let is_non_dirt = Config.non_dirt.includes(game.map.at(x, y));
                if (game.map.falling[x][y] == null 
                    || (game.map.falling[x][y] != null && game.map.falling[x][y] > 0) 
                    || is_non_dirt || (!is_non_dirt && !does_tile_fall)){
                    continue;
                }                
                game.map.falling[x][y] = null;
                this.non_dirt_falls_down(x, y, game.map.at(x, y));                             

            }    
        }       
    }

    non_dirt_falls_down(x, y, what){
        let start_y = y;        
        while (game.map.at(x, start_y) == what){
            let pos_y = start_y;
            
            game.map.is(x, pos_y, 'empty');
            while (true){
                
                if (!game.map.check_if_falls(x, pos_y) || pos_y == Config.max_y - 1){
                    game.map.is(x, pos_y, what);
                    break;
                }
                pos_y ++;
            }
            start_y --;
        }
    }
    non_dirt_about_to_fall(){
        for (let x = 0; x < Config.max_x; x ++){
            for (let y = 0; y < Config.max_y; y ++){
                let does_tile_fall = game.map.check_if_falls(x, y);
                let is_non_dirt = Config.non_dirt.includes(game.map.at(x, y));
                if (is_non_dirt || (!is_non_dirt && !does_tile_fall) || game.map.falling[x][y] == null){
                    continue;
                }                
                game.map.falling[x][y] --;                

            }    
        }       
    }

    run(){
        this.dirt_falls();
        this.non_dirt_falls();
        let dirt_falls = this.dirt_falls();
        return dirt_falls;


    }
}