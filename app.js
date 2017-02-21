// https://www.googleapis.com/youtube/v3/search?pageToken=CBkQAA&part=snippet&maxResults=25&order=relevance&q=site%3Ayoutube.com&topicId=%2Fm%2F02vx4&key={YOUR_API_KEY}
// Event handlers

$('body').on('click', '.js-activate-thumbnail',function (event) {
    event.preventDefault(); // do not submit yet
    // alert($(this).siblings('.overlay').attr('id'));
    var idToOpen = '#' + $(this).data('id');
    $(idToOpen).toggle();
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

// *** Block for movie ID search portion **************
// *** Create the API url variable = endpoint ******

const GUIDEBOX_SEARCH_BASE_URL = "http://api-public.guidebox.com/v2/search"; // Link for movie ID search
const GUIDEBOX_MOVIE_BASE_URL = "http://api-public.guidebox.com/v2/movies/"; // link for movie info

const getTitleDataFromAPI = (searchTerm, callback) => {
    const query = {
        type: 'movie',
        field: 'title',
        query: searchTerm,
        api_key: '65fd44fa012e778f220d1e1c8f8dd0f2642fb87d'
        //maxResults: 6
    }
    //console.log(query);
    $.getJSON(GUIDEBOX_SEARCH_BASE_URL, query, callback);
    //console.log(callback);
}

const displayGUIDEBOXTITLESearchData = (data) => {
    let resultElement = '';
    if (data.results) {
        data.results.forEach( (item) => {
            //resultElement += '<div class="js-search-thumbnail">' + item.snippet.thumbnails.medium.url + '</div>';
            resultElement += `<div class="js-movie-search-thumbnail">
        <a href="#" class="js-movie-thumbnail"><img src="${item.poster_120x171}" class="js-movie-thumbnail" /></a>
        <div class="js-movie-search-title">${item.title}</div>
        <div><button class="js-select-movie" data-id="${item.id}">Select movie</button></li></div>
      </div>`;
    });
  }
    else {
        resultElement += `<p>No result</p>`
    }
  $('.js-movie-search-results').html(`${resultElement}`);
  $('.movie-result-container').toggle();
}

$('body').on('click','.js-select-movie', (event) => {
    event.preventDefault(); // do not submit yet
    //alert($(this).siblings('.overlay').attr('id'));
    const idToPass = $(event.target).data('id');
    $('.movie-result-container').toggle();
    // call new function to retrieve movie information
    getMovieDataFromAPI(idToPass);
});

// *** End movie search Block ******
// *********************************

// *** Wrapper function - retrieves all movie data ***************************

const getMovieDataFromAPI = (movieID) => {    
    getMovieInfoFromAPI(movieID, displayGUIDEBOXMovieInfo);
    getMovieInfoFromAPI(movieID, displayGUIDEBOXSourceData);
    getMovieTrailerFromAPI(movieID, displayGUIDEBOXTrailerData);
}

const getMovieInfoFromAPI = (movieID, callback) => {
    const query = {
        api_key: '65fd44fa012e778f220d1e1c8f8dd0f2642fb87d'
        //maxResults: 6
    }
    $.getJSON(GUIDEBOX_MOVIE_BASE_URL + movieID, query, callback);
    // console.log(callback);
}

const getMovieTrailerFromAPI = (movieID, callback) => {
    const query = {
        api_key: '65fd44fa012e778f220d1e1c8f8dd0f2642fb87d'
    }
    let trailerURL = `${GUIDEBOX_MOVIE_BASE_URL}${movieID}/videos?limit=1&sources=guidebox`
    //alert(trailerURL);
    $.getJSON(trailerURL, query, callback);
    console.log(callback);
}

// *** Block for movie information portion  - based on movie id **************

const displayGUIDEBOXMovieInfo = (data) => {
    let reviewElement = '';
    let overviewElement = '';
    if (data.id) {
        reviewElement += 
           `<div class="js-movie-review-thumbnail">
                <a href="#" class="js-movie-review-thumbnail"><img src="${data.poster_240x342}" class="js-movie-thumbnail" /></a>
                <div class="js-movie-review-title">${data.title}</div>
            </div>`;
        overviewElement += 
            `<div class="js-movie-review-overview">
                <p>${data.overview}</p>
            </div>`;
    }
    
//<div><button class="js-movie-sources" data-id="${data.id}">Find Sources</button></li></div>

    else {
        reviewElement += `<p>No result</p>`;
        overviewElement = ``;
    }

    $('.movie-review').html(`${reviewElement}`);
    $('.movie-overview').html(`${overviewElement}`);
    $('.movie-review-container').toggle();
}

$('body').on('click','.js-movie-sources',function (event) {
    event.preventDefault(); // do not submit yet
    var idToPass = $(this).data('id');
    // alert(idToPass);
    $('.movie-review-container').toggle();
    // call new function to retrieve movie information
    getSourceDataFromAPI(idToPass, displayGUIDEBOXSourceData);
    $('.movie-source-container').toggle();
});

// *** End movie search Block ******
// *********************************

// *** Block for source search portion  - based on movie id **************

const displayGUIDEBOXSourceData = (data) => {
    let resultElement = '';
    if (data.purchase_web_sources) {
        data.purchase_web_sources.forEach( (item) => {
            //resultElement += '<div class="js-search-thumbnail">' + item.snippet.thumbnails.medium.url + '</div>';
            resultElement += `<li>${item.source}</li>`;
    });
  }
    else {
        resultElement += '<p>No result</p>'
    }
  $('.movie-source-container').html(`
    <div>If you want to purchase the movie, it is available at the following suppliers:
        <ul>
            ${resultElement}
        </ul>
    </div>

  `);
  $('.movie-source-container').toggle();
}

// *** End movie Source Block ******
// *********************************

// *** Block for trailer search portion  - based on movie id **************

const displayGUIDEBOXTrailerData = (data) => {
    let trailerElement = '';
    let videoElement = '';
    let buttonElement = '';
    if (data.results) {
        data.results.forEach( (item) => {
            //resultElement += '<div class="js-search-thumbnail">' + item.snippet.thumbnails.medium.url + '</div>';
            item.free_web_sources.forEach( (vidItem) => {
            //resultElement += '<div class="js-search-thumbnail">' + item.snippet.thumbnails.medium.url + '</div>';
                videoElement += `${vidItem.link}`;
                //alert(videoElement);
            });
            trailerElement += `
            <div id="js-overlay__${item.id}" class="overlay">
                <div class="inner-overlay">	
                    <iframe id="video-${item.id} width="900" height="600" src="${videoElement}" frameborder="0" style="border: solid 4px #37474F"></iframe>	
                    <p>click here to [<a href="#" class="js-close-thumbnail" data-id="js-overlay__${item.id}">close</a>]</p>
                </div>
            </div>
            `;
            buttonElement += `
            <a data-id="js-overlay__${item.id}" href="${videoElement}" target="_blank">Watch the trailer</a>
            `;

        });
    }
    else {
        trailerElement += '<p>No result</p>'
        buttonElement = '';
    }
  //$('.movie-trailer').html(`${trailerElement}`);
  $('.movie-trailer-button').html(`${buttonElement}`);
}

// *** End movie trailer Block ******
// *********************************

function createRatingsView(ratings) {
    const newRatings = `This movie got ${ratings} stars`;
    return `
        <div class="ratings">${newRatings}</div>
    `;
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