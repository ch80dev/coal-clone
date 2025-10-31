class Input {
    
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