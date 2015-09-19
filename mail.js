var textZeile = $("#formRegister").find(".group")[2];
$(textZeile).before("<a href=\"#\" style=\"margin: 1px; padding: 2px !important;\" class=\"defaultButton btn-primary-small padding-y-small\">StandardTexte</a><div class=\"siteload\" style=\"display: none;\"><ul class=\"myMenu\"></ul><div style=\"clear:both;\"></div></div>");

myThis.chrome.storage.local.get(null, function(items) {
	$.each(items, function(index, value) {
		if(value != "" && index != "" ) {
			if($(".schreib").text() != index) {
				var myvar = '<li><a href="#" class="schreib btn-primary-small padding-y-small" style="margin: 1px; padding: 2px !important;" data-text="' + value + '">' + decodeURIComponent(index) + '</a></li>';
				$("ul.myMenu").append(myvar);
			}
		}
	});
});
$( "body" ).delegate(".schreib", "click", function() {
	var text = $("textarea#text").val(); //$(this).data("text");
	text += decodeURIComponent($(this).data("text"));
	if(text.indexOf("%Name%") >= 0 || text.indexOf("%te%") >= 0) {
		text = text.replace('%Name%' ,$("#receiverName").val());
		console.log(text)
	}
	console.log($("textarea#text"));
	$("textarea#text").val(text);
	return false;
});
