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
function button(uri, msg) {
	return '<a class="btn-primary-small padding-y-small" style="background-color:#fe0000; margin-left: 1px;" href="'+ uri +'">'+ msg +'</a>';
}
$(document).ready(function() {});
