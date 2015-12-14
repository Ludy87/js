var textZeile = $("#formRegister").find(".group")[2];
//$(textZeile).before("<div class=\"group bottommargin10\"><a href=\"#\" style=\"margin: 1px; padding: 2px !important;\" class=\"defaultButton btn-primary-small padding-y-small\">StandardTexte</a><div class=\"siteload\" style=\"display: none;\"><ul class=\"myMenu\"></ul><div style=\"clear:both;\"></div></div>");
$(textZeile).before("<div class=\"group bottommargin10\"><div class=\"col3\"><label><strong>StandardTexte</strong></label></div><div class=\"col9 last\"><div class=\"siteload\" style=\"display: inline-block;\"><ul class=\"myMenu\"></ul><div style=\"clear:both;\"></div></div></div>");

myThis.chrome.storage.local.get("text", function(items) {
	$.each(items["text", function(index, value) {
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
	if(text.indexOf("%Name%") >= 0 || text.indexOf("%te%") >= 0 || text.indexOf("%ModName%") >= 0) {
		text = text.replace('%Name%' ,$("#receiverName").val()).replace('%te%' ,$("#receiverName").val()).replace('%ModName%' ,$("#senderName").val());
	}
	$("textarea#text").val(text);
	return false;
});
