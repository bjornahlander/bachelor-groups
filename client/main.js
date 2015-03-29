Meteor.startup(function() {
  Template.fb_pic.pic = function() {// helper function to display the pic on the page
    var userProfile;
    userProfile = Meteor.user().profile;
 
    if(userProfile) { // logic to handle logged out state
      return userProfile.picture;
    }
  };
});