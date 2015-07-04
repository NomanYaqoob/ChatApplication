/**
 * Created by Noman on 7/4/2015.
 */

angular.module("ChatApp")
.controller("LoginController", function (firebaseURL,$location) {

        this.Login = function (view) {
            var ref = new Firebase(firebaseURL);
            ref.authWithPassword({
                email: this.customUser.email,
                password: this.customUser.password
            }, function (error, authData) {
                if (error) {
                    console.log("error logging in");
                } else {
                    $location.path(view)
                }
            }, {
                remember: "sessionOnly"
            });
        }
    });