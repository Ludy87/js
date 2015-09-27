(function($) {
	
    $.fn.forum = function() {
        this.each( function() {
            //$(this).text();
			var header = ($(this).find(".threadPostHeader"));
			var userID = $(header).find(".threadPostAuthorNameLink").attr("href").split("/")[2];
			var postid = ($(this).data('postid'));
			//$(this).find(".threadPostHeader").next().remove();
			if(userID == "android") {
				userID = $(header).find(".threadPostAuthorNameLink").attr("href").split("=")[1];
			}
			if(userID != "android") {
				if(userID == "4361215" || userID == "2927890") {
					$(header).find(".threadPostAuthorName .user-badges span").first().append(" DEV");
				}
				$.fn.forum.warning(header, userID)
				$.fn.forum.ip(header, postid, userID); 
				$(header).after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + adminSite + userID + '">Adminseite</a>');
				$(header).after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + pnChange + userID + '">PN-Changer</a>');
				$(header).after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + mailTo + userID + '">Mail schreiben</a>');

			}
        });
		
    }
	
	$.fn.forum.warning = function(header, userID) {
				if($(header).find("div.threadPostWarningInfo a").attr("href") != undefined) {
					$(header).after('<a class="btn-primary-small padding-y-small" style="background-color:#fe0000; margin-left: 1px;" href="' + listWarning + userID + '">Alle Verwarnungen</a>');
				}
				$(header).after('<a class="btn-primary-small padding-y-small" style="background-color:#fe0000; margin-left: 1px;" href="' + warning + userID + '">Verwarnen</a>');
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