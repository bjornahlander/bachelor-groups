Meteor.publish('projects', function () {
	return Projects.find();
});

Meteor.publish('userData', function () {
	return Meteor.users.find({}, {field: {"projectid": 1, "profile": 1, "_id": 1}})
})