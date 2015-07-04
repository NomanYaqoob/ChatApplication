/**
 * Created by Noman on 7/4/2015.
 */


angular.module("ChatApp")
    .controller("SignupController", function (firebaseURL,$location,$firebaseObject) {
        this.authenticate = function (view) {
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
                }
            },{
                scope: "email,user_likes" // the permissions requested
            });
            $location.path(view)
        };

        this.transfer = false;

        this.registerUser = function (view) {
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
                        this.transfer = false;
                    } else {
                        console.log("Successfully created user account with uid:", userData.uid);
                        this.transfer = true;
                    }
                }
            );

            /*if(this.transfer){*/
                $location.path(view);
            //}
        }

    });