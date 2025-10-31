$(document).on('click', '', function(e){

});


$(document).on('click', '.buy', function(e){
	game.input.buy_button_pressed(e.currentTarget.id.split('-')[1]);
});

$(document).on('click', '.cell', function(e){	
	let x = Number(e.currentTarget.id.split('-')[1]);
	let y = Number(e.currentTarget.id.split('-')[2]);
	game.input.click(x, y);
	ui.refresh();
});

$(document).on('mouseleave', '.cell', function(e){
	let x = Number(e.currentTarget.id.split('-')[1]);
	let y = Number(e.currentTarget.id.split('-')[2]);
	ui.leave(x, y);
})

$(document).on('mouseover', '.cell', function(e){
	let x = Number(e.currentTarget.id.split('-')[1]);
	let y = Number(e.currentTarget.id.split('-')[2]);
	ui.hover(x, y);
})

$(document).on('keydown', 'body', function(e){	
	game.input.key(e.key.substring(5).toLowerCase());
	ui.refresh();
});

$(document).on('click', 'button', function(e){
	ui.refresh()
})


$(document).on('click', '#next', function(e){
	game.next_day();
})