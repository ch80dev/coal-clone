class Loop{
    go(game){
        if (game.animating && !game.input.allowed){
            let still_running = game.environment.run();
           
            if (!still_running){
                game.input.allowed = true;
                game.environment.gravity_check();
                game.player.start();
            }
             ui.refresh();
        }
        
    }
}