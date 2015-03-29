Template.fb_pic_general.helpers({
  	 pic: function() {// helper function to display the pic on the page
    var userProfile;
    userProfile = Meteor.users.findOne({_id: Template.instance().data._id});
    if(userProfile) { // logic to handle logged out state
      return userProfile.profile.picture;
    }
}
});
