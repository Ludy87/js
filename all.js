(function($) {
  $.fn.all = function() {
    $('.forumThreadListPageLabelFixed, .instantScrollAnchor, .forumThreadListPageLabelFixedInside').remove();
  	$("body").append('<a href="#0" class="cd-top" style="border-radius: 50px; z-index: 100; left: 50%;">Top</a>');
  }
}(jQuery));
