(function($) {
  $.fn.all = function() {
    $('.forumThreadListPageLabelFixed, .instantScrollAnchor, .forumThreadListPageLabelFixedInside').remove();
  	$("body").append('<a href="#0">Top</a>');
  }
}(jQuery));
