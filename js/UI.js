class UI{
	constructor(){

	}


	display_buy_menu(){
		let txt = "";
		for (let [what, cost] of Object.entries(Config.building_costs)){
			let icon = Config.building_icons[what];
			let  is_disabled = "";
			
			if (game.buildings.how_many_they_can_buy(what) < 1 || game.player.moves < Config.max_moves){
				is_disabled = " disabled ";
			}
			txt += `<div><button id='buy-${what}' class='buy' ${is_disabled}>${icon}</button>${what} - $${cost} </div>`;
		}
		$("#buy_menu").html(txt);
	}

	display_map(){
		let txt = "";
		for (let y = 0; y < Config.max_y; y ++ ){
			txt += "<div class='row'>";
			for (let x = 0; x < Config.max_x; x ++){
				let building_here = game.buildings.at(x, y);
				let tile_class = game.map.at(x, y);
				let txt_in_cell = "";
				if (game.player.x == x && game.player.y == y && Config.max_moves - game.player.moves > 0){
					txt_in_cell = "O";
				} else if (building_here != null){
					txt_in_cell = Config.building_icons[building_here];
				}
				txt += `<div id='cell-${x}-${y}' class='cell ${tile_class}'>${txt_in_cell}</div>`;
			}
			txt += "</div>";
		}
		$("#map").html(txt);
	}

	hover(x, y){	
		if (game.map.at(x, y) != 'empty' || game.buildings.at(x, y) != null){
			return;
		}		
		let are_they_placing = this.placing(x, y);
		if (are_they_placing){
			return;
		}
		$(`#cell-${x}-${y}`).css('cursor', 'pointer');

		if (game.map.at(x, y) == 'empty' && game.player.is_buying != null && game.buildings.can_go_here(x, y, game.player.is_buying)){
			$(`#cell-${x}-${y}`).html(Config.building_icons[game.player.is_buying]);
		}
	}

	leave(x, y){
		
		if (game.player.is_at(x, y) || game.player.is_building_at(x, y) || game.buildings.at(x, y) != null){
			return;
		}
		$(`#cell-${x}-${y}`).html("");
		$(`#cell-${x}-${y}`).css('cursor', 'default');
		$('.placing').html('');
		$(".cell").removeClass('placing');
	}
	place_horizontally(x, y, delta, max){
		let from_x = game.player.is_building.x;
		let n = 0;
		for(let pos_x = from_x; pos_x <= x; pos_x += delta.x){
			$(`#cell-${pos_x}-${y}`).html(Config.building_icons[game.player.is_buying]);
			$(`#cell-${pos_x}-${y}`).addClass('placing');
			n ++;
			if (n >= max){
				return;
			}			
		}
	}

	place_vertically(x, y, delta, max){
		let from_y = game.player.is_building.y;
		let n = 0;
		for(let pos_y = from_y; pos_y <= y; pos_y += delta.y){
			$(`#cell-${x}-${pos_y}`).html(Config.building_icons[game.player.is_buying]);
			$(`#cell-${x}-${pos_y}`).addClass('placing');
			n ++;
			if (n >= max){
				return;
			}
		}	
	}

	placing(x, y){
		if (game.player.is_building == null){
			return false;
		}
		let from_x = game.player.is_building.x;
		let from_y = game.player.is_building.y;
		let how_many_they_can_buy = game.buildings.how_many_they_can_buy(game.player.is_buying);
		let delta = game.map.fetch_delta(from_x, from_y, x, y);
		if (delta.x != 0 && delta.y != 0 ){
			return;
		}
		if (delta.x != 0){
			this.place_horizontally(x, y, delta, how_many_they_can_buy);
		} else if (delta.y != 0){
			this.place_vertically(x, y, delta, how_many_they_can_buy);
		}
		
	}

	refresh(){	
		this.display_map();
		$("#money").html(`$${game.player.money}`);
		let balance_after_expenses = game.player.money - game.player.fetch_expenses();
		$("#end_of_day_money").css('color', 'black');
		if (balance_after_expenses < 0){
			$("#end_of_day_money").css('color', 'red');
		}
		$("#next").prop('disabled', false);
		if (Config.max_moves - game.player.moves > 0){
			$("#next").prop('disabled', true);
		}
		$("#end_of_day_money").html(`(${ balance_after_expenses })`)
		$("#moves").html(Config.max_moves - game.player.moves);
		this.display_buy_menu();
	}
}
