/**
 * Created by Noman on 7/2/2015.
 */



angular.module("ChatApp",['ngNewRouter','ngMaterial','firebase'])
    .constant("firebaseURL","https://netchat.firebaseio.com/")
.controller("MainCtrl", function (firebaseURL,$firebaseArray) {

        this.authenticate = function () {
            var ref = new Firebase(firebaseURL);
            var refUsers = ref.child("users");
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    this.users = $firebaseArray(refUsers);
                    this.users.$add({
                            Name: authData.facebook.displayName,
                            Email: authData.facebook.email,
                            uid: authData.uid,
                            profilePicture: authData.facebook.cachedUserProfile.picture.data.url
                    });

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