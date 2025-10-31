$(document).on('click', '', function(e){

})
$(document).on('keydown', 'body', function(e){	
	game.input.key(e.key.substring(5).toLowerCase());
	ui.refresh();
});

$(document).on('click', 'button', function(e){
	ui.refresh()
})
