//CONVERT md5 algorithm:
// var md5 = function(value) {
//     return CryptoJS.MD5(value).toString();
// }

var authentication = {
  hash: function(privateKey, publicKey){
    var ts;
    //get timestamp
    if(!Date.now) {
      Date.now = function() {
        return new Date().getTime();
      }
    }
    console.log(ts);
    return CryptoJS.MD5(Date.now()+ privateKey+ publicKey).toString()
  },
  username: ""

}

var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
var article1;
url += '?' + $.param({
  'api-key': "457327e065144caaa20e42109891b60f"
});
function findGoldilocksImg(articleAllMedia){
      for (var i=0; i < articleAllMedia.length; i++) {
        if(articleAllMedia[i].format == "Normal") {
          return articleAllMedia[i].url;
        }
      }
    };
var response;
$.ajax({
  url: url,
  method: 'GET',
  dataType: 'jsonp'
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
  response = data;
  article1 = new agg(articleHeadline, articleByline, articleURL, articleAllMedia);
}).fail(function(err) {
  throw err;
})

function agg(title, byline, link, multimedia) {
  this.title = title;
  this.byline = byline;
  this.link = link;
  this.img =
    findGoldilocksImg(multimedia);
  
  this.wrapper = "<div class='article'>"
}



// insert jquery dynamically for testing: 
/*

var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

*/