
if(area == "forum" && hostPathLength >= 6) {
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
}
$(".powerbarLinks").append('<a href="/de/android/admin/userSearch">Usersuche</a>');
$(".navTopLeft").append('<a href="/de/android/admin/userSearch" class="navTopLeftLink"><span>Usersuche</span></a>');
console.log(wrapper);
