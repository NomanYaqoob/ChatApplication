/**
 * Created by Noman on 7/4/2015.
 */


angular.module("ChatApp")
.controller("HomeController", function ($firebaseArray,firebaseURL,$firebaseObject,loggedInUser,$timeout) {
            var ref = new Firebase(firebaseURL).child('customUser');
            var ref2 = new Firebase(firebaseURL).child('users');
            this.userFromCustomLogin = $firebaseArray(ref);
            this.userFromFacebook =  $firebaseObject(ref2);

        //this.users = this.userFromCustomLogin + this.userFromFacebook;

            this.msgs = [];
            $timeout(function () {
                    this.avatar = loggedInUser.facebook.cachedUserProfile.picture.data.url;
                    console.log(this.avatar);
            },0);

        this.push = function () {
                var d = new Date();
                this.msgs.push({
                        uid: "noman",
                        message: this.msg,
                        timeStamp : d.toTimeString()
                });
                this.msg = "";
        };
    });