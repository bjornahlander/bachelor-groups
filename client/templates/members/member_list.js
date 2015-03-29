

Template.memberList.helpers({
	members: function () {
		//window.alert(Template.instance().data._id);
		return Meteor.users.find({});
	}
});