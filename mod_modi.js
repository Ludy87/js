
if(area == "forum" && hostPathLength >= 6) {
	var formData = {searchIpAddress:"127.0.0.1",type:"ipAddress"}; 
	
	$.ajax({
	    url : userSearch,
	    type: "POST",
	    data : formData,
	    success: function(data, textStatus, jqXHR)
	    {
	        console.log($(data).html())
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	 
	    }
	});
}
$(".powerbarLinks").append('<a href="/de/android/admin/userSearch">Usersuche</a>');
$(".navTopLeft").append('<a href="/de/android/admin/userSearch" class="navTopLeftLink"><span>Usersuche</span></a>');
console.log(wrapper);
