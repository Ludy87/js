
if(area == "forum" && hostPathLength >= 6) {
	var formData = {searchIpAddress:"127.0.0.1",type:"ipAddress"}; 
	
	$.ajax({
	    url : userS,
	    type: "POST",
	    data : formData,
	    success: function(data, textStatus, jqXHR)
	    {
	        console.log($(data).find(".adminBox").html());
	        $(".wrapper, .forumWrapper").before(''+$(data).find(".adminBox").html()+'')
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	 
	    }
	});
}
$(".powerbarLinks").append('<a href="/de/android/admin/userSearch">Usersuche</a>');
$(".navTopLeft").append('<a href="/de/android/admin/userSearch" class="navTopLeftLink"><span>Usersuche</span></a>');
console.log(wrapper);
