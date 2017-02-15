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
var GUIDEBOX_SEARCH_BASE_URL = "http://api-public.guidebox.com/v2/search";

function getTitleDataFromAPI(searchTerm, callback) {
    var query = {
        type: 'movie',
        field: 'title',
        query: searchTerm,
        api_key: '65fd44fa012e778f220d1e1c8f8dd0f2642fb87d',
        //maxResults: 6
    }
    console.log(query);
    $.getJSON(GUIDEBOX_SEARCH_BASE_URL, query, callback);
    console.log(callback);
}

function displayGUIDEBOXTITLESearchData(data){
    var resultElement = '';
    if (data.results) {
        data.results.forEach(function(item) {
            //resultElement += '<div class="js-search-thumbnail">' + item.snippet.thumbnails.medium.url + '</div>';
            resultElement += '<li>' + item.title + ' - <button class="js-select-movie" data-id=">' + item.id + '"/>Select movie</button></li>';
    });
  }
    else {
        resultElement += '<p>No result</p>'
    }
  $('.js-search-results').html('<ul>' + resultElement + '</ul>');
}

function watchSubmit() { // pass argument from search box
    $('.js-search-form').submit(function(event){
        event.preventDefault();
        var query = $(this).find('.js-query').val();
        //alert(query);
        getTitleDataFromAPI(query, displayGUIDEBOXTITLESearchData);
    });
}
// Create function to submit search terms  - callback function

$(function(){
    $('.nojs-warning').remove(); // removes div containing "no js" warning
    watchSubmit();
});