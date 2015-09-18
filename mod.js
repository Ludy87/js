$.get(isModURL, function(content) {
	var wrapper = $(content).find(".wrapper h1").text();
	if(wrapper === "Moderatoren-Forum") {
		console.log(wrapper);
	} else {
		console.log(wrapper);
	}
});
$(document).ready(function() {});
