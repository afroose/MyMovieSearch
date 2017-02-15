// https://www.googleapis.com/youtube/v3/search?pageToken=CBkQAA&part=snippet&maxResults=25&order=relevance&q=site%3Ayoutube.com&topicId=%2Fm%2F02vx4&key={YOUR_API_KEY}
// Event handlers

$('body').on('click', '.js-activate-thumbnail',function (event) {
    event.preventDefault(); // do not submit yet
    // alert($(this).siblings('.overlay').attr('id'));
    $(this).siblings('.overlay').toggle();
    // $(this).siblings('.overlay').hide();
    // $(this).css('display', 'none'); 
});
$('body').on('click','.js-close-thumbnail',function (event) {
    event.preventDefault(); // do not submit yet
    //alert($(this).siblings('.overlay').attr('id'));
    var idToClose = '#' + $(this).data('id');
    $(idToClose).toggle();
    // $(this).siblings('.overlay').hide();
    // $(this).css('display', 'none'); 
});

// Create the API url variable = endpoint
var YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromAPI(searchTerm, callback) {
    var query = {
        part: 'snippet',
        key: 'AIzaSyBJLEg8YkdX6NcE0qn0TPQejmIdsnNGVBM',
        q: searchTerm,
        maxResults: 6
    }
    console.log(query);
    $.getJSON(YOUTUBE_BASE_URL, query, callback);
    console.log(callback);
}

function displayYOUTUBESearchData(data){
    var resultElement = '';
    if (data.items) {
        data.items.forEach(function(item) {
            resultElement += '<div class="js-search-thumbnail">' +
            '<a href="#" class="js-activate-thumbnail"><img src="' + item.snippet.thumbnails.medium.url + '" class="js-video-thumbnail"/></a>' +
            '<div class="js-search-title">' + item.snippet.title + '.</div>' +
            '<div class="js-search-channel">Click <a href="https://www.youtube.com/channel/' + item.snippet.channelId + '" target="_blank">here</a> for more from ' + item.snippet.channelTitle + '.</div>' +
            '<div id="js-overlay__' + item.id.videoId + '" class="overlay">' +
            '<div class="inner-overlay">' +
            '<iframe id="video-' + item.id.videoId + '" width="854" height="480" src="https://www.youtube.com/embed/' + item.id.videoId + '?enablejsapi=1&amp;rel=0" frameborder="0" style="border: solid 4px #37474F"></iframe>' +		 
            '<p>click here to [<a href="#" class="js-close-thumbnail" data-id="js-overlay__' + item.id.videoId + '">close</a>]</p>' +
            '</div>' +
            '</div>' +
            '</div>';
            //resultElement += '<p>' + item.snippet.title + '</p>';
    });
  }
    else {
        resultElement += '<p>No result</p>'
    }
  $('.js-search-results').html(resultElement);
}

function watchSubmit() { // pass argument from search box
    $('.js-search-form').submit(function(event){
        event.preventDefault();
        var query = $(this).find('.js-query').val();
        //alert(query);
        getDataFromAPI(query, displayYOUTUBESearchData);
    });
}
// Create function to submit search terms  - callback function

$(function(){
    $('.nojs-warning').remove(); // removes div containing "no js" warning
    watchSubmit();
});