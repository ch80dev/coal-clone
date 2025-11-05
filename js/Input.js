class Input {
    allowed = true;    

    buy_button_pressed(what){
        if (game.player.is_buying === null 
            || (game.player.is_buying != null && game.player.is_buying != what)){
            game.player.is_buying = what;
            return;
        }
        game.player.is_buying = null;
        game.player.is_building = null;
    }

    click(x, y){
        if (game.player.is_buying == null){
            return;
        }
        if (game.player.is_buying.split('_')[0] == 'dynamite' 
            && game.buildings.can_build_here(x, y, game.player.is_buying)){
            
            let height = Number(game.player.is_buying.split('_')[1].substring(0, 1));
			let width = Number(game.player.is_buying.split('_')[1].substring(2));
            let section = game.buildings.fetch_dynamite_section(x, y, width, height, game.player.is_buying);
            game.buildings.build_section(game.player.is_buying, section, true);
        }
        
        if (game.player.is_building == null){
            game.player.is_building = { x: x, y: y };
            return;
        }
        let from_x = game.player.is_building.x;
        let from_y = game.player.is_building.y;
        let to_x = x;
        let to_y = y;
        
        game.buildings.build(from_x, from_y, to_x, to_y, game.player.is_buying);

    }

    key(what){
        console.log(what);
        let delta_x = 0;
        let delta_y = 0;
        if (what === ' ' && game.player.moves == Config.max_moves){
            game.next_day();
            return;
        } else if (what == 'z'){
            game.player.undo();
            return;
        } else if (what > 0 && what <5)  {
            this.buy_button_pressed(Config.buildings[Number(what)]);
        }
        what = what.substring(5).toLowerCase()

        if (what == 'left'){
            delta_x = -1;
        } else if (what == 'right'){
            delta_x = 1;
        }

        if (what == 'up'){
            delta_y = -1;
        } else if (what == 'down'){
            delta_y = 1;
        }
        game.player.move(delta_x, delta_y);
    }   
}