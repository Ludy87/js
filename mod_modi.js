if (mail == undefined && hostPathLength == 4) {
	$( "body" ).delegate( "button.replyForm", "click", function() {
		if($(this).text().trim() == "Antworten") {
			var commentId = $(this).data("reply");
			console.log(commentId.commentId);
			$("li#comment" + commentId.commentId + " .replyFormDiv").append("<div class=\"siteload\"><ul class=\"myMenu\"></ul><div style=\"clear:both;\"></div></div>");
				myThis.chrome.storage.local.get(null, function(items) {
					var allKeys = Object.keys(items);
					var zahl = $("a.schreib").length;
					$.each($("a.schreib"), function(i,v) {
						console.log(i + " : " + zahl)
					})
					$.each(items, function(index, value) {
						if(value != "" && index != "" ) {
							if($(".schreib").text() != index) {
								var myvar = '<li><a href="#" style="padding: 2px;" class="schreib btn-primary-small padding-y-small" data-text="' + value + '">' + decodeURIComponent(index) + '</a></li>';
								$("ul.myMenu").append(myvar);
							}
						}
					});
					
			
					$( "body" ).delegate(".schreib", "click", function() {
						var text = $("#commentTextarea" + commentId.commentId).val();
						//$(this).data("text");
						text += decodeURIComponent($(this).data("text"));
						console.log(".newComment textarea#commentTextarea" + text);
						
						setTimeout(writeText(text,commentId.commentId), 500);
						
						return false;
					});
			});
		}
	});
} else if(area == "forum" && hostPathLength >= 6) {
	$.ajax({
	    url : userS,
	    type: "GET",
	    success: function(data, textStatus, jqXHR)
	    {
	    	var form = $(data).find(".adminBox form")[2];
	    	$(form).find('input[type=submit]').attr('class', 'btn-primary-small padding-y-small');
	    	//$(form).find('label').attr('style',"");
	    	$(form).find('label').css('display',"none");
	    	$(form).find('input#searchIpAddress').attr('size',"");
	    	$(form).find('input#searchIpAddress').attr('placeholder',"IP-Adresse");
	        $(".forumThreadAdLeaderboardTop").after('<div><form action="/de/android/admin/userSearch" method="post">'+$(form).html()+'</form></div>');

	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	 
	    }
	});
} else if(admin === "admin" && hostPathLength === 7) {
	$.getScript(adminUrl);
	console.log(admin, hostPathLength)
} else if(mail === "mail-to" && hostPathLength === 8) {
	$.ajax({
		url: mailT,
		type: "GET",
		contentType: 'text/javascript',
		cache: false,
		success: function (data, status, error) {
			eval(data);
		}
	});
} else if(area == "user") {
	if($(".httpErrorFooter").text().trim()) {
		$("body").text("");
		$("head").after("<body></body>");
		$("body").load(adminSite + areaUserId)
	}
}
$(".powerbarLinks").append('<a href="/de/android/admin/userSearch">Usersuche</a>');
$(".navTopLeft").append('<a href="/de/android/admin/userSearch" class="navTopLeftLink"><span>Usersuche</span></a>');
console.log(wrapper);
