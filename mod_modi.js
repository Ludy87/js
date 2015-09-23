if (mail == undefined && hostPathLength == 4) {
	var link = $(".commentContainer header a").each(function(index, value) {
		if(!$(value).hasClass('commentLink')) {
			var linkId = ($(value).attr("href").split("/")[2])
			var $header = $(this).parent();
			myThis.chrome.storage.sync.get({
				adminSiteVisable: false,
				mailToVisable: false,
				warningVisable: false,
				viewWarningVisable: false,
				wordFilter: false,
				wordFilterColor: "#FFF34D",
				wordFilterColorText: "#FFFFFF"
			}, function(items) {
				console.log(items.wordFilter)
				if(items.wordFilter) {
					$(document).ready(function() {
						$(".filter").remove()
						$("body").prepend("<div class=\"filter\" style=\"position: fixed; z-index: 10000; background-color: red; padding: 10px; bottom: 50%; color: white; font-size: 1.2em; display: none;\">Wordfiltertreffer</div>")
						//var app = "chrome-extension://ihngcbdenildjnpeheelhodmnnfgfmnl";
						$.get(chrome.extension.getURL("/wortfilter.txt"), function(content) {
							$('body').removeHighlight();
							$.each(content.split(","), function(i,v) {
								if (v) {
									console.log(i + " " + v);
									if(!$("span").hasClass(".highlight")) {
										var high = ($('body').highlight( v ));
									}
									$(".filter").show();
								}
							});
							$(".highlight").css({"background-color": items.wordFilterColor, "color": items.wordFilterColorText});
						})
						.fail(function() {
							$(".filter").text("Error: Wordfilterdatei ist default");
							$(".filter").show();
						});
					});
				}
				$($header).each(function(i, v) {
					var t = $(v).find("a");
					$.get(mailTo + linkId, function() {
					})
					.done(function() {
						$.get(adminSite + linkId, function(my_var) {
							var tab = $(my_var).find("section table")[0];
							var tr = $(tab).find("tr")[2];
							if($(tr).find("td a").text() != "" && items.viewWarningVisable) {
								$header.after('<a class="btn-primary-small padding-y-small" style="color:#fe0000 !important; background-color:#f0f0f0; margin-left: 1px;" href="' + listWarning + linkId + '">' + $(tr).find("td a").text() + '</a>')
							}
							if(items.warningVisable) {
								$header.after('<a class="btn-primary-small padding-y-small" style="background-color:#fe0000; margin-left: 1px;" href="' + warning + linkId + '">Verwarnen</a>')
							}
							if(items.adminSiteVisable) {
								$header.after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + adminSite + linkId + '">Adminseite</a>')
							}
							if(items.mailToVisable) {
								$header.after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px;" href="' + mailTo + linkId + '">Mail schreiben</a>');
							}
						});
					})
					.fail(function() {
						$header.after('<a class="btn-primary-small padding-y-small" style="margin-left: 1px; background-color: red; cursor: default;">Gelöschter Account</a>')
					});
				});
			});
		}
	});
	function writeText(text, position){
		$(".newComment textarea#commentTextarea" + position).val(text);
		$(".newComment textarea#commentTextarea" + position).height(($(this).prop('scrollHeight')+25));
	}
	$( "body" ).delegate( "button.addReplyComment, button.cancelReply", "click", function() {
		var text = $(this).data("text");
		$("div.siteload").remove();
		return true;
	});
	$( "body" ).delegate( "button.replyForm", "click", function() {
		if($(this).text().trim() == "Antworten") {
			var commentId = $(this).data("reply");
			console.log($(this).parent().parent().parent().find("header a").first().text());
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
						
						var modName = "";
						var name = "";
						var nameTE = "";
						var text = $("#commentTextarea" + commentId.commentId).val();
						//$(this).data("text");
						text += decodeURIComponent($(this).data("text"));
						text = text.replace('%ModName%' ,modName).replace('%Name%' ,name).replace('%te%' ,nameTE)
						setTimeout(writeText(text,commentId.commentId), 500);
						
						return false;
					});
			});
		}
	});
} else if(area == "forum" && hostPathLength >= 6) {
	var base64_string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABwCAMAAADxPgR5AAAASFBMVEWampr///+ZmZmVlZX4+Pi4uLjs7Ozj4+OSkpLGxsbq6uqioqK0tLT8/Pz39/eoqKjx8fG9vb3c3NzT09ONjY3Nzc3X19ekpKQiGSlbAAACBElEQVRoge2Yi3KrIBBAYQFBEcQ2rf//p13ARq23qXOBTGe6xzyISTisvGWMIAiCIAiCIIhfBzCALZ2frY13Cew/tNM9IaijEkBkDB4AT9DD2N8Zn+ATveQZx53sRX3DMQiwHXfBe3x473hn4fTr0qjx/7GuMgJs4G92iiz2jQcLe84F/A8fiNT71gxhCby/oRiPW8/DchAKUd6IYXofuj2Oe41veHII3B2/e59MaYhgB37E8QcMtrSnwIRNY+d4qOPcT8VVOPnHiq/C0n4CE1bUZXiYigcfiGPYZaDCQABg7WKvsNjU78s7/stwje4l9tfSnogZdFebTJd0pREKFn7oC5uwypQM30Z4KkdXZXq8C8OgdchJickhTVPOBay9UF/ouFTMslmmtLbMWp1CdDOsp2tHKBWAUfky6tgcdXI7ZZgYWwg9rieEkqsQ0Ws5RDOhSEK3Rsg+I8Q5sIlQpgi3S7pGSEISkpCEJCQhCf+KsM2aRqY1zb+E0ChCtV+13YWy2SWNqzazCdm2aoPW61J3vqS+mdCtQsaaNxo/GnFbc9aAu+ss9Aq35A0ixMp6VUq95lbazUrNuRzx9Px5uoYQvt8f7knG1hvSk7KrccsY9+z6ms7xQZTv8BFsmteIY1EFITCzu+n8iNHUuE0TcxA/Y+LLWsDyEAmCIAiCIAiCIH4bH4xGJkBZuFIHAAAAAElFTkSuQmCC";
	var image = $("<img>", {
	  "src": base64_string,
	  "class": "korb",
	  "width": "35px",
	  "height": "35px"});
	  $(image).css({margin: "0 5px -10px 0"})
	//$("#forumThreadContainer").before(image);
	$("#forumHeadingThread").prepend(image);
	$("head").append('<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"><script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>');
	$("body").append('<div id="dialog"><p>Thrad in den Papierkorb verschieben?</p></div>')
	$(".korb").click(function() {
		$( "#dialog" ).dialog({
		        buttons : {
		            "JA" : function() {
		            	$.post(korb,{ categoryId: "10970", threadId: areaUserId })
		            		.done(function( data ) {
		            			console.log(data);
						//location.reload();
					})
					.fail(function( data ) {
						console.log(data);
					});
		                $(this).dialog("close");
		            },
		            "NEIN" : function() {
		                $(this).dialog("close");
		            }
		        }
		});
	});
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
