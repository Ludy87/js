(function($) {
	$.fn.all = function() {
		$.fn.all.top();
		$.fn.all.powerBarFix();
	}
	$.fn.all.powerBarFix = function() {
	    	$('.headerMain, .headerMain-forum').css('margin-top', '30px');
	    	$('.powerbarContainer').css('position', 'fixed').css('margin-top', '-30px').css('z-index', '100').css('width', '100%');
	};
	$.fn.all.top = function() {
		$('.forumThreadListPageLabelFixed, .instantScrollAnchor, .forumThreadListPageLabelFixedInside').remove();
		$("body").append('<a href="#0" class="cd-top" style="border-radius: 50px; z-index: 100; left: 50%;">Top</a>');
		var offset = 300,
		offset_opacity = 1200,
		scroll_top_duration = 700, // 700
		$back_to_top = $('.cd-top');
	
		$(window).scroll(function(){
			( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
			if( $(this).scrollTop() > offset_opacity ) { 
				$back_to_top.addClass('cd-fade-out');
			}
		});
	
		$back_to_top.on('click', function(event){
			event.preventDefault();
			$('body,html').animate({
				scrollTop: 0 ,
			 	}, scroll_top_duration
			);
		});
		$.ajax({
			url: 'https://raw.githubusercontent.com/Ludy87/js/master/backToTop.css',
			dataType: 'text',
			success: function(data) {
				$('<style type="text/css">\n' + data + '</style>').appendTo("head");                    
			}                  
		});
	}
}(jQuery));
