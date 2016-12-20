$(function(){
  init()
  var search = $(".search-go")
  search.on('click', function(){
    search_key = $('input').val()
    url = "http://www.ximalaya.com/search/" + search_key +".ajax"
    get_http_result(url, function(data){
      var result = $(".search-result")
      result.empty()
      result.html($(data.html).find('.report_album .content_wrap2'))
      result.show()
      $('.sm2-bar-ui').removeClass('playlist-open')
      handle_click()
    })
  })

})

var action = {
  BASE_URL: "http://www.ximalaya.com",
}

function handle_click(){
  $(".search-result a").click(function(event){
    event.preventDefault();
    var href = this.pathname
    if(href.match(/^\//)){href = action.BASE_URL + this.pathname}
    get_http_result(href, function(data){
      var wrapper = $(".sm2-playlist-wrapper")
      wrapper.empty()

      wrapper.html($(data).find('.album_soundlist'))
      $('.album_soundlist .operate').remove()
      $('.album_soundlist span').remove()
      $('.search-result').hide()
      $('.sm2-bar-ui').addClass('playlist-open')
    })

  })
}

//get "http://www.ximalaya.com/search/search_key.ajax"
function get_http_result(url, callback){
  console.log(url)
  $.ajax({
    type: 'GET',
    // async: false,
    url: url,
    success: function(data){
      callback(data)
    },
    error: function(error){
      console.log(error)
    },
  })
}

function init(){
  url = "http://www.ximalaya.com/dq/book"
  get_http_result(url, function(data){
    var result = $(".search-result")
    result.empty()
    result.html($(data).find('.discoverAlbum_wrapper'))
    $('.albumfaceOutter').remove()
    $('.discoverAlbum_wrapper .miniPlayer3').remove()
    handle_click()
  })
}

function translate_url(url){
  var ids = url.split('/')
  var s_id = ids[ids.length-1]
  var href = action.BASE_URL + '/tracks/' + s_id + '.json'
  var new_href = ''
  get_http_result(href, function(data){
    new_href = data.play_path
  })
  return new_href
}
window.translate_url = translate_url
// http://www.ximalaya.com/tracks/12949982.json