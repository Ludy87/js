$.get(isModURL, function(content) {
	var wrapper = $(content).find(".wrapper h1").text();
	if(wrapper === "Moderatoren-Forum") {
		console.log(wrapper);
	}
});
