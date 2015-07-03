/**
 * Created by Noman on 7/2/2015.
 */



angular.module("ChatApp",['ngNewRouter','ngMdIcons','ngMaterial','firebase'])
    .constant("firebaseURL","https://netchat.firebaseio.com/")
.controller("MainCtrl", function (firebaseURL,$firebaseObject,$router) {

        this.customUser = {};
        //this.homeFunc = function () {
        //    console.log($router);
            $router.config([
                {path:"/",redirectTo:"/home"},
                {path:"/home",component:"home"}
                //{path:"/edit",component:"edit"}
            ]);
        //}

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
                    this.users.$save();
                    this.homeFunc();
                }
            },{
                scope: "email,user_likes" // the permissions requested
            });
        };


        this.registerUser = function () {
            var ref = new Firebase(firebaseURL);
            ref.createUser({
                firstName: this.customUser.firstName,
                lastName:  this.customUser.lastName,
                email: this.customUser.email,
                password : this.customUser.password
            },
                function (error, userData) {
                    if(error) {
                        console.log("Error creating user:", error);
                    } else {
                        console.log("Successfully created user account with uid:", userData.uid);
                    }
                }
            )
        }


    });