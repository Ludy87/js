var hostPathLength = hostSplit.length;

$.get(isModURL, function(content) {
	var wrapper = $(content).find(".wrapper h1").text();
	if(wrapper === "Moderatoren-Forum") {
		
		if(area == "forum" && hostPathLength >= 6) {
			
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
    	myThis.chrome.storage.sync.get({
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
		var header = $(".threadPostHeader").each(function(i,v) {
			var postid = $(this).parent().parent().parent().parent("article").data("postid");
			var userId = ($(v).find(".threadPostAuthorNameLink").attr("href").split("/")[2]);
			var userImageLink = ($(v).find(".threadPostAuthorImage img").attr("src").split("/")[2]);
			if(userId != "android") {
				if(userId == "4361215" || userId == "2927890") {
					$(this).find(".threadPostAuthorName .user-badges span").first().append(" DEV");
				}
				var thisC = this;
				$.get(adminSite + userId, function(my_var) {
					var tab = $(my_var).find("section table")[1];
					var tr = ($(tab).find("tbody tr")[0]);
					var tr1 = ($(tab).find("tbody tr")[3]);
					var tr2 = ($(tab).find("tbody tr")[4]);
					($(tr).children("td:first").remove());
					($(tr1).children("td:first").remove());
					($(tr2).children("td:first").remove());
					tr1text = $(tr1).find("td").html();
					tr1text1 = $(tr2).find("td").html();
					$(tr).find("td").append(tr1text + "<br>")
					$(tr).find("td").append(tr1text1 + "<br>")
					var trReg = ($(tab).find("tbody tr")[4]);
					trReg = $(trReg).text();
					var t = trReg.trim().split(" — ")[0];
					$(thisC).find(".threadPostAuthorAdminInfo").append("<li>" + (t) + "</li>");
					
					if($(thisC).find("div.threadPostWarningInfo a").attr("href") != undefined && items.viewWarningVisable) {
						$(thisC).after('<a class="btn-primary-small padding-y-small" style="background-color:#fe0000; margin-left: 1px;" href="' + listWarning + userId + '">Alle Verwarnungen</a>');
					}
					if(items.warningVisable) {
						$(thisC).after('<a class="btn-primary-small padding-y-small" style="background-color:#fe0000; margin-left: 1px;" href="' + warning + userId + '">Verwarnen</a>');
					}
					if(items.ipVisable) {
						$(thisC).after('<table style="border: 1px solid black; border-radius: 5px; position: fixed; left: 50%; top: 50%; z-index: 9; background-color: beige; display: none;" class="infoTab' + postid + '">' + $(tr).html() + '</table>');
						$(thisC).after('<button class="btn-primary-small padding-y-small info' + postid + '" style="background-color:#fe0000; margin-left: 1px;" data-ip="'+postid+'">IP\'s</button>');
					}
					if(items.adminSiteVisable) {
						$(thisC).after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + adminSite + userId + '">Adminseite</a>');
					}
					if(items.pnChangerVisable) {
						$(thisC).after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + pnChange + userId + '">PN-Changer</a>');
					}
					if(items.mailToVisable) {
						$(thisC).after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + mailTo + userId + '">Mail schreiben</a>');
					}
				});
			}
			$( "body" ).delegate( "button.info" + postid, "click", function() {
				$("table.infoTab" + postid).toggle();
			});
		});
	});
				
    }
}
$(document).ready(function() {
	console.log(hostSplit);
});
