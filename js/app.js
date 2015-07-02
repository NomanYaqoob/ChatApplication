/**
 * Created by Noman on 7/2/2015.
 */



angular.module("ChatApp",['ngNewRouter','ngMaterial','firebase'])
.controller("MainCtrl", function () {

        this.authenticate = function () {
            var ref = new Firebase("https://netchat.firebaseio.com/");
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
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