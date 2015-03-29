Meteor.subscribe('userData');

Template.projectPage.helpers({
	members: function () {
		//window.alert(Template.instance().data._id);
		return Meteor.users.find({projectid: Template.instance().data._id}, {sort: {username: 1}});
	}
});

Template.projectPage.events({
	"click .addMember": function (event) {
		event.preventDefault();
		Meteor.call('insertMembership', Template.instance().data._id, function(error, result) {
		// display the error to the user and abort
      	if (error)
        	return alert(error.reason);

      	//  owns another project
      	if (result.alreadyOwner)
        	return alert('You already own a project and you must delete that before you can join another project.');

        		// too many members?
		if (result.tooManyMembers) {
			return alert('This group is full. Sorry...');
		}
		});


	}
});