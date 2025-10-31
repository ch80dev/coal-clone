class Environment {    
    dirt_falls(){
        this.dirt_falls_down();
        this.dirt_falls_diagnolly();
    }

    dirt_falls_diagnolly(){
        let dirt_fell = 0;
        for (let x = Config.max_x - 1; x >= 0; x --){
            for (let y = Config.max_y - 1; y >=  0; y --){
                if (game.map.at(x, y) != 'dirt'){
                    continue;
                }

                let poss_delta_x= [];
                if (game.map.is_valid(x - 1, y + 1) && game.map.at(x - 1, y + 1) == 'empty'){
                    poss_delta_x.push(-1);
                    
                } else if (game.map.is_valid(x + 1, y + 1) && game.map.at(x + 1, y + 1) == 'empty'){
                    poss_delta_x.push(1);                    
                }
                console.log(x, y, poss_delta_x);
                if (poss_delta_x.length < 1){
                    continue;
                }

                game.map.is(x, y, 'empty');                

                let rand_delta_x = poss_delta_x[fetch_rand(0, poss_delta_x.length - 1)];
                game.map.is(x + rand_delta_x, y + 1, 'dirt');
                this.dirt_tile_falls(x + rand_delta_x, y + 1);
                dirt_fell ++;
            }    
        }
        if (dirt_fell > 0){
            this.dirt_falls_diagnolly();
        }
    }

    dirt_falls_down(){        
        for (let x = Config.max_x - 1; x >= 0; x --){
            for (let y = Config.max_y - 1; y >=  0; y --){
                if (game.map.at(x, y) != 'dirt'){
                    continue;
                }
                if (game.map.check_if_falls(x, y)){
                    this.dirt_tile_falls(x, y);
                }

            }    
        }
    }



    dirt_tile_falls(x, y){        
        if (!game.map.check_if_falls(x, y)){
            return;
        }

        if (game.map.is_valid(x, y + 1)){
            game.map.is(x, y + 1, 'dirt');
            game.map.is(x, y, 'empty');
        }
        this.dirt_tile_falls(x, y + 1);
    }

    run(){
        this.dirt_falls();
    }
}