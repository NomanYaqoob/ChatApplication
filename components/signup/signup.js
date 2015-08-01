/**
 * Created by Noman on 7/4/2015.
 */


angular.module("ChatApp")
    .controller("SignupController", function (firebaseURL,$location,$firebaseObject,$firebaseArray,loggedInUser,$mdDialog) {
        var clearAuth = false;
        this.authenticate = function (view) {
            var ref = new Firebase(firebaseURL);
            ref.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                    clearAuth = false;
                } else {
                    var refUsers = ref.child("users").child(authData.uid);
                    console.log("Authenticated successfully with payload:", authData);
                    this.users = $firebaseObject(refUsers);
                    //this.users = authData;
                    this.users.Name = authData.facebook.displayName;
                    this.users.email = authData.facebook.email;
                    this.users.profilePicture = authData.facebook.cachedUserProfile.picture.data.url;
                    this.users.uid = authData.uid;
                    this.users.$save();
                    loggedInUser.setUser(authData);
                    $location.path(view);
                    //clearAuth = true;
                }
            },{
                scope: "email,user_likes" // the permissions requested
            });
            //if(clearAuth) {
            //
            //}

        };

        this.alreadyPresent = false;

        this.registerUser = function (view,ev) {
            var ref = new Firebase(firebaseURL);
            var refCustomUser = new Firebase(firebaseURL).child("customUser");
            this.newUser = $firebaseArray(refCustomUser);

            angular.forEach(this.newUser, function (user, key) {

                if(this.customUser.email == user.email )
                    this.alreadyPresent = true;
                else
                    this.alreadyPresent = false;
            },this);

            if(!this.alreadyPresent) {
                this.newUser.$add({
                    Name: this.customUser.Name,
                    email: this.customUser.email,
                    password: this.customUser.password
                }).then(function (user) {
                    $location.path(view);
                });

                this.customUser = "";
            }
            else {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Welcome')
                        .content('Email Already Used by another account')
                        .ok('Ok')
                        .targetEvent(ev)
                );
                this.customUser.email = "";
            }

            //}
        }

    });