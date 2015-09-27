(function($) {
	/**$( "body" ).delegate( "ul.threadPostOptionsButtons a", "click", function() {
		var mThis = this;
		if($(this).text().trim() == "Antworten") {
			$().ready(function() {
				setTimeout(writeSite, 1500);
			});
		} else if($(this).text().trim() == "Antworten mit Zitat") {
			$().ready(function() {
				setTimeout(function() {
					writeSite();
				}, 1500);
			});
		} 
	});**/
	$.fn.forum = function() {
		this.each(function() {
			var _this = this;
			$(this).delegate( "ul.threadPostOptionsButtons a", "click", function() {
				if($(this).text().trim() == "Antworten") {
					$.fn.forum.writeSite(_this);
				}
			});
			chrome.storage.sync.get({
				teVisable: false,
				adminSiteVisable: false,
				mailToVisable: false,
				pnChangerVisable: false,
				warningVisable: false,
				ipVisable: false,
				viewWarningVisable: false
			}, function (obj) {
				var header = ($(_this).find(".threadPostHeader"));
				var userID = $(header).find(".threadPostAuthorNameLink").attr("href").split("/")[2];
				var postid = ($(_this).data('postid'));
				//$(this).find(".threadPostHeader").next().remove();
				if(userID == "android") {
					userID = $(header).find(".threadPostAuthorNameLink").attr("href").split("=")[1];
				}
				if(userID != "android") {
					if(userID == "4361215" || userID == "2927890") {
						$(header).find(".threadPostAuthorName .user-badges span").first().append(" DEV");
					}
					if($(_this).attr('class') == "threadPost isThreadAuthor" && obj.teVisable) {
						$(_this).find(".threadPostAuthorName .threadPostAuthorNameLink").before("<span style=\"color: #43a8da;\">TE</span>");
					}
					$.fn.forum.warning(header, userID, obj.viewWarningVisable, obj.warningVisable);
					if(obj.ipVisable) {
						$.fn.forum.ip(header, postid, userID);
					}
					if(obj.adminSiteVisable) {
						$(header).after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + adminSite + userID + '">Adminseite</a>');
					}
					if(obj.pnChangerVisable) {
						$(header).after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + pnChange + userID + '">PN-Changer</a>');
					}
					if(obj.mailToVisable) {
						$(header).after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + mailTo + userID + '">Mail schreiben</a>');
					}
				}
		    	});
		});
	}
	
	$.fn.forum.writeSite = function(_this) {
		setTimeout(function() {
			var editor = $(_this).find("div.forumEditor");
			($(editor).prepend("<a href=\"#\" style=\"margin: 1px; padding: 2px !important;\" class=\"defaultButton btn-primary-small padding-y-small\">StandardTexte</a><div class=\"siteload\" style=\"display: none;\"><ul class=\"myMenu\"></ul><div style=\"clear:both;\"></div></div>"))
			chrome.storage.local.get(null, function(items) {
				var allKeys = Object.keys(items);
				console.log(allKeys)
			});
			
		}, 1500);
	/**$("div.forumEditor").prepend("<a href=\"#\" style=\"margin: 1px; padding: 2px !important;\" class=\"defaultButton btn-primary-small padding-y-small\">StandardTexte</a><div class=\"siteload\" style=\"display: none;\"><ul class=\"myMenu\"></ul><div style=\"clear:both;\"></div></div>");
		chrome.storage.local.get(null, function(items) {
			var allKeys = Object.keys(items);
		
			$.each(items, function(index, value) {
				if(value != "" && index != "" ) {
					if($(".schreib").text() != index) {
						var myvar = '<li><a href="#" class="schreib btn-primary-small padding-y-small" style="margin: 1px; padding: 2px !important;" data-text="' + (value) + '">' + decodeURIComponent(index) + '</a></li>';
						$("ul.myMenu").append(myvar);
					}
				}
			});
		});**/
	}
	
	$.fn.forum.workWithBugVal = function(val) {
		return val;
	}
	
	$.fn.forum.warning = function(header, userID, viewWarningVisable, warningVisable) {
		if($(header).find("div.threadPostWarningInfo a").attr("href") != undefined && viewWarningVisable) {
			$(header).after('<a class="btn-primary-small padding-y-small" style="background-color:#fe0000; margin-left: 1px;" href="' + listWarning + userID + '">Alle Verwarnungen</a>');
		}
		if(warningVisable) {
			$(header).after('<a class="btn-primary-small padding-y-small" style="background-color:#fe0000; margin-left: 1px;" href="' + warning + userID + '">Verwarnen</a>');
		}
	}
	
	$.fn.forum.ip = function(header, postid, userID) {
		$(header).after('<button class="btn-primary-small padding-y-small info' + postid + '" style="background-color:#fe0000; margin-left: 1px;" data-ip="'+postid+'">IP\'s</button>');
		$.get(adminSite + userID, function(my_var) {
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
			$(header).find(".threadPostAuthorAdminInfo").append("<li>" + (t) + "</li>");
			$(header).after('<table style="border: 1px solid black; border-radius: 5px; position: fixed; left: 50%; top: 50%; z-index: 9; background-color: beige; display: none;" class="infoTab' + postid + '">' + $(tr).html() + '</table>');
		});
		$( "body" ).delegate( "button.info" + postid, "click", function() {
			$('a.closer' + postid).parent().parent().remove();
			$('table.infoTab' + postid).prepend('<tr style="background-color: grey;line-height: 2;"><td style="text-align: center;"><a href="#" style="color: white" class="closer' + postid + '">schließen</a></td></tr>')
			$("table.infoTab" + postid).toggle();
		});
		$( "body" ).delegate('a.closer' + postid, "click", function() {
			$("table.infoTab" + postid).toggle();
			return false;
		});
	}

}(jQuery));
