

Template.firstLogin.helpers({
	access: function () {
		//Session.setDefault("access", false);
		return Session.get("access");
	}
});

Template.firstLogin.events({
	"submit .firstLogin": function (event) {
		event.stopPropagation();
		var word = event.target.text.value;
		if (word == "password") {
			console.log(Session.get("access"));
			Session.set("access", true);
			console.log(Session.get("access"));
		}
	} 
});