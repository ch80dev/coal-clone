class Loop{
    go(game){
        if (game.animating && !game.input.allowed){
            let still_running = game.environment.run();
           
            if (!still_running){
                game.input.allowed = true;
                let new_start = game.map.fetch_start();
		        game.player.x = new_start.x;
		        game.player.y = new_start.y;
            }
             ui.refresh();
        }
        
    }
}