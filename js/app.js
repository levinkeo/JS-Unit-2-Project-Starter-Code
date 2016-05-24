//CONVERT md5 algorithm:
// var md5 = function(value) {
//     return CryptoJS.MD5(value).toString();
// }


/*********************************************************************************
                                  MARVEL Universe API
********************************************************************************/
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* Authentication  */

var hashAr;
var authentication = {
  hash: function(privateKey, publicKey){
    //get timestamp
    if(!Date.now) {
      Date.now = function() {
        return new Date().getTime();
      }
    }
    var ts = Date.now();    
    console.log(ts);
    hashArr= [ts, CryptoJS.MD5(ts + privateKey + publicKey).toString()];
    return hashArr;
  },
  private_key: "PRIVATE KEY GOES HERE",
  public_key: "PUBLIC KEY GOES HERE"

}


/* Marvel Request */

var marvelURLParams = "?apikey="+ authentication.public_key + "&hash=" + authentication.hash(authentication.private_key, authentication.public_key)[1] + "&ts=" + String(hashArr[0]).split('&_')[0];
var marvelResponse;
function makeMarvelRequest(baseUrl, whereTo, offset){
  $.ajax({
    url: baseUrl + marvelURLParams.split('&_')[0] + offset,
    method: 'GET',
    dataType: 'json'
  }).done(function(data) {
    console.log(data);
    marvelResponse = data;
     for(var i =0; i<data.data.results.length; i++){
      if(data.data.results[i].description){
        if(data.data.results[i].name){
          var articleHeadline = data.data.results[i].name;
          var articleByline = data.data.results[i].description;
        } else if (data.data.results[i].title) {
          var articleHeadline = data.data.results[i].title;
          var articleByline = data.data.results[i].description;
        }
        var articleURL = data.data.results[i].resourceURI; 
        var articleAllMedia = data.data.results[i].thumbnail.path + '/standard_large.jpg';
        // function findGoldilocksImg(){
        //   for (var i=0; i < articleAllMedia.length; i++) {
        //     if(articleAllMedia[i].format == "Normal") {
        //       return articleAllMedia[i].url;
        //     }
        //   }
        // };
         var article = new Agg(articleHeadline, articleByline, articleURL, articleAllMedia);
        $(whereTo).append('<li><div><img src="'
                            + article.img 
                            + '"><a href="'
                            + article.link
                            + '">' 
                            + article.title 
                            +'</a>' 
                            + articleByline 
                            + '</div></li>');
       } 
   }
    
    article1 = new Agg(articleHeadline, articleByline, articleURL, articleAllMedia);
  }).fail(function(err) {
    throw err;
  })
};

makeMarvelRequest("http://gateway.marvel.com:80/v1/public/characters",".results:first-of-type ul", '');
makeMarvelRequest("http://gateway.marvel.com:80/v1/public/events", ".results:nth-of-type(2) ul", '');
makeMarvelRequest("http://gateway.marvel.com:80/v1/public/events", ".results:nth-of-type(3) ul", '&offset=20');
makeMarvelRequest("http://gateway.marvel.com:80/v1/public/events", ".results:nth-of-type(4) ul", '&offset=30');

/*********************************************************************************
                New York Times API | http://developer.nytimes.com/
********************************************************************************/

var urlNYT = "https://api.nytimes.com/svc/topstories/v2/home.json";
var article1;
urlNYT += '?' + $.param({
  'api-key': ""
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
  url: urlNYT,
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

function Agg(title, byline, link, multimedia) {
  this.title = title;
  this.byline = byline;
  this.link = link;
  this.img = multimedia;
    // findGoldilocksImg(multimedia);
  
  this.wrapper = "<div class='article'>"
}

$(function(){
  $('.revealAuthors').on('click', function(){
    $('.authors').toggleClass('slideIn');
    $('.results:nth-of-type(4)').toggleClass('slideOut')
  })
});


// insert jquery dynamically for testing: 
/*

var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

*/