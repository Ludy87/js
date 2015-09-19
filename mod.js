$.get(isModURL, function(content) {
	var wrapper = $(content).find(".wrapper h1").text();
	if(wrapper === "Moderatoren-Forum") {
		
		if(area == "forum" && hostPathLength >= 6) {
			console.log(area);
		}
		$(".powerbarLinks").append('<a href="/de/android/admin/userSearch">Usersuche</a>');
		$(".navTopLeft").append('<a href="/de/android/admin/userSearch" class="navTopLeftLink"><span>Usersuche</span></a>');
		console.log(wrapper);
	} else {
		console.log(wrapper);
	}
});
var i = 0;
function Android () {
    this.getInfo = function() {
        console.log(isModURL);
        return;
    };
}
$(document).ready(function() {
	console.log(hostSplit);
});
