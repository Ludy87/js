var userS = userSearch;
var mailT = mailToUrl;
function Android () {
	
	this.signaturFix = function() {
		// Fix Signatur Size 
		console.log("Fix Signatur");
		$('.threadPostContentSignature>p').css('font-size', '1.0rem');
		$('.threadPostContentSignature>p').css('line-height', '1.0rem');
		// Fix Signatur Size
		//$('p.threadPostContentModified').css('font-size', '1.0rem');
		//$('p.threadPostContentModified').css('line-height', '1.0rem');
		//
	};
	
	this.magazinButtonFix = function() {
		$('.btn-secondary').css('min-width','0');
		$('.btn-secondary').css('font-size', '1.4rem');
	};
	
	this.zitate = function() {
		$('blockquote').before('<p class="spoiler">Spoiler</p>');
		$('blockquote').css('display','none');
		$( "body" ).delegate( "p.spoiler", "click", function() {
			$(this).next().slideToggle("slow");
		});
	};
	
    this.ready = function() {
    	ajax = new XMLHttpRequest();
	 
	if(ajax!=null){
		ajax.open("GET","https://raw.githubusercontent.com/Ludy87/js/master/forum.js?v=" + v,true);
		ajax.setRequestHeader('X-Content-Type-Options','nosniff');
		ajax.onreadystatechange = function(){
			if(this.readyState == 4){
				if(this.status == 200){
					eval(this.responseText);
				    	$( document ).ready(function() {
						$('article').forum();
						app.all();
					});
				}
			}
		}
		ajax.send(null);
	}
    };
    
    this.all = function() {
    	ajax = new XMLHttpRequest();
	console.log(this)
	if(ajax!=null){
		ajax.open("GET","https://raw.githubusercontent.com/Ludy87/js/master/all.js?v=" + v,true);
		ajax.setRequestHeader('X-Content-Type-Options','nosniff');
		ajax.onreadystatechange = function(){
			if(this.readyState == 4){
				if(this.status == 200){
					eval(this.responseText);
					$( document ).ready(function() {
						new OverSite().powerBarFix();
					});
				}
			}
		}
		ajax.send(null);
	}
    };
    
    this.getInfo = function() {
        this.chrome();
        //this.zitate();
        this.signaturFix();
        this.magazinButtonFix();
        this.top();
        this.powerBar();
        $.ajax({
		url: mod_modi_url,
		type: "GET",
		contentType: 'text/javascript',
		cache: false,
		success: function (data, status, error) {
			eval(data);
		}
	});
    };
    
    this.powerBar = function() {
    	$('.headerMain, .headerMain-forum').css('margin-top', '30px');
    	$('.powerbarContainer').css('position', 'fixed').css('margin-top', '-30px').css('z-index', '1000').css('width', '100%');
    };
    
    this.top = function() {
	$( document ).ready(function() {
    	$('.forumThreadListPageLabelFixed, .instantScrollAnchor, .forumThreadListPageLabelFixedInside').remove();
	$("body").append('<a href="#0" class="cd-top" style="border-radius: 50px; z-index: 100; left: 50%;">Top</a>');
	var offset = 35, //300
	offset_opacity = 1200,
	scroll_top_duration = 700,
	$back_to_top = $('.cd-top');

	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
    	$.ajax({
	    url: 'https://raw.githubusercontent.com/Ludy87/js/master/backToTop.css',
	    dataType: 'text',
	    success: function(data) {
	        $('<style type="text/css">\n' + data + '</style>').appendTo("head");     
	        //$('.gsc-control-cse.gsc-control-cse-de').attr("style", "background: linear-gradient(135deg,#1f6eb0 67%,#43a8da 100%) !important;");
	    }                  
	});})
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
				if(userId == "413762") {
					$(this).find(".threadPostAuthorName .user-badges span").first().append(" DER KOPF");
				}
				if(userId == "4361215" || userId == "2927890") {
					$(this).find(".threadPostAuthorName .user-badges span").first().append(" DEV");
				}
				if(userId == "474375") {
					$(this).find(".threadPostAuthorName .user-badges span").first().append(" DIRTY UNICORNS");
				}
				if(userId == "429327") {
					$(this).find(".threadPostAuthorName .user-badges span").first().append(" THE BOT");
				}
				if(userId == "517270") {
					$(this).find(".threadPostAuthorName .user-badges span").first().append(" OPA");
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
				$('a.closer' + postid).parent().parent().remove();
				$('table.infoTab' + postid).prepend('<tr style="background-color: grey;line-height: 2;"><td style="text-align: center;"><a href="#" style="color: white" class="closer' + postid + '">schließen</a></td></tr>')
				$("table.infoTab" + postid).toggle();
			});
			$( "body" ).delegate( "table.infoTab" + postid + " a", "click", function() {
				var hrefIp = ($(this).attr("href")).split("=")[1];
				var param = { searchIpAddress: hrefIp, type: "ipAddress" }
				if(hrefIp === undefined) {
					$("table.infoTab" + postid).toggle();
				} else {
					$.ajax({
					    url : userSearch,
					    data: param,
					    type: "GET",
					    success: function(data, textStatus, jqXHR)
					    {
						var win = window.open();
						win.document.write(data);
					    },
					    error: function (jqXHR, textStatus, errorThrown)
					    {
					 
					    }
					});
				}
				console.log(hrefIp)
				return false;
			});
		});
	});
	$( "body" ).delegate( "ul.threadPostOptionsButtons a", "click", function() {
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
	});
	$( "body" ).delegate( "a.schreib", "click", function() {
		var text = $(".forumEditorContent").val();
		text += decodeURIComponent($(this).data("text"));
		var modName = ($.trim($("div.forumEditor").parent().parent().find(".threadPostAuthorNameLink").text()));
		if(text.indexOf("%te%") >= 0) {
			var name = ($(this).parent().parent().parent().parent().parent().parent().parent().parent().find("a.threadPostAuthorNameLink").first().text()).trim()
			if(window.location.href.indexOf("/page/") >= 0) {
				var lage = window.location.href.length;
				var newPage = window.location.href.substr(0,lage-1)+1;
				var pages = window.location.href.split("/")
				newPage = pages[0]+pages[1]+"//"+pages[2]+"/"+pages[3]+"/"+pages[4]+"/"+pages[5]+"/page/1";
				$.get(newPage, function(content) {
					var first = $(content).find(".isThreadAuthor").first();
					var nameTE = ($(first).find("a.threadPostAuthorNameLink").text().trim());
					$(".forumEditorContent").val(text.replace('%te%' ,nameTE).replace('%Name%' ,name));
				});
			} else {
				var first = $(".isThreadAuthor").first();
				var nameTE = ($(first).find("a.threadPostAuthorNameLink").first().text().trim());
				$(".forumEditorContent").val(text.replace('%te%' ,nameTE).replace('%ModName%' ,modName).replace('%Name%' ,name));
			}
		} else if(text.indexOf("%Name%") >= 0) {
			var name = ($(this).parent().parent().parent().parent().parent().parent().parent().parent().find("a.threadPostAuthorNameLink").first().text()).trim()
			$(".forumEditorContent").val(text.replace('%Name%' ,name).replace('%ModName%' ,modName));
		} else {
			$(".forumEditorContent").val(text.replace('%ModName%' ,modName));
		}
		return false;
	});
	$( "body" ).delegate( "a.defaultButton", "click", function() {
		$(this).next().toggle();
		return false;
	});
	$(".pagerNewInactive").click(function() {
		window.location.href = window.location.origin + $(this).attr("href");
		return false;
	});			
    }
}

function writeSite() {
	$("div.forumEditor").prepend("<a href=\"#\" style=\"margin: 1px; padding: 2px !important;\" class=\"defaultButton btn-primary-small padding-y-small\">StandardTexte</a><div class=\"siteload\" style=\"display: none;\"><ul class=\"myMenu\"></ul><div style=\"clear:both;\"></div></div>");
	chrome.storage.local.get("text", function(items) {
		var allKeys = Object.keys(items);
	
		$.each(items["text"], function(index, value) {
			if(value != "" && index != "" ) {
				if($(".schreib").text() != index) {
					var myvar = '<li><a href="#" class="schreib btn-primary-small padding-y-small" style="margin: 1px; padding: 2px !important;" data-text="' + (value) + '">' + decodeURIComponent(index) + '</a></li>';
					$("ul.myMenu").append(myvar);
				}
			}
		});
	});
}
