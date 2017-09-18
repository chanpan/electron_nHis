$.ajax({
	url: "./views/layouts/main.html",
	success: function(res) {
		$("#main-page").html(res);
	}
});