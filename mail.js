var textZeile = $("#formRegister").find(".group")[2];
$(textZeile).before("<a href=\"#\" style=\"margin: 1px; padding: 2px !important;\" class=\"defaultButton btn-primary-small padding-y-small\">StandardTexte</a><div class=\"siteload\" style=\"display: none;\"><ul class=\"myMenu\"></ul><div style=\"clear:both;\"></div></div>");
$( "body" ).delegate( "a.defaultButton", "click", function() {
	console.log($(".siteload"))//.toggle();
	return false;
});
myThis.chrome.storage.local.get(null, function(items) {
	var allKeys = Object.keys(items);

	var zahl = $("a.schreib").length;
	$.each($("a.schreib"), function(i,v) {
		//console.log(i + " : " + zahl)
	})
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
	var text = $(this).data("text");
	text = decodeURIComponent(text);
	if(text.indexOf("%Name%") >= 0) {
		text = text.replace('%Name%' ,$("#receiverName").val());
		console.log(text)
	}
	console.log($("textarea#text"));
	$("textarea#text").val(text);
	return false;
});
