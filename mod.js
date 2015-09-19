var hostPathLength = hostSplit.length;

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
var myT = window.myThis;
function Android () {
    this.getInfo = function() {
        this.chrome();
    };
    this.chrome = function() {
    	myT.chrome.storage.sync.get({
		teVisable: false,
		adminSiteVisable: false,
		mailToVisable: false,
		pnChangerVisable: false,
		warningVisable: false,
		ipVisable: false,
		viewWarningVisable: false
	}, function(items) {
		if(items.teVisable) {
			$("article.isThreadAuthor .threadPostAuthorName .threadPostAuthorNameLink").before("<span style=\"color: #43a8da;\">TE</span>");
		}
	});
				
    }
}
$(document).ready(function() {
	console.log(hostSplit);
});
