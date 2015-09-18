$(".powerbarLinks").append('<a href="/de/android/admin/userSearch">Usersuche</a>');
$(".navTopLeft").append('<a href="/de/android/admin/userSearch" class="navTopLeftLink"><span>Usersuche</span></a>');
$.get(isModURL, function(data) {
	var wrapper = $(data).find(".wrapper h1").text();
	var host = window.location.href;
	var hostSplit = host.split("/");
	var hostPathLength = hostSplit.length;
	var area = hostSplit[3];
	var mail = hostSplit[6];
	if(wrapper === "Moderatoren-Forum") {
		if (mail == undefined && hostPathLength == 4) {
			
		} else if(area == "forum" && hostPathLength >= 6) {
			console.log(area)
		}
		
	}
});
