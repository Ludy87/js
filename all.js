(function($) {
  $.fn.all = function() {
    $('.forumThreadListPageLabelFixed, .instantScrollAnchor, .forumThreadListPageLabelFixedInside').remove();
  	$("body").append('<a href="#0" class="cd-top" style="border-radius: 50px; z-index: 100; left: 50%;">Top</a>');
  	var offset = 300,
  	offset_opacity = 1200,
  	scroll_top_duration = 700,
  	$back_to_top = $('.cd-top');
  	$(window).scroll(function(){
  	  console.log(this)
  	})
  }
}(jQuery));
