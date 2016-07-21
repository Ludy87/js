if (mail == undefined && hostPathLength == 4 && area !== "leaderboard") {
	console.log("!mail")
	var link = $(".commentContainer header a").each(function(index, value) {
		if(!$(value).hasClass('commentLink')) {
			var linkId = ($(value).attr("href").split("/")[2])
			var $header = $(this).parent();
				$i = 0;
			myThis.chrome.storage.sync.get({
				adminSiteVisable: false,
				mailToVisable: false,
				warningVisable: false,
				viewWarningVisable: false,
				wordFilter: false,
				wordFilterColor: "#FFF34D",
				wordFilterColorText: "#FFFFFF"
			}, function(items) {
				admin = items.adminSiteVisable;
				//console.log(items.wordFilter)
				if(items.wordFilter) {
					$(document).ready(function() {
						$(".filter").remove()
						//var app = "chrome-extension://ihngcbdenildjnpeheelhodmnnfgfmnl";
						chrome.storage.local.get("wordFilter", function(result) {
                                                	$('.articleComments').removeHighlight();
                                                	var t = result['wordFilter'];
                                                	if(t != undefined) {
	                                                	$.each(t, function(i,v) {
	                                                		if(v) {
	                                                			var high = ($('.articleComments').highlight( v ));
	                                                			$(".filter").show();
	                                                		}
	                                                	});
	                                                	$(".highlight").css({"background-color": items.wordFilterColor, "color": items.wordFilterColorText});
	                                                	
	                                                	if($("span").hasClass("highlight") && !$("div").hasClass("filter")) {
	                                                		$("body").prepend("<div class=\"filter\" style=\"position: fixed; z-index: 10000; padding: 10px; bottom: 0px; color: white; font-size: 1.2em; overflow: auto; width: 100px;background-color: rgba(255,0,0,0.9);max-height: 200px;\">Wortfiltertreffer aktiv<li style=\"list-style: none;\"></li></div>")
	                                                	}
	                                                	if($i==0) {
	                                                		$( "span.highlight" ).each(function( index ) {
	                                                			if(undefined != $(this).parent().attr("id")) {
	                                                				console.log($(this).parent().attr("id"));
	                                                				$(".filter li").append('<ul style="text-decoration: underline; cursor: pointer;" id="wcomment" data-id="' + $(this).parent().attr("id") + '">Treffer ' + (index+1) + "</ul>");
	                                                				$(".filter").show();
	                                                			}
	                                                		});
	                                                	}
	                                                	$i++;
							}
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
	$( "body" ).delegate("ul#wcomment","click",function() {
		console.log($(this).data("id"));
		$('html, body').animate({
			scrollTop: $("#" + $(this).data("id")).offset().top - 130
		}, 2000);
	});
	$( "body" ).delegate( "button.replyForm", "click", function() {
		if($(this).text().trim() == "Antworten") {
			var commentId = $(this).data("reply");
			console.log($(this).parent().parent().parent().find("header a").first().text());
			$("li#comment" + commentId.commentId + " .replyFormDiv").append("<div class=\"siteload\"><ul class=\"myMenu\"></ul><div style=\"clear:both;\"></div></div>");
				myThis.chrome.storage.local.get("text", function(items) {
					var allKeys = Object.keys(items["text"]);
					console.log(items["text"]);
					var zahl = $("a.schreib").length;
					$.each($("a.schreib"), function(i,v) {
						console.log(i + " : " + zahl)
					})
					$.each(items["text"], function(index, value) {
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
	chrome.storage.sync.get({
		scrollToKommentar: false
	}, function(items) {
		if (items.scrollToKommentar) {
			setTimeout(function(){
				$('html, body').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
				    if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel") {
				        $("html, body").stop();
				    }
				});
				if(window.location.hash) {
					console.log(window.location.hash);
					$(window.location.hash).css({"border" : "1px solid red"})
					$('html, body').animate({
						scrollTop: $(window.location.hash).offset().top - 130
					}, 2000);
				} 
			}, 3500);
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
	$("body").append('<div id="dialog" class="diaclose" style="display:none;"><p>Thrad in den Papierkorb verschieben?</p></div>');
	$("body").append('<div id="dialogTry" class="diaclose" style="display:none;"><p>Bitte Grund eingeben!</p><p><input type="text" class="korbText" value="Titel" placeholder="Titel" /></p></div>');
	$("body").append('<div id="dialogError" class="diaclose" style="display:none;"><p>mindestens 5 Zeichen!</p></div>');
	
	$(document).ready(function() {
		var sText = $('script').text();
		var u = sText.split("userId: ")[1];
		//console.log(AP.req);
	//var scri = ($('script')[7]);
	//console.log(scri,7)
	//scri = ($(scri).text())
	//scri = (scri.split(":")[1])
	var UID = ($.trim(u.split(",")[0]))
	$(".korb").click(function() {
		$( "#dialog" ).dialog({
		        buttons : {
		            "JA" : function() {
		            	$.post(korb,{ categoryId: "10970", threadId: areaUserId })
		            		.done(function( data ) {
		            			$("#dialogTry").dialog({
		            				buttons : {
		            					"Okay" : function() {
		            						var str = $(".korbText").val();
		            						if(str.length < 5) {
		            							$("#dialogError").dialog({
		            								buttons : {
		            									"Okay" : function() {
		            										$(this).dialog("close");
		            									}
		            								}
		            							});
		            						} else {
		            							$.post(poste, {userId: UID, threadId: areaUserId, content: str})
		            								.done(function(data){
		            									$.post(close, {threadId: areaUserId, closed: "1"})
		            										.done(function(da) {
		            											if(da.status == "ok") {
		            												window.setTimeout(window.top.location.href = (urlHost+data.redirectURL), 2000);
		            											}
		            										});
		            									
		            								})
		            								.fail(function (data) {
		            									$("#dialogTry").dialog("close");
		            									alert('Thread schon geschlossen!')
		            								});
		            						}
		            					}
		            				}	
		            			});
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
	});
	$.ajax({
	    url : userS,
	    type: "GET",
	    success: function(data, textStatus, jqXHR)
	    {
	    	var form = $(data).find(".adminBox form")[2];
	    	$(form).find('input[type=submit]').attr('class', 'btn-primary-small padding-y-small').attr('value','suche');
	    	//$(form).find('label').attr('style',"");
	    	$(form).find('label').css('display',"none");
	    	$(form).find('input#searchIpAddress').attr('size',"");
	    	$(form).find('input#searchIpAddress').attr('placeholder',"IP-Adresse");
	        $(".forumThreadAdLeaderboardTop").after('<div><form action="/de/android/admin/userSearch" method="post">'+$(form).html()+'</form></div>');
	    	$('.forumSidebox.searchip').remove();
		//$(".forumSidebar").prepend('<section class="forumSidebox"><ul><li class="forumSideboxItem "><form action="/de/android/admin/userSearch" method="post">'+$(form).html()+'</form></li></ul></section>');
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	 
	    }
	});
	chrome.storage.sync.get({
		scrollToPost: false
	}, function(items) {
		if (items.scrollToPost) {
			setTimeout(function(){
				$('html, body').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
				    if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel") {
				        $("html, body").stop();
				    }
				});
				if(window.location.hash) {
					$('html, body').animate({
						scrollTop: $(window.location.hash).offset().top - 30
						
					}, 2000);
				} else {
					var aid = $('article').attr('id');
					if(aid != undefined) {
						$('html, body').animate({
							scrollTop: $('#'+aid).offset().top - 30
						}, 2000);
					}
				}
			}, 1000);
		}
	});
} else if(area == "_leaderboard" && hostPathLength >= 4) {
	var lastSite = $(".pagerNewNext").prev().text();
	lastSite = lastSite.replace(".","");
	var path = (hostSplit[0] + "/" + hostSplit[1] + "/" + hostSplit[2] + "/" + area + "/page/");
	while(lastSite > 130000) {
		console.log(path + lastSite);
		$.get( path + lastSite, function( data ) {
			console.log($( data ).find('.leaderboardTable div.leaderboard-user'));
		});
		//console.log(lastSite);
		lastSite--;
	}
} else if(admin === "admin" && hostPathLength === 7 && mail != "userSearch") {
	$.getScript(adminUrl);
	console.log(admin, hostPathLength, host.indexOf('userSearch'))
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
if(area === "forum") {
	$.ajax({
		url : userS,
		type: "GET",
		success: function(data, textStatus, jqXHR)
		{
			var formuser = $(data).find(".adminBox form")[1];
			var formip = $(data).find(".adminBox form")[2];
			$(formip).find('input[type=submit]').attr('class', 'btn-primary-small padding-y-small searchip').attr('value','suche');
			$(formip).find('.searchip').css('width',"100%");
			$(formip).find('label').css('display',"none");
			$(formip).find('input#searchIpAddress').attr('size',"");
			$(formip).find('input#searchIpAddress').css('width',"100%");
			$(formip).find('input#searchIpAddress').attr('placeholder',"IP-Adresse");
			$(formuser).find('input[type=submit]').attr('class', 'btn-primary-small padding-y-small searchuser').attr('value','suche');
			$(formuser).find('.searchuser').css('width',"100%");
			$(formuser).find('label').css('display',"none");
			$(formuser).find('input#searchName').attr('size',"");
			$(formuser).find('input#searchName').css('width',"100%");
			$(formuser).find('input#searchName').attr('placeholder',"Username");
			$("body").append('<gcse:searchresults></gcse:searchresults>');
			$(".forumSidebar").prepend('<section class="forumSidebox searchip"><h2>Mod Panel</h2><ul><li class="forumSideboxItem"><form action="/de/android/admin/userSearch" method="post">'+$(formip).html()+'</form></li><li class="forumSideboxItem"><form action="/de/android/admin/userSearch" method="post">'+$(formuser).html()+'</form></li><li class="forumSideboxItem"><gcse:searchbox></gcse:searchbox></li></ul></section>');
			var script = document.createElement('script');
			script.text = '(function() {var cx = "006006678927633944778:-li7chryqxa";var gcse = document.createElement("script");gcse.type = "text/javascript";gcse.async = true;gcse.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//cse.google.com/cse.js?cx=" + cx;var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(gcse, s);})();';
			document.getElementsByTagName('head')[0].appendChild(script);
			//var form = '<form id="cse-search-box" action="https://google.com/cse"><input type="hidden" name="cx" value="006006678927633944778:-li7chryqxa" /><input type="hidden" name="ie" value="UTF-8" /><input type="text" name="q" size="31" /><input type="submit" name="sa" value="such" /></form>';
			
		},
		error: function (jqXHR, textStatus, errorThrown)
		{
		
		}
	});
}
console.log(wrapper,area);
