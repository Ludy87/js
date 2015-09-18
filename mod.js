$.get(app + "/wortfilter.txt", function(content) {
	$('body').removeHighlight();
	$.each(content.split(","), function(i,v) {
		if (v) {
			console.log(i + " " + v);
			if(!$("span").hasClass(".highlight")) {
				var high = ($('body').highlight( v ));
			}
			$(".filter").show();
		}
	});
	$(".highlight").css({"background-color": items.wordFilterColor, "color": items.wordFilterColorText});
})
.fail(function() {
	$(".filter").text("Error: Wordfilterdatei ist default");
	$(".filter").show();
});
