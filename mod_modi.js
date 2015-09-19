
if(area == "forum" && hostPathLength >= 6) {
	$(".containerContent").before('<iframe src="/de/android/admin/userSearch" width="220" height="350" style="border: 0;"></iframe>');
}
$(".powerbarLinks").append('<a href="/de/android/admin/userSearch">Usersuche</a>');
$(".navTopLeft").append('<a href="/de/android/admin/userSearch" class="navTopLeftLink"><span>Usersuche</span></a>');
console.log(wrapper);
