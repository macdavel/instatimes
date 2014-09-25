var instaGdata = [];
var NYTData = [];

function createHTML(NY, IST){

	// $("#container").html("");

	var htmlString = "";
	// for (var i = 0; i<10;i++){
		htmlString +="<div class='box'>";
		htmlString += "<h3>"+NY.headline.main+"</h3>";
		htmlString += "<img src="+IST.images.low_resolution.url+" />";
		htmlString += "<p>"+NY.snippet+"</p>";

		htmlString += "</div>";
	// }
$("#container").append(htmlString);

}

function getInstagramData(theObj){

	var searchTerm = theObj.new_desk||theObj.subsection|| "news";

	console.log("searchTerm"); 


	var Instakey = "e7e7a1633a1a41efad508bc01b728544";
	var instaUrl = "https://api.instagram.com/v1/tags/news/media/recent?client_id="+Instakey;

	$.ajax({

		url: instaUrl,
		type: "GET",
		dataType: "jsonp",
		error: function(data){

			console.log("Insta we have a problem");
		},
		success: function(data){

			console.log("getting insta pictures");

			instaGObj = data.data[0];

			createHTML(theObj, instaGObj);	

		}


	});
}



function getNYTimesData(){
		
		console.log("Getting NY Times");

		var myNYTimesKey = "3f4fa7423c022a8e562b0ff9629c3d00:11:69850981";

		timesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=0&sort=newest&api-key="+myNYTimesKey;

		$.ajax({

			url: timesUrl,
			type: "GET",
			dataType: "json",
			error: function(data){

				console.log("Houston we have a problem");

			},

			success: function(data){
				console.log(data)

				NYTData= data.response.docs;

				for(i = 0; i<NYTData.length;i++){

					getInstagramData(NYTData[i])

				}


				;
			}
		});




		//

};



$(document).ready(function(){

//Make ajax request to NYTImes
getNYTimesData();



});


