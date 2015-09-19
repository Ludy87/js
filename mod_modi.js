
if(area == "forum" && hostPathLength >= 6) {
	var formData = {searchIpAddress:"",type:"ipAddress"}; 
	
	$.ajax({
	    url : userS,
	    type: "POST",
	    data : formData,
	    success: function(data, textStatus, jqXHR)
	    {
	        console.log($(data).find(".adminBox form")[2].html());
	        $(".wrapper, .forumWrapper").before('<div>'+$(data).find(".adminBox").html()+'</div>')
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	 
	    }
	});
}
$(".powerbarLinks").append('<a href="/de/android/admin/userSearch">Usersuche</a>');
$(".navTopLeft").append('<a href="/de/android/admin/userSearch" class="navTopLeftLink"><span>Usersuche</span></a>');
console.log(wrapper);
