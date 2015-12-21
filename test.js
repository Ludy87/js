$.ajax({
	url: url_l,
	type: "GET",
	contentType: 'text/json-comment-filtered;charset=UTF-8',
	cache: false,
	success: function (data, status, error) {
		eval(data);
	}
});
