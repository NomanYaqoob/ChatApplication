/**
 * Created by Noman on 7/2/2015.
 */



angular.module("ChatApp",['ngNewRouter','ngMaterial','firebase'])
    .constant("firebaseURL","https://netchat.firebaseio.com/")
.controller("MainCtrl", function (firebaseURL,$firebaseObject) {

        this.authenticate = function () {
            var ref = new Firebase(firebaseURL);
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    var refUsers = ref.child("users").child(authData.uid);
                    console.log("Authenticated successfully with payload:", authData);
                    this.users = $firebaseObject(refUsers);
                    this.users.Name = authData.facebook.displayName;
                    this.users.Email = authData.facebook.email;
                    this.users.profilePicture = authData.facebook.cachedUserProfile.picture.data.url;
                    /*this.users.$save({
                            Name: authData.facebook.displayName,
                            Email: authData.facebook.email,
                            profilePicture: authData.facebook.cachedUserProfile.picture.data.url
                    });*/
                    this.users.$save();
                }
            },{
                scope: "email,user_likes" // the permissions requested
            });
           /* var ref = new Firebase("https://netchat.firebaseio.com");
            ref.authWithOAuthRedirect("facebook", function(error) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    // We'll never get here, as the page will redirect on success.
                }
            });*/
        }
    });