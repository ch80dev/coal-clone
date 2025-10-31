class Loop{
    go(game){
        if (game.animating && !game.input.allowed){
            let still_running = game.environment.run();
            ui.refresh();
            if (!still_running){
                game.input.allowed = true;
            }
        }
        
    }
}