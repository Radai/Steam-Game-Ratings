//$("#gameList").load("http://steamcommunity.com/id/radai/games?tab=all&l=english&callback=?");

$("#txtID").keyup(function(e){
	if(e.keyCode == 13){ //if enter is pressed
		// var response = $.getJSON("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=6551B62093392D50C7AB2C359F185E00&steamid=76561198030923623&format=json&include_appinfo=1&callback=?", function(){

		// }, "json")
		// .done(function(data){
		// 	$("#gameList").text(data);
		// })
		// .fail(function(data){
		// 	console.log("Fail: " + data);
		// })
		// .always(function(data){

		// });
		// console.log(response);
		$("#gameList").empty();

		$.ajax({                                                                                                                                                                                                        
		    type: 'GET',                                                                                                                                                                                                 
		    url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=6551B62093392D50C7AB2C359F185E00&steamid=' + $("#txtID").val() + '&format=json&include_appinfo=1',
		    dataType: 'jsonp',                                                                                                                                                                                                
		    success: function(data) {
		    	var div = $("<table>");
		    	var tabletr = $("<tr>");
		    	tabletr.append($("<td class='name-header name'>").text("Game Name"));
		    	tabletr.append($("<td class='ignrating-header ignrating'>").text("IGN Rating"));
		    	div.append(tabletr);

		    	$(data.response.games).each(function(){
		    		makeRow(div, this);
		    	});
		    	$("#gameList").append(div);
		    },                                                                                                                                                                                       
		    error: function() { console.log('Uh Oh!'); },
		    jsonp: 'jsonp'                                                                                                                                                
		});

		function makeRow(div, game){
			var rating = 0;
			$.ajax({
				type: 'GET',
				url: 'https://videogamesrating.p.mashape.com/get.php?count=1&game=' + game.name,
				beforeSend: function (request)
	            {
	                request.setRequestHeader("X-Mashape-Key", "kq9C90qie4mshlR3pGu5FlsYs3Fxp1lHJZejsnv7t7GZY5Z7Y6");
	            },
				dataType: 'json',
				// async: false,
				success: function(data){
					if(data[0] && data[0].score){
						var tr = $("<tr>");
						rating = data[0].score;
						tr.append($("<td class='name'>").html("<a href='steam://store/" + game.appid + "'>" + game.name + "</a>"));
						var td = $("<td class='ignrating'>").text(rating);
						if(rating >= 8.5){
							td.addClass("best");
						}else if(rating >= 7){
							td.addClass("good");
						}else if(rating >= 5){
							td.addClass("bad");
						}else{
							td.addClass("worst");
						}
						tr.append(td);

						div.append(tr);
					}
				}
			});
		}
	}
});