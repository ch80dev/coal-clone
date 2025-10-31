class MapGenerator {
    grow_ore(x, y, what, map, game){
        let does_it_grow = fetch_rand(1, Config.ore_grow_max[what]) <= Config.ore_grow_target[what];
        let adjacent_stone = game.map.fetch_adjacent_tile_of_type(x, y, 'stone', true); 
        if (!does_it_grow || adjacent_stone == null){
            return;
        }
        map[adjacent_stone.x][adjacent_stone.y] = what;
    }

    seed_all_ores (map, game){
        for (let ore of Config.ores){
            let map_size = Config.max_x * Config.max_y;
            let cent = Config.ore_percents[ore];
            let num_of_ores = map_size * cent;
            this.seed_ore(ore, num_of_ores, map, game);
            
            
                
            
        }

    }

    seed_ore(what, num_of_ores, map, game){
        for (let i = 0; i < num_of_ores; i ++){
            let rand_x = fetch_rand(0, Config.max_x - 1);
            let rand_y = fetch_rand(Config.dirt_ends_at, Config.max_y - 1);
            if (what == 'gold'){
                rand_y = fetch_rand(Math.round(Config.max_y / 2), Config.max_y - 1);
            }
            if (map[rand_x][rand_y] != 'stone'){
                continue;
            }
            map[rand_x][rand_y] = what;
            this.grow_ore(rand_x, rand_y, what, map, game);

        }
    }
    create_tile(x, y, map, game){
        if (y < Config.dirt_starts_at){
            return 'sky';
        } else if (y <= Config.dirt_ends_at 
            || (y > Config.dirt_ends_at && map[x][y -1] == 'dirt' && fetch_rand(1,2) == 1 )){
            return 'dirt';
        }
        return 'stone';
    }

    generate(map, game){
        for (let x = 0; x < Config.max_x; x ++ ){
            for (let y = 0; y < Config.max_y; y ++ ){
                
                map[x][y] = this.create_tile(x, y, map);
            }
        }
        this.seed_all_ores(map, game);        
    }


}