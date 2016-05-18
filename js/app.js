var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url += '?' + $.param({
  'api-key': ""
});
var response;
$.ajax({
  url: url,
  method: 'GET',
}).done(function(data) {
  console.log(data);
   for(var i =0; i<data.results.length; i++){
   	var articleHeadline = data.results[i].title;
  	var articleByline = data.results[i].byline;
   	var articleURL = data.results[i].url;
   	var articleAllMedia = data.results[i].multimedia;
   	function findGoldilocksImg(){
   		for (var i=0; i < articleAllMedia.length; i++) {
   			if(articleAllMedia[i].format == "Normal") {
   				return articleAllMedia[i].url;
   			}
   		}
   	};
   	$('.results').append('<li><img src="'+ findGoldilocksImg(articleAllMedia) + '"><a href="'+ articleURL + '">' + articleHeadline +'</a></li>');
   } 
  response = data
}).fail(function(err) {
  throw err;
})