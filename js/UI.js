class UI{
	constructor(){

	}

	display_map(){
		let txt = "";
		for (let y = 0; y < Config.max_y; y ++ ){
			txt += "<div class='row'>";
			for (let x = 0; x < Config.max_x; x ++){
				let tile_class = game.map.at(x, y);
				let txt_in_cell = "";
				if (game.player.x == x && game.player.y == y){
					txt_in_cell = "O";
				}
				txt += `<div id='cell-${x}-${y}' class='cell ${tile_class}'>${txt_in_cell}</div>`;
			}
			txt += "</div>";
		}
		$("#map").html(txt);
	}
	refresh(){	
		this.display_map();
		$("#money").html(`$${game.player.money}`);
		$("#moves").html(Config.max_moves - game.player.moves);
	}
}
