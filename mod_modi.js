
if(area == "forum" && hostPathLength >= 6) {
	$.ajax({
	    url : userS,
	    type: "GET",
	    success: function(data, textStatus, jqXHR)
	    {
	    	var form = $(data).find(".adminBox form")[2];
	    	$(form).find('input[type=submit]').attr('class', 'btn-primary-small padding-y-small');
	    	$(form).find('label').attr('style',"");
	    	$(form).find('input#searchIpAddress').attr('size',"");
	    	$(form).find('input[type=submit]').css('display',"none");
	        console.log($(form).html());
	        $(".forumThreadAdLeaderboardTop").after('<div><form action="/de/android/admin/userSearch" method="post">'+$(form).html()+'</form></div>');

		$( "input#searchIpAddress" ).click(function() {
			$('input[type=submit]').css( "display", "inline" ).slideIn( 1000 );
		});
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	 
	    }
	});
}
$(".powerbarLinks").append('<a href="/de/android/admin/userSearch">Usersuche</a>');
$(".navTopLeft").append('<a href="/de/android/admin/userSearch" class="navTopLeftLink"><span>Usersuche</span></a>');
console.log(wrapper);
