class Input {
    allowed = true;    

    buy_button_pressed(what){
        if (game.player.is_buying === null){
            game.player.is_buying = what;
            return;
        }
        game.player.is_buying = null;
    }

    click(x, y){
        console.log(game.player.is_buying, game.player.is_building);
        if (game.player.is_buying == null){
            return;
        }
        if (game.player.is_building == null){
            game.player.is_building = { x: x, y: y };
            return;
        }
        game.player.build(game.player.is_building.x, game.player.is_building.y, x, y, game.player.is_buying);

    }

    key(what){
        let delta_x = 0;
        let delta_y = 0;
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